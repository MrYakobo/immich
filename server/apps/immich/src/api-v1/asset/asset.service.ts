import { CuratedLocationsResponseDto } from './response-dto/curated-locations-response.dto';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthUserDto } from '../../decorators/auth-user.decorator';
import { AssetEntity, AssetType, SharedLinkType } from '@app/infra';
import { constants, createReadStream, ReadStream, stat } from 'fs';
import { ServeFileDto } from './dto/serve-file.dto';
import { Response as Res } from 'express';
import { promisify } from 'util';
import { DeleteAssetDto } from './dto/delete-asset.dto';
import { SearchAssetDto } from './dto/search-asset.dto';
import fs from 'fs/promises';
import { CheckDuplicateAssetDto } from './dto/check-duplicate-asset.dto';
import { CuratedObjectsResponseDto } from './response-dto/curated-objects-response.dto';
import {
  AssetResponseDto,
  ImmichReadStream,
  IStorageRepository,
  JobName,
  mapAsset,
  mapAssetWithoutExif,
} from '@app/domain';
import { CreateAssetDto, UploadFile } from './dto/create-asset.dto';
import { DeleteAssetResponseDto, DeleteAssetStatusEnum } from './response-dto/delete-asset-response.dto';
import { GetAssetThumbnailDto, GetAssetThumbnailFormatEnum } from './dto/get-asset-thumbnail.dto';
import { CheckDuplicateAssetResponseDto } from './response-dto/check-duplicate-asset-response.dto';
import { IAssetRepository } from './asset-repository';
import { SearchPropertiesDto } from './dto/search-properties.dto';
import {
  AssetCountByTimeBucketResponseDto,
  mapAssetCountByTimeBucket,
} from './response-dto/asset-count-by-time-group-response.dto';
import { GetAssetCountByTimeBucketDto } from './dto/get-asset-count-by-time-bucket.dto';
import { GetAssetByTimeBucketDto } from './dto/get-asset-by-time-bucket.dto';
import { AssetCountByUserIdResponseDto } from './response-dto/asset-count-by-user-id-response.dto';
import { AssetCore } from './asset.core';
import { CheckExistingAssetsDto } from './dto/check-existing-assets.dto';
import { CheckExistingAssetsResponseDto } from './response-dto/check-existing-assets-response.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetFileUploadResponseDto } from './response-dto/asset-file-upload-response.dto';
import { ICryptoRepository, IJobRepository } from '@app/domain';
import { DownloadService } from '../../modules/download/download.service';
import { DownloadDto } from './dto/download-library.dto';
import { IAlbumRepository } from '../album/album-repository';
import { StorageService } from '@app/storage';
import { ShareCore } from '@app/domain';
import { ISharedLinkRepository } from '@app/domain';
import { DownloadFilesDto } from './dto/download-files.dto';
import { CreateAssetsShareLinkDto } from './dto/create-asset-shared-link.dto';
import { mapSharedLink, SharedLinkResponseDto } from '@app/domain';
import { AssetSearchDto } from './dto/asset-search.dto';
import { AddAssetsDto } from '../album/dto/add-assets.dto';
import { RemoveAssetsDto } from '../album/dto/remove-assets.dto';

const fileInfo = promisify(stat);

@Injectable()
export class AssetService {
  readonly logger = new Logger(AssetService.name);
  private shareCore: ShareCore;
  private assetCore: AssetCore;

  constructor(
    @Inject(IAssetRepository) private _assetRepository: IAssetRepository,
    @Inject(IAlbumRepository) private _albumRepository: IAlbumRepository,
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
    private downloadService: DownloadService,
    storageService: StorageService,
    @Inject(ISharedLinkRepository) sharedLinkRepository: ISharedLinkRepository,
    @Inject(IJobRepository) private jobRepository: IJobRepository,
    @Inject(ICryptoRepository) cryptoRepository: ICryptoRepository,
    @Inject(IStorageRepository) private storage: IStorageRepository,
  ) {
    this.assetCore = new AssetCore(_assetRepository, jobRepository, storageService);
    this.shareCore = new ShareCore(sharedLinkRepository, cryptoRepository);
  }

