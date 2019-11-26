[@fission-suite/client](../README.md) › [Globals](../globals.md) › [IPFSApi](ipfsapi.md)

# Class: IPFSApi

IPFSApi - object-oriented interface

**`export`** 

**`class`** IPFSApi

**`extends`** {BaseAPI}

## Hierarchy

* [BaseAPI](baseapi.md)

  ↳ **IPFSApi**

## Index

### Constructors

* [constructor](ipfsapi.md#constructor)

### Properties

* [axios](ipfsapi.md#protected-axios)
* [basePath](ipfsapi.md#protected-basepath)
* [configuration](ipfsapi.md#protected-configuration)

### Methods

* [ipfsCidDelete](ipfsapi.md#ipfsciddelete)
* [ipfsCidGet](ipfsapi.md#ipfscidget)
* [ipfsCidPut](ipfsapi.md#ipfscidput)
* [ipfsCidsGet](ipfsapi.md#ipfscidsget)
* [ipfsDagPost](ipfsapi.md#ipfsdagpost)
* [ipfsGet](ipfsapi.md#ipfsget)
* [ipfsPeersGet](ipfsapi.md#ipfspeersget)
* [ipfsPost](ipfsapi.md#ipfspost)

## Constructors

###  constructor

\+ **new IPFSApi**(`configuration?`: [Configuration](configuration.md), `basePath`: string, `axios`: AxiosInstance): *[IPFSApi](ipfsapi.md)*

*Inherited from [BaseAPI](baseapi.md).[constructor](baseapi.md#constructor)*

Defined in src/base.ts:49

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`configuration?` | [Configuration](configuration.md) | - |
`basePath` | string |  BASE_PATH |
`axios` | AxiosInstance |  globalAxios |

**Returns:** *[IPFSApi](ipfsapi.md)*

## Properties

### `Protected` axios

• **axios**: *AxiosInstance*

*Inherited from [BaseAPI](baseapi.md).[axios](baseapi.md#protected-axios)*

Defined in src/base.ts:51

___

### `Protected` basePath

• **basePath**: *string*

*Inherited from [BaseAPI](baseapi.md).[basePath](baseapi.md#protected-basepath)*

Defined in src/base.ts:51

___

### `Protected` configuration

• **configuration**: *[Configuration](configuration.md) | undefined*

*Inherited from [BaseAPI](baseapi.md).[configuration](baseapi.md#protected-configuration)*

Defined in src/base.ts:49

## Methods

###  ipfsCidDelete

▸ **ipfsCidDelete**(`cid`: string, `options?`: any): *AxiosPromise‹void›*

Defined in src/api.ts:958

**`throws`** {RequiredError}

**`memberof`** IPFSApi

**Parameters:**

Name | Type |
------ | ------ |
`cid` | string |
`options?` | any |

**Returns:** *AxiosPromise‹void›*

___

###  ipfsCidGet

▸ **ipfsCidGet**(`cid`: string, `options?`: any): *AxiosPromise‹string›*

Defined in src/api.ts:969

**`throws`** {RequiredError}

**`memberof`** IPFSApi

**Parameters:**

Name | Type |
------ | ------ |
`cid` | string |
`options?` | any |

**Returns:** *AxiosPromise‹string›*

___

###  ipfsCidPut

▸ **ipfsCidPut**(`cid`: string, `options?`: any): *AxiosPromise‹void›*

Defined in src/api.ts:980

**`throws`** {RequiredError}

**`memberof`** IPFSApi

**Parameters:**

Name | Type |
------ | ------ |
`cid` | string |
`options?` | any |

**Returns:** *AxiosPromise‹void›*

___

###  ipfsCidsGet

▸ **ipfsCidsGet**(`options?`: any): *AxiosPromise‹string[]›*

Defined in src/api.ts:990

**`throws`** {RequiredError}

**`memberof`** IPFSApi

**Parameters:**

Name | Type |
------ | ------ |
`options?` | any |

**Returns:** *AxiosPromise‹string[]›*

___

###  ipfsDagPost

▸ **ipfsDagPost**(`body`: string, `options?`: any): *AxiosPromise‹string›*

Defined in src/api.ts:1001

**`throws`** {RequiredError}

**`memberof`** IPFSApi

**Parameters:**

Name | Type |
------ | ------ |
`body` | string |
`options?` | any |

**Returns:** *AxiosPromise‹string›*

___

###  ipfsGet

▸ **ipfsGet**(`cid?`: string, `options?`: any): *AxiosPromise‹string›*

Defined in src/api.ts:1012

**`throws`** {RequiredError}

**`memberof`** IPFSApi

**Parameters:**

Name | Type |
------ | ------ |
`cid?` | string |
`options?` | any |

**Returns:** *AxiosPromise‹string›*

___

###  ipfsPeersGet

▸ **ipfsPeersGet**(`options?`: any): *AxiosPromise‹string[]›*

Defined in src/api.ts:1022

**`throws`** {RequiredError}

**`memberof`** IPFSApi

**Parameters:**

Name | Type |
------ | ------ |
`options?` | any |

**Returns:** *AxiosPromise‹string[]›*

___

###  ipfsPost

▸ **ipfsPost**(`name?`: string, `options?`: any): *AxiosPromise‹string›*

Defined in src/api.ts:1033

**`throws`** {RequiredError}

**`memberof`** IPFSApi

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |
`options?` | any |

**Returns:** *AxiosPromise‹string›*
