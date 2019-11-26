[@fission-suite/client](../README.md) › [Globals](../globals.md) › [HerokuApi](herokuapi.md)

# Class: HerokuApi

HerokuApi - object-oriented interface

**`export`** 

**`class`** HerokuApi

**`extends`** {BaseAPI}

## Hierarchy

* [BaseAPI](baseapi.md)

  ↳ **HerokuApi**

## Index

### Constructors

* [constructor](herokuapi.md#constructor)

### Properties

* [axios](herokuapi.md#protected-axios)
* [basePath](herokuapi.md#protected-basepath)
* [configuration](herokuapi.md#protected-configuration)

### Methods

* [herokuResourcesAddonIdDelete](herokuapi.md#herokuresourcesaddoniddelete)
* [herokuResourcesPost](herokuapi.md#herokuresourcespost)

## Constructors

###  constructor

\+ **new HerokuApi**(`configuration?`: [Configuration](configuration.md), `basePath`: string, `axios`: AxiosInstance): *[HerokuApi](herokuapi.md)*

*Inherited from [BaseAPI](baseapi.md).[constructor](baseapi.md#constructor)*

*Defined in [src/base.ts:49](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L49)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`configuration?` | [Configuration](configuration.md) | - |
`basePath` | string |  BASE_PATH |
`axios` | AxiosInstance |  globalAxios |

**Returns:** *[HerokuApi](herokuapi.md)*

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

###  herokuResourcesAddonIdDelete

▸ **herokuResourcesAddonIdDelete**(`addonId`: string, `options?`: any): *AxiosPromise‹void›*

*Defined in [src/api.ts:466](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L466)*

**`throws`** {RequiredError}

**`memberof`** HerokuApi

**Parameters:**

Name | Type |
------ | ------ |
`addonId` | string |
`options?` | any |

**Returns:** *AxiosPromise‹void›*

___

###  herokuResourcesPost

▸ **herokuResourcesPost**(`body`: [ProvisionRequest](../interfaces/provisionrequest.md), `options?`: any): *AxiosPromise‹[UserProvisionResponse](../interfaces/userprovisionresponse.md)›*

*Defined in [src/api.ts:477](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L477)*

**`throws`** {RequiredError}

**`memberof`** HerokuApi

**Parameters:**

Name | Type |
------ | ------ |
`body` | [ProvisionRequest](../interfaces/provisionrequest.md) |
`options?` | any |

**Returns:** *AxiosPromise‹[UserProvisionResponse](../interfaces/userprovisionresponse.md)›*