  public async uploadFile(
    authUser: AuthUserDto,
    dto: CreateAssetDto,
    file: UploadFile,
    livePhotoFile?: UploadFile,
  ): Promise<AssetFileUploadResponseDto> {
    if (livePhotoFile) {
      livePhotoFile.originalName = file.originalName;
    }

    let livePhotoAsset: AssetEntity | null = null;

    try {
      if (livePhotoFile) {
        const livePhotoDto = { ...dto, assetType: AssetType.VIDEO, isVisible: false };
        livePhotoAsset = await this.assetCore.create(authUser, livePhotoDto, livePhotoFile);
      }

      const asset = await this.assetCore.create(authUser, dto, file, livePhotoAsset?.id);

      return { id: asset.id, duplicate: false };
    } catch (error: any) {
      // clean up files
      await this.jobRepository.add({
        name: JobName.DELETE_FILE_ON_DISK,
        data: {
          assets: [
            {
              originalPath: file.originalPath,
              resizePath: livePhotoFile?.originalPath || null,
            } as AssetEntity,
          ],
        },
      });

      // handle duplicates with a success response
      if (error instanceof QueryFailedError && (error as any).constraint === 'UQ_userid_checksum') {
        const duplicate = await this.getAssetByChecksum(authUser.id, file.checksum);
        return { id: duplicate.id, duplicate: true };
      }

      this.logger.error(`Error uploading file ${error}`, error?.stack);
      throw new BadRequestException(`Error uploading file`, `${error}`);
    }
  }

  public async getUserAssetsByDeviceId(authUser: AuthUserDto, deviceId: string) {
    return this._assetRepository.getAllByDeviceId(authUser.id, deviceId);
  }

  public async getAllAssets(authUser: AuthUserDto, dto: AssetSearchDto): Promise<AssetResponseDto[]> {
    const assets = await this._assetRepository.getAllByUserId(authUser.id, dto);

    return assets.map((asset) => mapAsset(asset));
  }

  public async getAssetByTimeBucket(
    authUser: AuthUserDto,
    getAssetByTimeBucketDto: GetAssetByTimeBucketDto,
  ): Promise<AssetResponseDto[]> {
    const assets = await this._assetRepository.getAssetByTimeBucket(authUser.id, getAssetByTimeBucketDto);

    return assets.map((asset) => mapAsset(asset));
  }

  public async getAssetById(authUser: AuthUserDto, assetId: string): Promise<AssetResponseDto> {
    const allowExif = this.getExifPermission(authUser);
    const asset = await this._assetRepository.getById(assetId);

    if (allowExif) {
      return mapAsset(asset);
    } else {
      return mapAssetWithoutExif(asset);
    }
  }

  public async updateAsset(authUser: AuthUserDto, assetId: string, dto: UpdateAssetDto): Promise<AssetResponseDto> {
    const asset = await this._assetRepository.getById(assetId);
    if (!asset) {
      throw new BadRequestException('Asset not found');
    }

    const updatedAsset = await this._assetRepository.update(authUser.id, asset, dto);

    return mapAsset(updatedAsset);
  }

  public async downloadLibrary(user: AuthUserDto, dto: DownloadDto) {
    const assets = await this._assetRepository.getAllByUserId(user.id, dto);

    return this.downloadService.downloadArchive(dto.name || `library`, assets);
  }

  public async downloadFiles(dto: DownloadFilesDto) {
    const assetToDownload = [];

    for (const assetId of dto.assetIds) {
      const asset = await this._assetRepository.getById(assetId);
      assetToDownload.push(asset);

      // Get live photo asset
      if (asset.livePhotoVideoId) {
        const livePhotoAsset = await this._assetRepository.getById(asset.livePhotoVideoId);
        assetToDownload.push(livePhotoAsset);
      }
    }

    const now = new Date().toISOString();
    return this.downloadService.downloadArchive(`immich-${now}`, assetToDownload);
  }

