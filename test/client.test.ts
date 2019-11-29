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
const sinon = require('sinon')

// test variables
const baseURL = 'https://runfission.com'
const username = 'test_username'
const password = 'test_password'
const auth = { username, password } as Auth

const strContent = 'string content'
const jsonContent = {
  string: 'testing',
  array: [1, -1, 1000, 0]
} as JSONObject
const testCID = 'QmYFkqxQM63pcM5RzAQ4Fs9gei8YgHWu6DPWutfUs8Dvze'

describe('Fission', () => {
  let fission: Fission
  let fissionUser: FissionUser

  beforeEach(() => sinon.restore())

  beforeAll(() => {
    fission = new Fission(baseURL)
    fissionUser = fission.login(username, password)
  })

  it('returns an instance of fission on login', () => {
    expect(fissionUser).toBeInstanceOf(FissionUser)
  })

  it('gives properly formatted urls for IPFS content', () => {
    const url = fission.url(testCID)
    expect(url).toEqual(`${baseURL}/ipfs/${testCID}`)
  })

  it('defaults baseURL when formatting url', () => {
    const contentURL = url(testCID)
    expect(contentURL).toEqual(`https://runfission.com/ipfs/${testCID}`)
  })

  describe('retrieves IPFS content', () => {
    let ipfsContent: IPFSContent
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: strContent })))
      sinon.replace(axios, 'get', fake)
      ipfsContent = await fission.content(testCID)
      await content(testCID)
    })

    it('returns IPFS content', () => {
      expect(ipfsContent).toEqual(strContent)
    })

    it('sends one GET request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${baseURL}/ipfs/${testCID}`)
    })

    it('requests an octet-stream', () => {
      expect(fake.args[0][1]).toEqual({
        headers: {
          'content-type': 'application/octet-stream'
        }
      })
    })

    it('defaults baseURL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs/${testCID}`)
    })
  })
})

describe('FissionUser', () => {
  let fission: FissionUser

  beforeEach(() => sinon.restore())

  beforeAll(() => {
    fission = new FissionUser(username, password, baseURL)
  })

  describe('returns cids associated with user', () => {
    let fake: sinon.SinonSpy
    let cidList: CID[]
    let testCIDs = [
      testCID,
      'QmYp9d8BC2HhDCUVH7JEUZAd6Hbxrc5wBRfUs8TqazJJP9',
      'QmYwXpFw1QGAWxEnQWFwLuVpdbupaBcEz2DTTRRRsCt9WR'
    ]

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: testCIDs })))
      sinon.replace(axios, 'get', fake)
      cidList = await fission.cids()
      await cids(auth)
    })

    it('returns list of CIDs', () => {
      expect(cidList).toEqual(testCIDs)
    })

    it('sends one GET request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${baseURL}/ipfs/cids`)
    })

    it('defaults baseURL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs/cids`)
    })
  })

  describe('adds strings to ipfs', () => {
    let cid: CID
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: testCID })))
      sinon.replace(axios, 'post', fake)
      cid = await fission.add(strContent)
      await add(strContent, auth)
    })

    it('returns valid CID', () => {
      expect(cid).toEqual(testCID)
    })

    it('sends one POST request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${baseURL}/ipfs`)
    })

    it('sends request with correct content to add', () => {
      expect(fake.args[0][1]).toEqual(strContent)
    })

    it('requests an octet-stream with basic auth', () => {
      expect(fake.args[0][2]).toEqual({
        headers: {
          'content-type': 'application/octet-stream'
        },
        auth: {
          username,
          password
        }
      })
    })

    it('defaults baseURL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs`)
    })
  })

  describe('adds json (with name) to ipfs', () => {
    let cid: CID
    let fake: sinon.SinonSpy
    let name = 'json object'

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: testCID })))
      sinon.replace(axios, 'post', fake)
      cid = await fission.add(jsonContent, name)
      await add(jsonContent, auth)
    })

    it('returns valid CID', () => {
      expect(cid).toEqual(testCID)
    })

    it('sends one POST request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${baseURL}/ipfs?name=json object`)
    })

    it('sends request with correct content to add', () => {
      expect(fake.args[0][1]).toEqual(jsonContent)
    })

    it('requests an octet-stream with basic auth', () => {
      expect(fake.args[0][2]).toEqual({
        headers: {
          'content-type': 'application/octet-stream'
        },
        auth: {
          username,
          password
        }
      })
    })

    it('defaults baseURL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs`)
    })
  })

  describe('pins content to ipfs', () => {
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: {} })))
      sinon.replace(axios, 'put', fake)
      await fission.pin(testCID)
      await pin(testCID, auth)
    })

    it('sends one PUT request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${baseURL}/ipfs/${testCID}`)
    })

    it('defaults baseURL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs/${testCID}`)
    })
  })

  describe('removes content from ipfs', () => {
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: {} })))
      sinon.replace(axios, 'delete', fake)
      await fission.remove(testCID)
      await remove(testCID, auth)
    })

    it('sends one DELETE request per call', () => {
      expect(fake.callCount).toEqual(2)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${baseURL}/ipfs/${testCID}`)
    })

    it('defaults baseURL to https://runfission.com', () => {
      expect(fake.args[1][0]).toEqual(`https://runfission.com/ipfs/${testCID}`)
    })
  })
})
