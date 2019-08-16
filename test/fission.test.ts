import Fission, { FissionUser, CID, Content as IPFSContent } from '../src/fission'
import { Object as JSONObject } from 'json-typescript'
import axios from 'axios'
const sinon = require('sinon')

// test variables
const baseURL = 'https://hostless.dev'
const username = 'test_username'
const password = 'test_password'

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

  it('defaults baseURL to https://hostless.dev', () => {
    const url = new Fission().url(testCID)
    expect(url).toEqual(`https://hostless.dev/ipfs/${testCID}`)
  })

  describe('retrieves IPFS content', () => {
    let ipfsContent: IPFSContent
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: strContent })))
      sinon.replace(axios, 'get', fake)
      ipfsContent = await fission.content(testCID)
    })

    it('returns IPFS content', () => {
      expect(ipfsContent).toEqual(strContent)
    })

    it('sends one GET request', () => {
      expect(fake.callCount).toEqual(1)
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
    let cids: CID[]
    let testCIDs = [
      testCID,
      'QmYp9d8BC2HhDCUVH7JEUZAd6Hbxrc5wBRfUs8TqazJJP9',
      'QmYwXpFw1QGAWxEnQWFwLuVpdbupaBcEz2DTTRRRsCt9WR'
    ]

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: testCIDs })))
      sinon.replace(axios, 'get', fake)
      cids = await fission.cids()
    })

    it('returns list of CIDs', () => {
      expect(cids).toEqual(testCIDs)
    })

    it('sends one GET request', () => {
      expect(fake.callCount).toEqual(1)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${baseURL}/ipfs/cids`)
    })
  })

  describe('adds strings to ipfs', () => {
    let cid: CID
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: testCID })))
      sinon.replace(axios, 'post', fake)
      cid = await fission.add(strContent)
    })

    it('returns valid CID', () => {
      expect(cid).toEqual(testCID)
    })

    it('sends one POST request', () => {
      expect(fake.callCount).toEqual(1)
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
  })

  describe('adds json (with name) to ipfs', () => {
    let cid: CID
    let fake: sinon.SinonSpy
    let name = 'json object'

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: testCID })))
      sinon.replace(axios, 'post', fake)
      cid = await fission.add(jsonContent, name)
    })

    it('returns valid CID', () => {
      expect(cid).toEqual(testCID)
    })

    it('sends one POST request', () => {
      expect(fake.callCount).toEqual(1)
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
  })

  describe('pins content to ipfs', () => {
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: {} })))
      sinon.replace(axios, 'put', fake)
      await fission.pin(testCID)
    })

    it('sends one PUT request', () => {
      expect(fake.callCount).toEqual(1)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${baseURL}/ipfs/${testCID}`)
    })
  })

  describe('removes content from ipfs', () => {
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r({ data: {} })))
      sinon.replace(axios, 'delete', fake)
      await fission.remove(testCID)
    })

    it('sends one DELETE request', () => {
      expect(fake.callCount).toEqual(1)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(`${baseURL}/ipfs/${testCID}`)
    })
  })
})
