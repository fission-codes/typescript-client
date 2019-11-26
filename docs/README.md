[@fission-suite/client](README.md) › [Globals](globals.md)

# @fission-suite/client

![](https://github.com/fission-suite/web-api/raw/master/assets/logo.png?sanitize=true)

# FISSION IPFS Web API

[![NPM](https://img.shields.io/npm/v/@fission-suite/client)](https://www.npmjs.com/package/@fission-suite/client)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/fission-suite/blob/master/LICENSE)
[![Built by FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes)
[![Discord](https://img.shields.io/discord/478735028319158273.svg)](https://discord.gg/zAQBDEq)

## Getting Started
### Installation
```bash
npm install @fission-suite/client --save
```

### Usage
You can read our full [API Documentation here.](docs/README.md).
Below is an example of how you can begin calling our API using basic auth:

```js
import {IPFSApi} from '@fission-suite/client';
const FISSION_CREDENTIALS = {username: 'FISSION_USERNAME', password: 'FISSION_AUTH_TOKEN'}
const IPFSApiClient = new IPFSApi(FISSION_CREDENTIALS)
IPFSApiClient.ipfsPeersGet().then(data => console.dir({data}))
```

Note there are [multiple API clients available](docs/classes/baseapi.md) for you to use.

## @fission-suite/client

This is a generated TypeScript/JavaScript client (created by [OpenAPI Generator](https://openapi-generator.tech/docs/installation)) that utilizes [axios](https://github.com/axios/axios). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition should be automatically resolved via `package.json`. ([Reference](http://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html))

### Building

To build and compile the typescript sources to javascript use:
```bash
npm install
npm run build
```

### Publishing

First build the package then run ```npm publish```

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```bash
npm install @fission-suite/client --save
```

_unPublished (not recommended):_

```bash
npm install PATH_TO_GENERATED_PACKAGE --save
```
## Updating the library

### Prerequisites
- [OpenAPI Generator](https://openapi-generator.tech/docs/installation)
- Node/NPM

### Generating the client
The following will regenerate the API client files from the OpenAPI destination
```bash
cd {PATH_TO_PROJECT}
openapi-generator generate -g typescript-axios -i https://runfission.com/docs.json -o src
```

### Regenerating docs
The following will regenerate the markdown docs from the typescript definitions
```bash
npm run build:docs
````