  public async downloadFile(authUser: AuthUserDto, assetId: string): Promise<ImmichReadStream> {
    this.checkDownloadAccess(authUser);
    await this.checkAssetsAccess(authUser, [assetId]);

    try {
      const asset = await this._assetRepository.get(assetId);
      if (asset && asset.originalPath && asset.mimeType) {
        return this.storage.createReadStream(asset.originalPath, asset.mimeType);
      }
    } catch (e) {
      Logger.error(`Error download asset ${e}`, 'downloadFile');
      throw new InternalServerErrorException(`Failed to download asset ${e}`, 'DownloadFile');
    }

    throw new NotFoundException();
  }

  public async getAssetThumbnail(
    assetId: string,
    query: GetAssetThumbnailDto,
    res: Res,
    headers: Record<string, string>,
  ) {
    let fileReadStream: ReadStream;

    const asset = await this._assetRepository.get(assetId);
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    try {
      if (query.format == GetAssetThumbnailFormatEnum.WEBP && asset.webpPath && asset.webpPath.length > 0) {
        if (await processETag(asset.webpPath, res, headers)) {
          return;
        }
        await fs.access(asset.webpPath, constants.R_OK);
        fileReadStream = createReadStream(asset.webpPath);
      } else {
        if (!asset.resizePath) {
          throw new NotFoundException('resizePath not set');
        }
        if (await processETag(asset.resizePath, res, headers)) {
          return;
        }
        await fs.access(asset.resizePath, constants.R_OK);
        fileReadStream = createReadStream(asset.resizePath);
      }
      return new StreamableFile(fileReadStream);
    } catch (e) {
      res.header('Cache-Control', 'none');
      Logger.error(`Cannot create read stream for asset ${asset.id}`, 'getAssetThumbnail');
      throw new InternalServerErrorException(
        e,
        `Cannot read thumbnail file for asset ${asset.id} - contact your administrator`,
      );
    }
  }

