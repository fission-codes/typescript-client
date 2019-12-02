import Fission, {
  FissionUser,
  content,
  url,
  cids,
  add,
  remove,
  pin,
  CID,
  Auth,
  Content as IPFSContent
} from '../src/client'

import { Object as JSONObject } from 'json-typescript'
import axios from 'axios'

// NOTE: We must import sinon in this manner: https://github.com/sinonjs/sinon/issues/1711
const sinon = require('sinon')

/* CONSTANTS */

const BASE_URL = 'https://runfission.com'
const TEST_AUTH = { username: 'test_username', password: 'test_password' } as Auth
const TEST_CID = 'QmYFkqxQM63pcM5RzAQ4Fs9gei8YgHWu6DPWutfUs8Dvze'
const STRING_CONTENT = 'string content'
const JSON_CONTENT = {
  string: 'testing',
  array: [1, -1, 1000, 0]
} as JSONObject

/* Helpers */

type RequestTest = {
  desc: string
  responseData: object
  requestFn: () => Promise<IPFSContent>
  expectedReturn: any
  expectedUrl: string
  expectedContentType: string
  method: string
}

const testRequestProperties = (opts: RequestTest) => {
  return describe(opts.desc, () => {
    let ipfsContent: IPFSContent
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r(opts.responseData)))
      sinon.replace(axios, opts.method, fake)
      ipfsContent = await opts.requestFn()
    })

    it('returns IPFS content', () => {
      expect(ipfsContent).toEqual(opts.expectedReturn)
    })

    it('sends one GET request per call', () => {
      expect(fake.callCount).toEqual(1)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(opts.expectedUrl)
    })

    it('requests an octet-stream', () => {
      expect(fake.args[0][1]).toEqual({
        headers: {
          'content-type': opts.expectedContentType
        }
      })
    })
  })
}

describe('Fission', () => {
  let fission: Fission
  let fissionUser: FissionUser

  beforeEach(() => sinon.restore())

  beforeAll(() => {
    fission = new Fission(BASE_URL)
    fissionUser = fission.login(TEST_AUTH.username, TEST_AUTH.password)
  })

  it('returns an instance of fission on login', () => {
    expect(fissionUser).toBeInstanceOf(FissionUser)
  })

  it('gives properly formatted urls for IPFS content', () => {
    const url = fission.url(TEST_CID)
    expect(url).toEqual(`${BASE_URL}/ipfs/${TEST_CID}`)
  })

  it('defaults BASE_URL when formatting url', () => {
    const contentURL = url(TEST_CID)
    expect(contentURL).toEqual(`https://runfission.com/ipfs/${TEST_CID}`)
  })

  testRequestProperties({
    desc: 'retrieves IPFS content',
    method: 'get',
    responseData: { data: STRING_CONTENT },
    requestFn: () => fission.content(TEST_CID),
    expectedReturn: STRING_CONTENT,
    expectedUrl: `${BASE_URL}/ipfs/${TEST_CID}`,
    expectedContentType: 'application/octet-stream'
  })
})

// TODO add base_url test
// it('defaults BASE_URL to https://runfission.com', () => {
//   expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs/${TEST_CID}`)
// })

describe('FissionUser', () => {
  let fission: FissionUser

  beforeEach(() => sinon.restore())

  beforeAll(() => {
    fission = new FissionUser(TEST_AUTH.username, TEST_AUTH.password, BASE_URL)
  })

  describe('returns cids associated with user', () => {
    let fake: sinon.SinonSpy
    let cidList: CID[]
    let TEST_CIDs = [
      TEST_CID,
      'QmYp9d8BC2HhDCUVH7JEUZAd6Hbxrc5wBRfUs8TqazJJP9',
      'QmYwXpFw1QGAWxEnQWFwLuVpdbupaBcEz2DTTRRRsCt9WR'
    ]

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: TEST_CIDs })))
      sinon.replace(axios, 'get', fake)
      cidList = await fission.cids()
      await cids(TEST_AUTH)
    })

    it('returns list of CIDs', () => {
      expect(cidList).toEqual(TEST_CIDs)
    })

    it('sends one GET request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${BASE_URL}/ipfs/cids`)
    })

    it('defaults BASE_URL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs/cids`)
    })
  })

  describe('adds strings to ipfs', () => {
    let cid: CID
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: TEST_CID })))
      sinon.replace(axios, 'post', fake)
      cid = await fission.add(STRING_CONTENT)
      await add(STRING_CONTENT, TEST_AUTH)
    })

    it('returns valid CID', () => {
      expect(cid).toEqual(TEST_CID)
    })

    it('sends one POST request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${BASE_URL}/ipfs`)
    })

    it('sends request with correct content to add', () => {
      expect(fake.args[0][1]).toEqual(STRING_CONTENT)
    })

    it('requests an octet-stream with basic auth', () => {
      expect(fake.args[0][2]).toEqual({
        headers: {
          'content-type': 'application/octet-stream'
        },
        auth: TEST_AUTH
      })
    })

    it('defaults BASE_URL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs`)
    })
  })

  describe('adds json (with name) to ipfs', () => {
    let cid: CID
    let fake: sinon.SinonSpy
    let name = 'json object'

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: TEST_CID })))
      sinon.replace(axios, 'post', fake)
      cid = await fission.add(JSON_CONTENT, name)
      await add(JSON_CONTENT, TEST_AUTH)
    })

    it('returns valid CID', () => {
      expect(cid).toEqual(TEST_CID)
    })

    it('sends one POST request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${BASE_URL}/ipfs?name=json object`)
    })

    it('sends request with correct content to add', () => {
      expect(fake.args[0][1]).toEqual(JSON_CONTENT)
    })

    it('requests an octet-stream with basic auth', () => {
      expect(fake.args[0][2]).toEqual({
        headers: {
          'content-type': 'application/octet-stream'
        },
        auth: TEST_AUTH
      })
    })

    it('defaults BASE_URL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs`)
    })
  })

  describe('pins content to ipfs', () => {
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: {} })))
      sinon.replace(axios, 'put', fake)
      await fission.pin(TEST_CID)
      await pin(TEST_CID, TEST_AUTH)
    })

    it('sends one PUT request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${BASE_URL}/ipfs/${TEST_CID}`)
    })

    it('defaults BASE_URL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs/${TEST_CID}`)
    })
  })

  describe('removes content from ipfs', () => {
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: {} })))
      sinon.replace(axios, 'delete', fake)
      await fission.remove(TEST_CID)
      await remove(TEST_CID, TEST_AUTH)
    })

    it('sends one DELETE request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${BASE_URL}/ipfs/${TEST_CID}`)
    })

    it('defaults BASE_URL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs/${TEST_CID}`)
    })
  })
})
