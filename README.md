![](https://github.com/fission-suite/web-api/raw/master/assets/logo.png?sanitize=true)

# FISSION IPFS Web API

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

### Unauthenticated

`content`

Returns content at given CID.

Params:
- cid: CID (string) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```
import { content } from '@fission-suite/client'
const helloWorld = await content("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u")
```

`url`

Returns a formatted url for a given CID.

Params:
- cid: CID (string) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```
import { url } from '@fission-suite/client'
const formattedURL = url("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u")
```

### Authenticated
*These methods require a username/password from the fission webserver. These can be provisioned through our [Fission CLI](https://github.com/fission-suite/cli).*

`add`

Adds content to IPFS and returns the CID of that content.

Params:
- content: Content (json, string, file-stream) **required**
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*
- name: string *optional name for your file, defaults to `undefined`*

Example:
```
import { add } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
const content = {
  key1: 123,
  key2: 456
}
const cid = await add(content, auth)
```

`remove`

Unpins content from Fission server and disassociates CID with user account.

Params:
- cid: CID (string) **required**
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```
import { remove } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
await remove("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u", auth)
```

`pin`

Pins content to Fission server.

Params:
- cid: CID (string) **required**
- auth: Auth ({username: string, password: string}) **required**
- baseURL: string *defaults to fission web-api at `https://runfission.com`*

Example:
```
import { pin } from '@fission-suite/client'
const auth = { username: "username", password: "password" }
await pin("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u", auth)
```

## To add
- [ ] User Register: POST /user
- [ ] User Verify: Get /user/verify
- [ ] User Reset: Get /user/reset_password
- [ ] CIDs All: Get /ipfs/cids
- [ ] Peerss All: Get /ipfs/peers
- [ ] DNS Put: DNS /dns




### Fission objects

For repeated calls, instantiate a fission object:
```
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
