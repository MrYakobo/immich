import { APP_UPLOAD_LOCATION, userUtils } from '@app/common';
import { AlbumEntity, APIKeyEntity, AssetEntity, UserEntity, UserTokenEntity } from '@app/infra';
import { QueueName, JobName } from '@app/domain';
import { IUserDeletionJob } from '@app/domain';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { join } from 'path';
import fs from 'fs';
import { Repository } from 'typeorm';

@Processor(QueueName.USER_DELETION)
export class UserDeletionProcessor {
  private logger = new Logger(UserDeletionProcessor.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,

    @InjectRepository(APIKeyEntity)
    private apiKeyRepository: Repository<APIKeyEntity>,

    @InjectRepository(UserTokenEntity)
    private userTokenRepository: Repository<UserTokenEntity>,

    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  @Process(JobName.USER_DELETION)
  async processUserDeletion(job: Job<IUserDeletionJob>) {
    const { user } = job.data;

    // just for extra protection here
    if (!userUtils.isReadyForDeletion(user)) {
      this.logger.warn(`Skipped user that was not ready for deletion: id=${user.id}`);
      return;
    }

    this.logger.log(`Deleting user: ${user.id}`);

    try {
      const basePath = APP_UPLOAD_LOCATION;
      const userAssetDir = join(basePath, user.id);
      this.logger.warn(`Removing user from filesystem: ${userAssetDir}`);
      fs.rmSync(userAssetDir, { recursive: true, force: true });

      this.logger.warn(`Removing user from database: ${user.id}`);
      const userTokens = await this.userTokenRepository.find({
        where: { user: { id: user.id } },
        relations: { user: true },
        withDeleted: true,
      });
      await this.userTokenRepository.remove(userTokens);

      const albums = await this.albumRepository.find({ where: { ownerId: user.id } });
      await this.albumRepository.remove(albums);

      await this.apiKeyRepository.delete({ userId: user.id });
      await this.assetRepository.delete({ userId: user.id });
      await this.userRepository.remove(user);
    } catch (error: any) {
      this.logger.error(`Failed to remove user`);
      this.logger.error(error, error?.stack);
      throw error;
    }
  }
}
