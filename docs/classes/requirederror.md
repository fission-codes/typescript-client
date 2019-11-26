[@fission-suite/client](../README.md) › [Globals](../globals.md) › [RequiredError](requirederror.md)

# Class: RequiredError

**`export`** 

**`class`** RequiredError

**`extends`** {Error}

## Hierarchy

* Error

  ↳ **RequiredError**

## Index

### Constructors

* [constructor](requirederror.md#constructor)

### Properties

* [field](requirederror.md#field)
* [message](requirederror.md#message)
* [name](requirederror.md#name)
* [stack](requirederror.md#optional-stack)
* [Error](requirederror.md#static-error)

## Constructors

###  constructor

\+ **new RequiredError**(`field`: string, `msg?`: string): *[RequiredError](requirederror.md)*

*Defined in [src/base.ts:66](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | string |
`msg?` | string |

**Returns:** *[RequiredError](requirederror.md)*

## Properties

###  field

• **field**: *string*

*Defined in [src/base.ts:67](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L67)*

___

###  message

• **message**: *string*

*Inherited from void*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *"RequiredError"* = "RequiredError"

*Overrides void*

*Defined in [src/base.ts:66](https://github.com/fission-suite/typescript-client/blob/6b1c329/src/base.ts#L66)*

___

### `Optional` stack

• **stack**? : *string*

*Inherited from void*

*Overrides void*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