  public async serveFile(
    authUser: AuthUserDto,
    assetId: string,
    query: ServeFileDto,
    res: Res,
    headers: Record<string, string>,
  ) {
    const allowOriginalFile = !authUser.isPublicUser || authUser.isAllowDownload;

    let fileReadStream: ReadStream;
    const asset = await this._assetRepository.getById(assetId);

    if (!asset) {
      throw new NotFoundException('Asset does not exist');
    }

    // Handle Sending Images
    if (asset.type == AssetType.IMAGE) {
      try {
        /**
         * Serve file viewer on the web
         */
        if (query.isWeb) {
          res.set({
            'Content-Type': 'image/jpeg',
          });
          if (!asset.resizePath) {
            Logger.error('Error serving IMAGE asset for web', 'ServeFile');
            throw new InternalServerErrorException(`Failed to serve image asset for web`, 'ServeFile');
          }
          if (await processETag(asset.resizePath, res, headers)) {
            return;
          }
          await fs.access(asset.resizePath, constants.R_OK | constants.W_OK);
          fileReadStream = createReadStream(asset.resizePath);

          return new StreamableFile(fileReadStream);
        }

        /**
         * Serve thumbnail image for both web and mobile app
         */
        if (!query.isThumb && allowOriginalFile) {
          res.set({
            'Content-Type': asset.mimeType,
          });
          if (await processETag(asset.originalPath, res, headers)) {
            return;
          }
          await fs.access(asset.originalPath, constants.R_OK | constants.W_OK);
          fileReadStream = createReadStream(asset.originalPath);
        } else {
          if (asset.webpPath && asset.webpPath.length > 0) {
            res.set({
              'Content-Type': 'image/webp',
            });
            if (await processETag(asset.webpPath, res, headers)) {
              return;
            }
            await fs.access(asset.webpPath, constants.R_OK | constants.W_OK);
            fileReadStream = createReadStream(asset.webpPath);
          } else {
            res.set({
              'Content-Type': 'image/jpeg',
            });

            if (!asset.resizePath) {
              throw new Error('resizePath not set');
            }
            if (await processETag(asset.resizePath, res, headers)) {
              return;
            }

            await fs.access(asset.resizePath, constants.R_OK | constants.W_OK);
            fileReadStream = createReadStream(asset.resizePath);
          }
        }

        return new StreamableFile(fileReadStream);
      } catch (e) {
        Logger.error(`Cannot create read stream for asset ${asset.id} ${JSON.stringify(e)}`, 'serveFile[IMAGE]');
        throw new InternalServerErrorException(
          e,
          `Cannot read thumbnail file for asset ${asset.id} - contact your administrator`,
        );
      }
    } else {
      try {
        // Handle Video
        let videoPath = asset.originalPath;

        let mimeType = asset.mimeType;

        await fs.access(videoPath, constants.R_OK | constants.W_OK);

        if (asset.encodedVideoPath) {
          videoPath = asset.encodedVideoPath == '' ? String(asset.originalPath) : String(asset.encodedVideoPath);
          mimeType = asset.encodedVideoPath == '' ? asset.mimeType : 'video/mp4';
        }

        const { size } = await fileInfo(videoPath);
        const range = headers.range;

        if (range) {
          /** Extracting Start and End value from Range Header */
          const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
          let start = parseInt(startStr, 10);
          let end = endStr ? parseInt(endStr, 10) : size - 1;

          if (!isNaN(start) && isNaN(end)) {
            start = start;
            end = size - 1;
          }
          if (isNaN(start) && !isNaN(end)) {
            start = size - end;
            end = size - 1;
          }

          // Handle unavailable range request
          if (start >= size || end >= size) {
            console.error('Bad Request');
            // Return the 416 Range Not Satisfiable.
            res.status(416).set({
              'Content-Range': `bytes */${size}`,
            });

            throw new BadRequestException('Bad Request Range');
          }

          /** Sending Partial Content With HTTP Code 206 */
          res.status(206).set({
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': end - start + 1,
            'Content-Type': mimeType,
          });

          const videoStream = createReadStream(videoPath, { start: start, end: end });

          return new StreamableFile(videoStream);
        } else {
          res.set({
            'Content-Type': mimeType,
          });
          if (await processETag(asset.originalPath, res, headers)) {
            return;
          }
          return new StreamableFile(createReadStream(videoPath));
        }
      } catch (e) {
        Logger.error(`Error serving VIDEO asset id ${asset.id}`, 'serveFile[VIDEO]');
        throw new InternalServerErrorException(`Failed to serve video asset ${e}`, 'ServeFile');
      }
    }
  }

  public async deleteAll(authUser: AuthUserDto, dto: DeleteAssetDto): Promise<DeleteAssetResponseDto[]> {
    const deleteQueue: AssetEntity[] = [];
    const result: DeleteAssetResponseDto[] = [];

    const ids = dto.ids.slice();
    for (const id of ids) {
      const asset = await this._assetRepository.get(id);
      if (!asset) {
        result.push({ id, status: DeleteAssetStatusEnum.FAILED });
        continue;
      }

      try {
        await this._assetRepository.remove(asset);

        result.push({ id, status: DeleteAssetStatusEnum.SUCCESS });
        deleteQueue.push(asset as any);

        // TODO refactor this to use cascades
        if (asset.livePhotoVideoId && !ids.includes(asset.livePhotoVideoId)) {
          ids.push(asset.livePhotoVideoId);
        }
      } catch {
        result.push({ id, status: DeleteAssetStatusEnum.FAILED });
      }
    }

    if (deleteQueue.length > 0) {
      await this.jobRepository.add({ name: JobName.DELETE_FILE_ON_DISK, data: { assets: deleteQueue } });
    }

    return result;
  }

