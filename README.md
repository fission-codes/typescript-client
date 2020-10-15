
**The [webnative SDK](https://github.com/fission-suite/webnative) replaces this platform / REST API**

---

[![NPM](https://img.shields.io/npm/v/@fission-suite/client)](https://www.npmjs.com/package/@fission-suite/client)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/fission-suite/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/fission-suite/typescript-client.svg?branch=master)](https://travis-ci.org/fission-suite/typescript-client)
[![Maintainability](https://api.codeclimate.com/v1/badges/2a271d744d14ad487a24/maintainability)](https://codeclimate.com/github/fission-suite/typescript-client/maintainability)
[![Built by FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes)
[![Discord](https://img.shields.io/discord/478735028319158273.svg)](https://discord.gg/zAQBDEq)

A TypeScript client library for access accessing the [FISSION Web API](https://github.com/fission-suite/web-api/).

## Installing
```
$ npm install --save @fission-suite/client
```

## API

### Utility

`getContentURL`

Returns the url to access the given CID on our service.

Params:
- cid: CID (string) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```js
import { getContentURL } from '@fission-suite/client'
const formattedURL = getContentURL("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u")
// "https://runfission.com/ipfs/QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
```

### Unauthenticated

`register`

Registers a user for the Fission service.

Params:
- username: string **required**
- password: string **required**
- email: string

Example:
```js
import { register } from '@fission-suite/client'
await register("username", "password", "email@email.com")
```

`peers`

Gets the address for all IPFS nodes in the Fission Network.

Example:
```js
import { peers } from '@fission-suite/client'
await peers()
// [
//   '/ip4/3.215.160.238/tcp/4001/ipfs/QmVLEz2SxoNiFnuyLpbXsH6SvjPTrHNMU88vCQZyhgBzgw',
//   '/ip4/184.68.124.102/tcp/64417/ipfs/QmQ2Jo91xQyVjhw1kmpk9eeHj6A4W1u5BYdh5xjfC5h11g'
// ]
```

`content`

Returns content at given CID.

Params:
- cid: CID (string) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```js
import { content } from '@fission-suite/client'
const helloWorld = await content("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u")
// "Hello World"
```

### Authenticated
*These methods require a username/password from the fission webserver. These can be provisioned through our [Fission CLI](https://github.com/fission-suite/cli).*

`verify`

Verifies the given credentialls.

Params:
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```js
import { verify } from '@fission-suite/client'
await verify({ username: "username", password: "password" })
// true
```

`resetPassword`

Verifies the given credentialls.

Params:
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```js
import { resetPassword } from '@fission-suite/client'
await resetPassword("newPassword", { username: "username", password: "password" })
// "newPassword"
```

`add`

Adds content to IPFS and returns the CID of that content.

Params:
- content: Content (json, string, file-stream) **required**
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*
- name: string *optional name for your file, defaults to `undefined`*

Example:
```js
import { add } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
const content = {
  key1: 123,
  key2: 456
}
const cid = await add(content, auth)
// "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
```

`remove`

Unpins content from Fission server and disassociates CID with user account.

Params:
- cid: CID (string) **required**
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```js
import { remove } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
await remove("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u", auth)
// undefined
```

`pin`

Pins content to Fission server.

Params:
- cid: CID (string) **required**
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```js
import { pin } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
await pin("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u", auth)
// undefined
```

`cids`

Gets all CIDs associated with the given user.

Params:
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```js
import { cids } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
await cids(auth)
// [
//   "QmYwXpFw1QGAWxEnQWFwLuVpdbupaBcEz2DTTRRRsCt9WR",
//   "QmYp9d8BC2HhDCUVH7JEUZAd6Hbxrc5wBRfUs8TqazJJP9",
// ]
```

`updateDNS`

Updates the users associated subdomain to point at the given CID

Params:
- cid: CID (string) **required**
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```js
import { updateDNS } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
await updateDNS("QmYwXpFw1QGAWxEnQWFwLuVpdbupaBcEz2DTTRRRsCt9WR", auth)
// "username.runfission.com"
```

`createApp`

Creates a new app, assigns an initial subdomain, and sets an asset placeholder

Params:
- subdomain: (string) **required**
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*
Example:
```js
import { createApp } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
await createApp("foo", auth)
// "foo.fission.app"
```

`listApps`

A list of all of your apps and their associated domain names

Params:
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*
Example:
```js
import { listApps } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
await listApps(auth)
// { "key": "foo.fission.app", "key2": "foo-two.fission.app"  }
```


### Fission objects

For repeated calls, instantiate a fission object:
```js
import Fission, { FissionUser } from '@fission-suite/client'

const fission = new Fission("https://someurl.com")
const helloWorld = await fission.content("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u")

const fissionUser = fission.login("username", "password")
// Alternately:
// const fissionUser = new FissionUser("username", "password", "https://someurl.com")

const cid =  await fissionUser.add("Check this out!")
await fissionUser.pin(cid)

const cids = fissionUser.cids()
```

## Testing
- Run `npm i`
- Run tests with: `npm run test`
- Or achieve developer zen with `npm run test:watch`
