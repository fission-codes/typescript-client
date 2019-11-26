[@fission-suite/client](../README.md) › [Globals](../globals.md) › [BaseAPI](baseapi.md)

# Class: BaseAPI

**`export`** 

**`class`** BaseAPI

## Hierarchy

* **BaseAPI**

  ↳ [DNSApi](dnsapi.md)

  ↳ [HerokuApi](herokuapi.md)

  ↳ [IPFSApi](ipfsapi.md)

  ↳ [PingApi](pingapi.md)

  ↳ [UsersApi](usersapi.md)

## Index

### Constructors

* [constructor](baseapi.md#constructor)

### Properties

* [axios](baseapi.md#protected-axios)
* [basePath](baseapi.md#protected-basepath)
* [configuration](baseapi.md#protected-configuration)

## Constructors

###  constructor

\+ **new BaseAPI**(`configuration?`: [Configuration](configuration.md), `basePath`: string, `axios`: AxiosInstance): *[BaseAPI](baseapi.md)*

Defined in src/base.ts:49

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`configuration?` | [Configuration](configuration.md) | - |
`basePath` | string |  BASE_PATH |
`axios` | AxiosInstance |  globalAxios |

**Returns:** *[BaseAPI](baseapi.md)*

## Properties

### `Protected` axios

• **axios**: *AxiosInstance*

Defined in src/base.ts:51

___

### `Protected` basePath

• **basePath**: *string*

Defined in src/base.ts:51

___

### `Protected` configuration

• **configuration**: *[Configuration](configuration.md) | undefined*

Defined in src/base.ts:49
