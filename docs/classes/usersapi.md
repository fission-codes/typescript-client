[@fission-suite/client](../README.md) › [Globals](../globals.md) › [UsersApi](usersapi.md)

# Class: UsersApi

UsersApi - object-oriented interface

**`export`** 

**`class`** UsersApi

**`extends`** {BaseAPI}

## Hierarchy

* [BaseAPI](baseapi.md)

  ↳ **UsersApi**

## Index

### Constructors

* [constructor](usersapi.md#constructor)

### Properties

* [axios](usersapi.md#protected-axios)
* [basePath](usersapi.md#protected-basepath)
* [configuration](usersapi.md#protected-configuration)

### Methods

* [userPost](usersapi.md#userpost)
* [userResetPasswordPut](usersapi.md#userresetpasswordput)
* [userVerifyGet](usersapi.md#userverifyget)

## Constructors

###  constructor

\+ **new UsersApi**(`configuration?`: [Configuration](configuration.md), `basePath`: string, `axios`: AxiosInstance): *[UsersApi](usersapi.md)*

*Inherited from [BaseAPI](baseapi.md).[constructor](baseapi.md#constructor)*

Defined in src/base.ts:49

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`configuration?` | [Configuration](configuration.md) | - |
`basePath` | string |  BASE_PATH |
`axios` | AxiosInstance |  globalAxios |

**Returns:** *[UsersApi](usersapi.md)*

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

###  userPost

▸ **userPost**(`body`: [Registration](../interfaces/registration.md), `options?`: any): *AxiosPromise‹object[]›*

Defined in src/api.ts:1342

**`throws`** {RequiredError}

**`memberof`** UsersApi

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Registration](../interfaces/registration.md) |
`options?` | any |

**Returns:** *AxiosPromise‹object[]›*

___

###  userResetPasswordPut

▸ **userResetPasswordPut**(`body`: [PasswordResetRequest](../interfaces/passwordresetrequest.md), `options?`: any): *AxiosPromise‹[Password](../interfaces/password.md)›*

Defined in src/api.ts:1353

**`throws`** {RequiredError}

**`memberof`** UsersApi

**Parameters:**

Name | Type |
------ | ------ |
`body` | [PasswordResetRequest](../interfaces/passwordresetrequest.md) |
`options?` | any |

**Returns:** *AxiosPromise‹[Password](../interfaces/password.md)›*

___

###  userVerifyGet

▸ **userVerifyGet**(`options?`: any): *AxiosPromise‹boolean›*

Defined in src/api.ts:1363

**`throws`** {RequiredError}

**`memberof`** UsersApi

**Parameters:**

Name | Type |
------ | ------ |
`options?` | any |

**Returns:** *AxiosPromise‹boolean›*
