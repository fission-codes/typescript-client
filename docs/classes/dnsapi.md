[@fission-suite/client](../README.md) › [Globals](../globals.md) › [DNSApi](dnsapi.md)

# Class: DNSApi

DNSApi - object-oriented interface

**`export`** 

**`class`** DNSApi

**`extends`** {BaseAPI}

## Hierarchy

* [BaseAPI](baseapi.md)

  ↳ **DNSApi**

## Index

### Constructors

* [constructor](dnsapi.md#constructor)

### Properties

* [axios](dnsapi.md#protected-axios)
* [basePath](dnsapi.md#protected-basepath)
* [configuration](dnsapi.md#protected-configuration)

### Methods

* [dnsCidPut](dnsapi.md#dnscidput)

## Constructors

###  constructor

\+ **new DNSApi**(`configuration?`: [Configuration](configuration.md), `basePath`: string, `axios`: AxiosInstance): *[DNSApi](dnsapi.md)*

*Inherited from [BaseAPI](baseapi.md).[constructor](baseapi.md#constructor)*

*Defined in [src/base.ts:49](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L49)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`configuration?` | [Configuration](configuration.md) | - |
`basePath` | string |  BASE_PATH |
`axios` | AxiosInstance |  globalAxios |

**Returns:** *[DNSApi](dnsapi.md)*

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

###  dnsCidPut

▸ **dnsCidPut**(`cid`: string, `options?`: any): *AxiosPromise‹[DomainName](../interfaces/domainname.md)›*

*Defined in [src/api.ts:303](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/api.ts#L303)*

**`throws`** {RequiredError}

**`memberof`** DNSApi

**Parameters:**

Name | Type |
------ | ------ |
`cid` | string |
`options?` | any |

**Returns:** *AxiosPromise‹[DomainName](../interfaces/domainname.md)›*
