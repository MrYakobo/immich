# openapi.api.AssetApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addAssetsToSharedLink**](AssetApi.md#addassetstosharedlink) | **PATCH** /asset/shared-link/add | 
[**checkDuplicateAsset**](AssetApi.md#checkduplicateasset) | **POST** /asset/check | 
[**checkExistingAssets**](AssetApi.md#checkexistingassets) | **POST** /asset/exist | 
[**createAssetsSharedLink**](AssetApi.md#createassetssharedlink) | **POST** /asset/shared-link | 
[**deleteAsset**](AssetApi.md#deleteasset) | **DELETE** /asset | 
[**downloadFile**](AssetApi.md#downloadfile) | **GET** /asset/download/{assetId} | 
[**downloadFiles**](AssetApi.md#downloadfiles) | **POST** /asset/download-files | 
[**downloadLibrary**](AssetApi.md#downloadlibrary) | **GET** /asset/download-library | 
[**getAllAssets**](AssetApi.md#getallassets) | **GET** /asset | 
[**getAssetById**](AssetApi.md#getassetbyid) | **GET** /asset/assetById/{assetId} | 
[**getAssetByTimeBucket**](AssetApi.md#getassetbytimebucket) | **POST** /asset/time-bucket | 
[**getAssetCountByTimeBucket**](AssetApi.md#getassetcountbytimebucket) | **POST** /asset/count-by-time-bucket | 
[**getAssetCountByUserId**](AssetApi.md#getassetcountbyuserid) | **GET** /asset/count-by-user-id | 
[**getAssetSearchTerms**](AssetApi.md#getassetsearchterms) | **GET** /asset/search-terms | 
[**getAssetThumbnail**](AssetApi.md#getassetthumbnail) | **GET** /asset/thumbnail/{assetId} | 
[**getCuratedLocations**](AssetApi.md#getcuratedlocations) | **GET** /asset/curated-locations | 
[**getCuratedObjects**](AssetApi.md#getcuratedobjects) | **GET** /asset/curated-objects | 
[**getUserAssetsByDeviceId**](AssetApi.md#getuserassetsbydeviceid) | **GET** /asset/{deviceId} | 
[**removeAssetsFromSharedLink**](AssetApi.md#removeassetsfromsharedlink) | **PATCH** /asset/shared-link/remove | 
[**searchAsset**](AssetApi.md#searchasset) | **POST** /asset/search | 
[**serveFile**](AssetApi.md#servefile) | **GET** /asset/file/{assetId} | 
[**updateAsset**](AssetApi.md#updateasset) | **PUT** /asset/{assetId} | 
[**uploadFile**](AssetApi.md#uploadfile) | **POST** /asset/upload | 


# **addAssetsToSharedLink**
> SharedLinkResponseDto addAssetsToSharedLink(addAssetsDto)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final addAssetsDto = AddAssetsDto(); // AddAssetsDto | 

try {
    final result = api_instance.addAssetsToSharedLink(addAssetsDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->addAssetsToSharedLink: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **addAssetsDto** | [**AddAssetsDto**](AddAssetsDto.md)|  | 

### Return type

[**SharedLinkResponseDto**](SharedLinkResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **checkDuplicateAsset**
> CheckDuplicateAssetResponseDto checkDuplicateAsset(checkDuplicateAssetDto)



Check duplicated asset before uploading - for Web upload used

### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final checkDuplicateAssetDto = CheckDuplicateAssetDto(); // CheckDuplicateAssetDto | 

try {
    final result = api_instance.checkDuplicateAsset(checkDuplicateAssetDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->checkDuplicateAsset: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **checkDuplicateAssetDto** | [**CheckDuplicateAssetDto**](CheckDuplicateAssetDto.md)|  | 

### Return type

[**CheckDuplicateAssetResponseDto**](CheckDuplicateAssetResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **checkExistingAssets**
> CheckExistingAssetsResponseDto checkExistingAssets(checkExistingAssetsDto)



Checks if multiple assets exist on the server and returns all existing - used by background backup

### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final checkExistingAssetsDto = CheckExistingAssetsDto(); // CheckExistingAssetsDto | 

try {
    final result = api_instance.checkExistingAssets(checkExistingAssetsDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->checkExistingAssets: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **checkExistingAssetsDto** | [**CheckExistingAssetsDto**](CheckExistingAssetsDto.md)|  | 

### Return type

[**CheckExistingAssetsResponseDto**](CheckExistingAssetsResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createAssetsSharedLink**
> SharedLinkResponseDto createAssetsSharedLink(createAssetsShareLinkDto)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final createAssetsShareLinkDto = CreateAssetsShareLinkDto(); // CreateAssetsShareLinkDto | 

try {
    final result = api_instance.createAssetsSharedLink(createAssetsShareLinkDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->createAssetsSharedLink: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createAssetsShareLinkDto** | [**CreateAssetsShareLinkDto**](CreateAssetsShareLinkDto.md)|  | 

### Return type

[**SharedLinkResponseDto**](SharedLinkResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteAsset**
> List<DeleteAssetResponseDto> deleteAsset(deleteAssetDto)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final deleteAssetDto = DeleteAssetDto(); // DeleteAssetDto | 

try {
    final result = api_instance.deleteAsset(deleteAssetDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->deleteAsset: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deleteAssetDto** | [**DeleteAssetDto**](DeleteAssetDto.md)|  | 

### Return type

[**List<DeleteAssetResponseDto>**](DeleteAssetResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **downloadFile**
> Object downloadFile(assetId)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final assetId = assetId_example; // String | 

try {
    final result = api_instance.downloadFile(assetId);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->downloadFile: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assetId** | **String**|  | 

### Return type

[**Object**](Object.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **downloadFiles**
> Object downloadFiles(downloadFilesDto)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final downloadFilesDto = DownloadFilesDto(); // DownloadFilesDto | 

try {
    final result = api_instance.downloadFiles(downloadFilesDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->downloadFiles: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **downloadFilesDto** | [**DownloadFilesDto**](DownloadFilesDto.md)|  | 

### Return type

[**Object**](Object.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **downloadLibrary**
> Object downloadLibrary(skip)



Current this is not used in any UI element

### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final skip = 8.14; // num | 

try {
    final result = api_instance.downloadLibrary(skip);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->downloadLibrary: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skip** | **num**|  | [optional] 

### Return type

[**Object**](Object.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllAssets**
> List<AssetResponseDto> getAllAssets(isFavorite, skip, ifNoneMatch)



Get all AssetEntity belong to the user

### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final isFavorite = true; // bool | 
final skip = 8.14; // num | 
final ifNoneMatch = ifNoneMatch_example; // String | ETag of data already cached on the client

try {
    final result = api_instance.getAllAssets(isFavorite, skip, ifNoneMatch);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getAllAssets: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isFavorite** | **bool**|  | [optional] 
 **skip** | **num**|  | [optional] 
 **ifNoneMatch** | **String**| ETag of data already cached on the client | [optional] 

### Return type

[**List<AssetResponseDto>**](AssetResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAssetById**
> AssetResponseDto getAssetById(assetId)



Get a single asset's information

### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final assetId = assetId_example; // String | 

try {
    final result = api_instance.getAssetById(assetId);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getAssetById: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assetId** | **String**|  | 

### Return type

[**AssetResponseDto**](AssetResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAssetByTimeBucket**
> List<AssetResponseDto> getAssetByTimeBucket(getAssetByTimeBucketDto)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final getAssetByTimeBucketDto = GetAssetByTimeBucketDto(); // GetAssetByTimeBucketDto | 

try {
    final result = api_instance.getAssetByTimeBucket(getAssetByTimeBucketDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getAssetByTimeBucket: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **getAssetByTimeBucketDto** | [**GetAssetByTimeBucketDto**](GetAssetByTimeBucketDto.md)|  | 

### Return type

[**List<AssetResponseDto>**](AssetResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAssetCountByTimeBucket**
> AssetCountByTimeBucketResponseDto getAssetCountByTimeBucket(getAssetCountByTimeBucketDto)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final getAssetCountByTimeBucketDto = GetAssetCountByTimeBucketDto(); // GetAssetCountByTimeBucketDto | 

try {
    final result = api_instance.getAssetCountByTimeBucket(getAssetCountByTimeBucketDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getAssetCountByTimeBucket: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **getAssetCountByTimeBucketDto** | [**GetAssetCountByTimeBucketDto**](GetAssetCountByTimeBucketDto.md)|  | 

### Return type

[**AssetCountByTimeBucketResponseDto**](AssetCountByTimeBucketResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAssetCountByUserId**
> AssetCountByUserIdResponseDto getAssetCountByUserId()





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();

try {
    final result = api_instance.getAssetCountByUserId();
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getAssetCountByUserId: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**AssetCountByUserIdResponseDto**](AssetCountByUserIdResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAssetSearchTerms**
> List<String> getAssetSearchTerms()





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();

try {
    final result = api_instance.getAssetSearchTerms();
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getAssetSearchTerms: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

**List<String>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAssetThumbnail**
> Object getAssetThumbnail(assetId, format)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final assetId = assetId_example; // String | 
final format = ; // ThumbnailFormat | 

try {
    final result = api_instance.getAssetThumbnail(assetId, format);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getAssetThumbnail: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assetId** | **String**|  | 
 **format** | [**ThumbnailFormat**](.md)|  | [optional] 

### Return type

[**Object**](Object.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCuratedLocations**
> List<CuratedLocationsResponseDto> getCuratedLocations()





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();

try {
    final result = api_instance.getCuratedLocations();
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getCuratedLocations: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**List<CuratedLocationsResponseDto>**](CuratedLocationsResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCuratedObjects**
> List<CuratedObjectsResponseDto> getCuratedObjects()





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();

try {
    final result = api_instance.getCuratedObjects();
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getCuratedObjects: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**List<CuratedObjectsResponseDto>**](CuratedObjectsResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserAssetsByDeviceId**
> List<String> getUserAssetsByDeviceId(deviceId)



Get all asset of a device that are in the database, ID only.

### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final deviceId = deviceId_example; // String | 

try {
    final result = api_instance.getUserAssetsByDeviceId(deviceId);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->getUserAssetsByDeviceId: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceId** | **String**|  | 

### Return type

**List<String>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **removeAssetsFromSharedLink**
> SharedLinkResponseDto removeAssetsFromSharedLink(removeAssetsDto)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final removeAssetsDto = RemoveAssetsDto(); // RemoveAssetsDto | 

try {
    final result = api_instance.removeAssetsFromSharedLink(removeAssetsDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->removeAssetsFromSharedLink: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **removeAssetsDto** | [**RemoveAssetsDto**](RemoveAssetsDto.md)|  | 

### Return type

[**SharedLinkResponseDto**](SharedLinkResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchAsset**
> List<AssetResponseDto> searchAsset(searchAssetDto)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final searchAssetDto = SearchAssetDto(); // SearchAssetDto | 

try {
    final result = api_instance.searchAsset(searchAssetDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->searchAsset: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **searchAssetDto** | [**SearchAssetDto**](SearchAssetDto.md)|  | 

### Return type

[**List<AssetResponseDto>**](AssetResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **serveFile**
> Object serveFile(assetId, isThumb, isWeb)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final assetId = assetId_example; // String | 
final isThumb = true; // bool | 
final isWeb = true; // bool | 

try {
    final result = api_instance.serveFile(assetId, isThumb, isWeb);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->serveFile: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assetId** | **String**|  | 
 **isThumb** | **bool**|  | [optional] 
 **isWeb** | **bool**|  | [optional] 

### Return type

[**Object**](Object.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateAsset**
> AssetResponseDto updateAsset(assetId, updateAssetDto)



Update an asset

### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final assetId = assetId_example; // String | 
final updateAssetDto = UpdateAssetDto(); // UpdateAssetDto | 

try {
    final result = api_instance.updateAsset(assetId, updateAssetDto);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->updateAsset: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assetId** | **String**|  | 
 **updateAssetDto** | [**UpdateAssetDto**](UpdateAssetDto.md)|  | 

### Return type

[**AssetResponseDto**](AssetResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadFile**
> AssetFileUploadResponseDto uploadFile(assetType, assetData, deviceAssetId, deviceId, createdAt, modifiedAt, isFavorite, fileExtension, livePhotoData, isVisible, duration)





### Example
```dart
import 'package:openapi/api.dart';
// TODO Configure HTTP Bearer authorization: bearer
// Case 1. Use String Token
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken('YOUR_ACCESS_TOKEN');
// Case 2. Use Function which generate token.
// String yourTokenGeneratorFunction() { ... }
//defaultApiClient.getAuthentication<HttpBearerAuth>('bearer').setAccessToken(yourTokenGeneratorFunction);

final api_instance = AssetApi();
final assetType = ; // AssetTypeEnum | 
final assetData = BINARY_DATA_HERE; // MultipartFile | 
final deviceAssetId = deviceAssetId_example; // String | 
final deviceId = deviceId_example; // String | 
final createdAt = createdAt_example; // String | 
final modifiedAt = modifiedAt_example; // String | 
final isFavorite = true; // bool | 
final fileExtension = fileExtension_example; // String | 
final livePhotoData = BINARY_DATA_HERE; // MultipartFile | 
final isVisible = true; // bool | 
final duration = duration_example; // String | 

try {
    final result = api_instance.uploadFile(assetType, assetData, deviceAssetId, deviceId, createdAt, modifiedAt, isFavorite, fileExtension, livePhotoData, isVisible, duration);
    print(result);
} catch (e) {
    print('Exception when calling AssetApi->uploadFile: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assetType** | [**AssetTypeEnum**](AssetTypeEnum.md)|  | 
 **assetData** | **MultipartFile**|  | 
 **deviceAssetId** | **String**|  | 
 **deviceId** | **String**|  | 
 **createdAt** | **String**|  | 
 **modifiedAt** | **String**|  | 
 **isFavorite** | **bool**|  | 
 **fileExtension** | **String**|  | 
 **livePhotoData** | **MultipartFile**|  | [optional] 
 **isVisible** | **bool**|  | [optional] 
 **duration** | **String**|  | [optional] 

### Return type

[**AssetFileUploadResponseDto**](AssetFileUploadResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