  async getAssetSearchTerm(authUser: AuthUserDto): Promise<string[]> {
    const possibleSearchTerm = new Set<string>();

    const rows = await this._assetRepository.getSearchPropertiesByUserId(authUser.id);
    rows.forEach((row: SearchPropertiesDto) => {
      // tags
      row.tags?.map((tag: string) => possibleSearchTerm.add(tag?.toLowerCase()));

      // objects
      row.objects?.map((object: string) => possibleSearchTerm.add(object?.toLowerCase()));

      // asset's tyoe
      possibleSearchTerm.add(row.assetType?.toLowerCase() || '');

      // image orientation
      possibleSearchTerm.add(row.orientation?.toLowerCase() || '');

      // Lens model
      possibleSearchTerm.add(row.lensModel?.toLowerCase() || '');

      // Make and model
      possibleSearchTerm.add(row.make?.toLowerCase() || '');
      possibleSearchTerm.add(row.model?.toLowerCase() || '');

      // Location
      possibleSearchTerm.add(row.city?.toLowerCase() || '');
      possibleSearchTerm.add(row.state?.toLowerCase() || '');
      possibleSearchTerm.add(row.country?.toLowerCase() || '');
    });

    return Array.from(possibleSearchTerm).filter((x) => x != null && x != '');
  }

  async searchAsset(authUser: AuthUserDto, searchAssetDto: SearchAssetDto): Promise<AssetResponseDto[]> {
    const query = `
    SELECT a.*
    FROM assets a
             LEFT JOIN smart_info si ON a.id = si."assetId"
             LEFT JOIN exif e ON a.id = e."assetId"

    WHERE a."userId" = $1
       AND
       (
         TO_TSVECTOR('english', ARRAY_TO_STRING(si.tags, ',')) @@ PLAINTO_TSQUERY('english', $2) OR
         TO_TSVECTOR('english', ARRAY_TO_STRING(si.objects, ',')) @@ PLAINTO_TSQUERY('english', $2) OR
         e."exifTextSearchableColumn" @@ PLAINTO_TSQUERY('english', $2)
        );
    `;

    const searchResults: AssetEntity[] = await this.assetRepository.query(query, [
      authUser.id,
      searchAssetDto.searchTerm,
    ]);

    return searchResults.map((asset) => mapAsset(asset));
  }

  async getCuratedLocation(authUser: AuthUserDto): Promise<CuratedLocationsResponseDto[]> {
    return this._assetRepository.getLocationsByUserId(authUser.id);
  }

  async getCuratedObject(authUser: AuthUserDto): Promise<CuratedObjectsResponseDto[]> {
    return this._assetRepository.getDetectedObjectsByUserId(authUser.id);
  }

  async checkDuplicatedAsset(
    authUser: AuthUserDto,
    checkDuplicateAssetDto: CheckDuplicateAssetDto,
  ): Promise<CheckDuplicateAssetResponseDto> {
    const res = await this.assetRepository.findOne({
      where: {
        deviceAssetId: checkDuplicateAssetDto.deviceAssetId,
        deviceId: checkDuplicateAssetDto.deviceId,
        userId: authUser.id,
      },
    });

    const isDuplicated = res ? true : false;

    return new CheckDuplicateAssetResponseDto(isDuplicated, res?.id);
  }

  async checkExistingAssets(
    authUser: AuthUserDto,
    checkExistingAssetsDto: CheckExistingAssetsDto,
  ): Promise<CheckExistingAssetsResponseDto> {
    return this._assetRepository.getExistingAssets(authUser.id, checkExistingAssetsDto);
  }

  async getAssetCountByTimeBucket(
    authUser: AuthUserDto,
    getAssetCountByTimeBucketDto: GetAssetCountByTimeBucketDto,
  ): Promise<AssetCountByTimeBucketResponseDto> {
    const result = await this._assetRepository.getAssetCountByTimeBucket(
      authUser.id,
      getAssetCountByTimeBucketDto.timeGroup,
    );

    return mapAssetCountByTimeBucket(result);
  }

