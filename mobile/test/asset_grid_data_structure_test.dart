import 'package:flutter_test/flutter_test.dart';
import 'package:immich_mobile/modules/home/ui/asset_grid/asset_grid_data_structure.dart';
import 'package:immich_mobile/shared/models/asset.dart';

void main() {
  final List<Asset> testAssets = [];

  for (int i = 0; i < 150; i++) {
    int month = i ~/ 31;
    int day = (i % 31).toInt();

    DateTime date = DateTime(2022, month, day);

    testAssets.add(
      Asset(
        deviceAssetId: '$i',
        deviceId: '',
        ownerId: '',
        createdAt: date,
        modifiedAt: date,
        durationInSeconds: 0,
        fileName: '',
        isFavorite: false,
      ),
    );
  }

  final List<Asset> assets = [];

  assets.addAll(
    testAssets.sublist(0, 5).map((e) {
      e.createdAt = DateTime(2022, 1, 5);
      return e;
    }).toList(),
  );
  assets.addAll(
    testAssets.sublist(5, 10).map((e) {
      e.createdAt = DateTime(2022, 1, 10);
      return e;
    }).toList(),
  );
  assets.addAll(
    testAssets.sublist(10, 15).map((e) {
      e.createdAt = DateTime(2022, 2, 17);
      return e;
    }).toList(),
  );
  assets.addAll(
    testAssets.sublist(15, 30).map((e) {
      e.createdAt = DateTime(2022, 10, 15);
      return e;
    }).toList(),
  );

  group('Test grouped', () {
    test('test grouped check months', () async {
      final renderList = await RenderList.fromAssets(
        assets,
        AssetGridLayoutParameters(
          3,
          false,
          GroupAssetsBy.day,
        ),
      );

      // Oct
      // Day 1
      // 15 Assets => 5 Rows
      // Feb
      // Day 1
      // 5 Assets => 2 Rows
      // Jan
      // Day 2
      // 5 Assets => 2 Rows
      // Day 1
      // 5 Assets => 2 Rows
      expect(renderList.elements.length, 18);
      expect(
        renderList.elements[0].type,
        RenderAssetGridElementType.monthTitle,
      );
      expect(renderList.elements[0].date.month, 10);
      expect(
        renderList.elements[7].type,
        RenderAssetGridElementType.monthTitle,
      );
      expect(renderList.elements[7].date.month, 2);
      expect(
        renderList.elements[11].type,
        RenderAssetGridElementType.monthTitle,
      );
      expect(renderList.elements[11].date.month, 1);
    });

    test('test grouped check types', () async {
      final renderList = await RenderList.fromAssets(
        assets,
        AssetGridLayoutParameters(
          5,
          false,
          GroupAssetsBy.day,
        ),
      );

      // Oct
      // Day 1
      // 15 Assets => 3 Rows
      // Feb
      // Day 1
      // 5 Assets => 1 Row
      // Jan
      // Day 2
      // 5 Assets => 1 Row
      // Day 1
      // 5 Assets => 1 Row
      final types = [
        RenderAssetGridElementType.monthTitle,
        RenderAssetGridElementType.groupDividerTitle,
        RenderAssetGridElementType.assetRow,
        RenderAssetGridElementType.assetRow,
        RenderAssetGridElementType.assetRow,
        RenderAssetGridElementType.monthTitle,
        RenderAssetGridElementType.groupDividerTitle,
        RenderAssetGridElementType.assetRow,
        RenderAssetGridElementType.monthTitle,
        RenderAssetGridElementType.groupDividerTitle,
        RenderAssetGridElementType.assetRow,
        RenderAssetGridElementType.groupDividerTitle,
        RenderAssetGridElementType.assetRow,
      ];

      expect(renderList.elements.length, types.length);

      for (int i = 0; i < renderList.elements.length; i++) {
        expect(renderList.elements[i].type, types[i]);
      }
    });
  });
}
