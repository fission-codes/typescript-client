[@fission-suite/client](../README.md) › [Globals](../globals.md) › [PingApi](pingapi.md)

# Class: PingApi

PingApi - object-oriented interface

**`export`** 

**`class`** PingApi

**`extends`** {BaseAPI}

## Hierarchy

* [BaseAPI](baseapi.md)

  ↳ **PingApi**

## Index

### Constructors

* [constructor](pingapi.md#constructor)

### Properties

* [axios](pingapi.md#protected-axios)
* [basePath](pingapi.md#protected-basepath)
* [configuration](pingapi.md#protected-configuration)

### Methods

* [pingGet](pingapi.md#pingget)

## Constructors

###  constructor

\+ **new PingApi**(`configuration?`: [Configuration](configuration.md), `basePath`: string, `axios`: AxiosInstance): *[PingApi](pingapi.md)*

*Inherited from [BaseAPI](baseapi.md).[constructor](baseapi.md#constructor)*

*Defined in [src/base.ts:49](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L49)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`configuration?` | [Configuration](configuration.md) | - |
`basePath` | string |  BASE_PATH |
`axios` | AxiosInstance |  globalAxios |

**Returns:** *[PingApi](pingapi.md)*

## Properties

### `Protected` axios

• **axios**: *AxiosInstance*

*Inherited from [BaseAPI](baseapi.md).[axios](baseapi.md#protected-axios)*

*Defined in [src/base.ts:51](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L51)*

___

### `Protected` basePath

• **basePath**: *string*

*Inherited from [BaseAPI](baseapi.md).[basePath](baseapi.md#protected-basepath)*

*Defined in [src/base.ts:51](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L51)*

___

### `Protected` configuration

• **configuration**: *[Configuration](configuration.md) | undefined*

*Inherited from [BaseAPI](baseapi.md).[configuration](baseapi.md#protected-configuration)*

*Defined in [src/base.ts:49](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L49)*

## Methods

###  pingGet

▸ **pingGet**(`options?`: any): *AxiosPromise‹string›*

*Defined in [src/api.ts:1128](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L1128)*

**`throws`** {RequiredError}

**`memberof`** PingApi

**Parameters:**

Name | Type |
------ | ------ |
`options?` | any |

**Returns:** *AxiosPromise‹string›*
