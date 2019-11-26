[@fission-suite/client](README.md) › [Globals](globals.md)

# @fission-suite/client

## Index

### Enumerations

* [Region](enums/region.md)
* [Tier](enums/tier.md)

### Classes

* [BaseAPI](classes/baseapi.md)
* [Configuration](classes/configuration.md)
* [DNSApi](classes/dnsapi.md)
* [HerokuApi](classes/herokuapi.md)
* [IPFSApi](classes/ipfsapi.md)
* [PingApi](classes/pingapi.md)
* [RequiredError](classes/requirederror.md)
* [UsersApi](classes/usersapi.md)

### Interfaces

* [ConfigurationParameters](interfaces/configurationparameters.md)
* [DomainName](interfaces/domainname.md)
* [Password](interfaces/password.md)
* [PasswordResetRequest](interfaces/passwordresetrequest.md)
* [ProvisionRequest](interfaces/provisionrequest.md)
* [Registration](interfaces/registration.md)
* [RequestArgs](interfaces/requestargs.md)
* [UserConfig](interfaces/userconfig.md)
* [UserProvisionResponse](interfaces/userprovisionresponse.md)

### Variables

* [BASE_PATH](globals.md#const-base_path)

### Functions

* [DNSApiAxiosParamCreator](globals.md#const-dnsapiaxiosparamcreator)
* [DNSApiFactory](globals.md#const-dnsapifactory)
* [DNSApiFp](globals.md#const-dnsapifp)
* [HerokuApiAxiosParamCreator](globals.md#const-herokuapiaxiosparamcreator)
* [HerokuApiFactory](globals.md#const-herokuapifactory)
* [HerokuApiFp](globals.md#const-herokuapifp)
* [IPFSApiAxiosParamCreator](globals.md#const-ipfsapiaxiosparamcreator)
* [IPFSApiFactory](globals.md#const-ipfsapifactory)
* [IPFSApiFp](globals.md#const-ipfsapifp)
* [PingApiAxiosParamCreator](globals.md#const-pingapiaxiosparamcreator)
* [PingApiFactory](globals.md#const-pingapifactory)
* [PingApiFp](globals.md#const-pingapifp)
* [UsersApiAxiosParamCreator](globals.md#const-usersapiaxiosparamcreator)
* [UsersApiFactory](globals.md#const-usersapifactory)
* [UsersApiFp](globals.md#const-usersapifp)

### Object literals

* [COLLECTION_FORMATS](globals.md#const-collection_formats)

## Variables

### `Const` BASE_PATH

• **BASE_PATH**: *string* =  "https://runfission.com".replace(/\/+$/, "")

*Defined in [src/base.ts:20](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L20)*

## Functions

### `Const` DNSApiAxiosParamCreator

▸ **DNSApiAxiosParamCreator**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:210](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L210)*

DNSApi - axios parameter creator

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **dnsCidPut**(`cid`: string, `options`: any): *[RequestArgs](interfaces/requestargs.md)*

___

### `Const` DNSApiFactory

▸ **DNSApiFactory**(`configuration?`: [Configuration](classes/configuration.md), `basePath?`: string, `axios?`: AxiosInstance): *object*

*Defined in [src/api.ts:275](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L275)*

DNSApi - factory interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |
`basePath?` | string |
`axios?` | AxiosInstance |

**Returns:** *object*

* **dnsCidPut**(`cid`: string, `options?`: any): *AxiosPromise‹[DomainName](interfaces/domainname.md)›*

___

### `Const` DNSApiFp

▸ **DNSApiFp**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:253](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L253)*

DNSApi - functional programming interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **dnsCidPut**(`cid`: string, `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹[DomainName](interfaces/domainname.md)›*

___

### `Const` HerokuApiAxiosParamCreator

▸ **HerokuApiAxiosParamCreator**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:314](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L314)*

HerokuApi - axios parameter creator

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **herokuResourcesAddonIdDelete**(`addonId`: string, `options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **herokuResourcesPost**(`body`: [ProvisionRequest](interfaces/provisionrequest.md), `options`: any): *[RequestArgs](interfaces/requestargs.md)*

___

### `Const` HerokuApiFactory

▸ **HerokuApiFactory**(`configuration?`: [Configuration](classes/configuration.md), `basePath?`: string, `axios?`: AxiosInstance): *object*

*Defined in [src/api.ts:429](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L429)*

HerokuApi - factory interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |
`basePath?` | string |
`axios?` | AxiosInstance |

**Returns:** *object*

* **herokuResourcesAddonIdDelete**(`addonId`: string, `options?`: any): *AxiosPromise‹void›*

* **herokuResourcesPost**(`body`: [ProvisionRequest](interfaces/provisionrequest.md), `options?`: any): *AxiosPromise‹[UserProvisionResponse](interfaces/userprovisionresponse.md)›*

___

### `Const` HerokuApiFp

▸ **HerokuApiFp**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:394](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L394)*

HerokuApi - functional programming interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **herokuResourcesAddonIdDelete**(`addonId`: string, `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹void›*

* **herokuResourcesPost**(`body`: [ProvisionRequest](interfaces/provisionrequest.md), `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹[UserProvisionResponse](interfaces/userprovisionresponse.md)›*

___

### `Const` IPFSApiAxiosParamCreator

▸ **IPFSApiAxiosParamCreator**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:488](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L488)*

IPFSApi - axios parameter creator

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **ipfsCidDelete**(`cid`: string, `options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **ipfsCidGet**(`cid`: string, `options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **ipfsCidPut**(`cid`: string, `options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **ipfsCidsGet**(`options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **ipfsDagPost**(`body`: string, `options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **ipfsGet**(`cid?`: string, `options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **ipfsPeersGet**(`options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **ipfsPost**(`name?`: string, `options`: any): *[RequestArgs](interfaces/requestargs.md)*

___

### `Const` IPFSApiFactory

▸ **IPFSApiFactory**(`configuration?`: [Configuration](classes/configuration.md), `basePath?`: string, `axios?`: AxiosInstance): *object*

*Defined in [src/api.ts:869](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L869)*

IPFSApi - factory interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |
`basePath?` | string |
`axios?` | AxiosInstance |

**Returns:** *object*

* **ipfsCidDelete**(`cid`: string, `options?`: any): *AxiosPromise‹void›*

* **ipfsCidGet**(`cid`: string, `options?`: any): *AxiosPromise‹string›*

* **ipfsCidPut**(`cid`: string, `options?`: any): *AxiosPromise‹void›*

* **ipfsCidsGet**(`options?`: any): *AxiosPromise‹string[]›*

* **ipfsDagPost**(`body`: string, `options?`: any): *AxiosPromise‹string›*

* **ipfsGet**(`cid?`: string, `options?`: any): *AxiosPromise‹string›*

* **ipfsPeersGet**(`options?`: any): *AxiosPromise‹string[]›*

* **ipfsPost**(`name?`: string, `options?`: any): *AxiosPromise‹string›*

___

### `Const` IPFSApiFp

▸ **IPFSApiFp**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:758](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L758)*

IPFSApi - functional programming interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **ipfsCidDelete**(`cid`: string, `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹void›*

* **ipfsCidGet**(`cid`: string, `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹string›*

* **ipfsCidPut**(`cid`: string, `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹void›*

* **ipfsCidsGet**(`options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹Array‹string››*

* **ipfsDagPost**(`body`: string, `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹string›*

* **ipfsGet**(`cid?`: string, `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹string›*

* **ipfsPeersGet**(`options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹Array‹string››*

* **ipfsPost**(`name?`: string, `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹string›*

___

### `Const` PingApiAxiosParamCreator

▸ **PingApiAxiosParamCreator**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:1044](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L1044)*

PingApi - axios parameter creator

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **pingGet**(`options`: any): *[RequestArgs](interfaces/requestargs.md)*

___

### `Const` PingApiFactory

▸ **PingApiFactory**(`configuration?`: [Configuration](classes/configuration.md), `basePath?`: string, `axios?`: AxiosInstance): *object*

*Defined in [src/api.ts:1102](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L1102)*

PingApi - factory interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |
`basePath?` | string |
`axios?` | AxiosInstance |

**Returns:** *object*

* **pingGet**(`options?`: any): *AxiosPromise‹string›*

___

### `Const` PingApiFp

▸ **PingApiFp**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:1081](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L1081)*

PingApi - functional programming interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **pingGet**(`options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹string›*

___

### `Const` UsersApiAxiosParamCreator

▸ **UsersApiAxiosParamCreator**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:1139](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L1139)*

UsersApi - axios parameter creator

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **userPost**(`body`: [Registration](interfaces/registration.md), `options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **userResetPasswordPut**(`body`: [PasswordResetRequest](interfaces/passwordresetrequest.md), `options`: any): *[RequestArgs](interfaces/requestargs.md)*

* **userVerifyGet**(`options`: any): *[RequestArgs](interfaces/requestargs.md)*

___

### `Const` UsersApiFactory

▸ **UsersApiFactory**(`configuration?`: [Configuration](classes/configuration.md), `basePath?`: string, `axios?`: AxiosInstance): *object*

*Defined in [src/api.ts:1297](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L1297)*

UsersApi - factory interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |
`basePath?` | string |
`axios?` | AxiosInstance |

**Returns:** *object*

* **userPost**(`body`: [Registration](interfaces/registration.md), `options?`: any): *AxiosPromise‹object[]›*

* **userResetPasswordPut**(`body`: [PasswordResetRequest](interfaces/passwordresetrequest.md), `options?`: any): *AxiosPromise‹[Password](interfaces/password.md)›*

* **userVerifyGet**(`options?`: any): *AxiosPromise‹boolean›*

___

### `Const` UsersApiFp

▸ **UsersApiFp**(`configuration?`: [Configuration](classes/configuration.md)): *object*

*Defined in [src/api.ts:1250](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L1250)*

UsersApi - functional programming interface

**Parameters:**

Name | Type |
------ | ------ |
`configuration?` | [Configuration](classes/configuration.md) |

**Returns:** *object*

* **userPost**(`body`: [Registration](interfaces/registration.md), `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹Array‹object››*

* **userResetPasswordPut**(`body`: [PasswordResetRequest](interfaces/passwordresetrequest.md), `options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹[Password](interfaces/password.md)›*

* **userVerifyGet**(`options?`: any): *function*

  * (`axios?`: AxiosInstance, `basePath?`: string): *AxiosPromise‹boolean›*

## Object literals

### `Const` COLLECTION_FORMATS

### ▪ **COLLECTION_FORMATS**: *object*

*Defined in [src/base.ts:26](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L26)*

**`export`** 

###  csv

• **csv**: *string* = ","

*Defined in [src/base.ts:27](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L27)*

###  pipes

• **pipes**: *string* = "|"

*Defined in [src/base.ts:30](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L30)*

###  ssv

• **ssv**: *string* = " "

*Defined in [src/base.ts:28](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L28)*

###  tsv

• **tsv**: *string* = "	"

*Defined in [src/base.ts:29](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L29)*