  getAssetByChecksum(userId: string, checksum: Buffer) {
    return this._assetRepository.getAssetByChecksum(userId, checksum);
  }

  getAssetCountByUserId(authUser: AuthUserDto): Promise<AssetCountByUserIdResponseDto> {
    return this._assetRepository.getAssetCountByUserId(authUser.id);
  }

  async checkAssetsAccess(authUser: AuthUserDto, assetIds: string[], mustBeOwner = false) {
    for (const assetId of assetIds) {
      // Step 1: Check if asset is part of a public shared
      if (authUser.sharedLinkId) {
        const canAccess = await this.shareCore.hasAssetAccess(authUser.sharedLinkId, assetId);
        if (canAccess) {
          continue;
        }
      } else {
        // Step 2: Check if user owns asset
        if ((await this._assetRepository.countByIdAndUser(assetId, authUser.id)) == 1) {
          continue;
        }

        // Avoid additional checks if ownership is required
        if (!mustBeOwner) {
          // Step 2: Check if asset is part of an album shared with me
          if ((await this._albumRepository.getSharedWithUserAlbumCount(authUser.id, assetId)) > 0) {
            continue;
          }
        }
      }

      throw new ForbiddenException();
    }
  }

  checkDownloadAccess(authUser: AuthUserDto) {
    this.shareCore.checkDownloadAccess(authUser);
  }

  async createAssetsSharedLink(authUser: AuthUserDto, dto: CreateAssetsShareLinkDto): Promise<SharedLinkResponseDto> {
    const assets = [];

    await this.checkAssetsAccess(authUser, dto.assetIds);
    for (const assetId of dto.assetIds) {
      const asset = await this._assetRepository.getById(assetId);
      assets.push(asset);
    }

    const sharedLink = await this.shareCore.create(authUser.id, {
      type: SharedLinkType.INDIVIDUAL,
      expiresAt: dto.expiresAt,
      allowUpload: dto.allowUpload,
      assets,
      description: dto.description,
      allowDownload: dto.allowDownload,
      showExif: dto.showExif,
    });

    return mapSharedLink(sharedLink);
  }

  async addAssetsToSharedLink(authUser: AuthUserDto, dto: AddAssetsDto): Promise<SharedLinkResponseDto> {
    if (!authUser.sharedLinkId) {
      throw new ForbiddenException();
    }

    const assets = [];

    for (const assetId of dto.assetIds) {
      const asset = await this._assetRepository.getById(assetId);
      assets.push(asset);
    }

    const updatedLink = await this.shareCore.addAssets(authUser.id, authUser.sharedLinkId, assets);
    return mapSharedLink(updatedLink);
  }

  async removeAssetsFromSharedLink(authUser: AuthUserDto, dto: RemoveAssetsDto): Promise<SharedLinkResponseDto> {
    if (!authUser.sharedLinkId) {
      throw new ForbiddenException();
    }

    const assets = [];

    for (const assetId of dto.assetIds) {
      const asset = await this._assetRepository.getById(assetId);
      assets.push(asset);
    }

    const updatedLink = await this.shareCore.removeAssets(authUser.id, authUser.sharedLinkId, assets);
    return mapSharedLink(updatedLink);
  }

  getExifPermission(authUser: AuthUserDto) {
    return !authUser.isPublicUser || authUser.isShowExif;
  }
}

async function processETag(path: string, res: Res, headers: Record<string, string>): Promise<boolean> {
  const { size, mtimeNs } = await fs.stat(path, { bigint: true });
  const etag = `W/"${size}-${mtimeNs}"`;
  res.setHeader('ETag', etag);
  if (etag === headers['if-none-match']) {
    res.status(304);
    return true;
  }
  return false;
}
