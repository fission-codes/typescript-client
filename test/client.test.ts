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
const TEST_CIDs = [
  TEST_CID,
  'QmYp9d8BC2HhDCUVH7JEUZAd6Hbxrc5wBRfUs8TqazJJP9',
  'QmYwXpFw1QGAWxEnQWFwLuVpdbupaBcEz2DTTRRRsCt9WR'
]

const TEST_PEERS = [
  '/ip4/3.215.160.238/tcp/4001/ipfs/QmVLEz2SxoNiFnuyLpbXsH6SvjPTrHNMU88vCQZyhgBzgw',
  '/ip4/184.68.124.102/tcp/64417/ipfs/QmQ2Jo91xQyVjhw1kmpk9eeHj6A4W1u5BYdh5xjfC5h11g'
]
const STRING_CONTENT = 'string content'
const JSON_NAME = 'json object'
const JSON_CONTENT = {
  string: 'testing',
  array: [1, -1, 1000, 0]
} as JSONObject

/* Helpers */

type RequestTest = {
  desc: string
  responseData: object
  requestFn: () => Promise<any>
  expectedReturn: any
  expectedUrl: string
  expectedArguments: Array<any>
  method: string
}

const describeRequest = (opts: RequestTest) => {
  return describe(opts.desc, () => {
    let response: any
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r(opts.responseData)))
      sinon.replace(axios, opts.method, fake)
      response = await opts.requestFn()
    })

    it('returns expected response', () => {
      expect(response).toEqual(opts.expectedReturn)
    })

    it('sends only one request', () => {
      expect(fake.callCount).toEqual(1)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(opts.expectedUrl)
    })

    it('has expected arguments', () => {
      opts.expectedArguments.map((arg, index) => {
        expect(fake.args[0][index + 1]).toEqual(arg)
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

  describeRequest({
    desc: 'Register User',
    method: 'post',
    responseData: { data: undefined },
    requestFn: () => fission.register(TEST_AUTH.username, TEST_AUTH.password, 'abs@123.org'),
    expectedReturn: undefined,
    expectedUrl: `${BASE_URL}/user`,
    expectedArguments: [{ ...TEST_AUTH, email: 'abs@123.org' }]
  })

  describeRequest({
    desc: 'Retrieve Peer List',
    method: 'get',
    responseData: { data: TEST_PEERS },
    requestFn: () => fission.peers(),
    expectedReturn: TEST_PEERS,
    expectedUrl: `${BASE_URL}/ipfs/peers`,
    expectedArguments: []
  })

  describeRequest({
    desc: 'Retrieves IPFS content',
    method: 'get',
    responseData: { data: STRING_CONTENT },
    requestFn: () => fission.content(TEST_CID),
    expectedReturn: STRING_CONTENT,
    expectedUrl: `${BASE_URL}/ipfs/${TEST_CID}`,
    expectedArguments: [
      {
        headers: {
          'content-type': 'application/octet-stream'
        }
      }
    ]
  })
})

describe('FissionUser', () => {
  let fission: FissionUser
  beforeEach(() => sinon.restore())
  beforeAll(() => {
    fission = new FissionUser(TEST_AUTH.username, TEST_AUTH.password, BASE_URL)
  })

  describeRequest({
    desc: 'Verify Users credentials',
    method: 'get',
    responseData: { data: true },
    requestFn: () => fission.verify(),
    expectedReturn: true,
    expectedUrl: `${BASE_URL}/user/verify`,
    expectedArguments: [{ auth: TEST_AUTH }]
  })

  describeRequest({
    desc: 'Get all CIDs for user',
    method: 'get',
    responseData: { data: TEST_CIDs },
    requestFn: () => fission.cids(),
    expectedReturn: TEST_CIDs,
    expectedUrl: `${BASE_URL}/ipfs/cids`,
    expectedArguments: [{ auth: TEST_AUTH }]
  })

  describeRequest({
    desc: 'Add String Content to IPFS',
    method: 'post',
    responseData: { data: TEST_CIDs },
    requestFn: () => fission.add(STRING_CONTENT),
    expectedReturn: TEST_CIDs,
    expectedUrl: `${BASE_URL}/ipfs`,
    expectedArguments: [
      STRING_CONTENT,
      {
        headers: {
          'content-type': 'application/octet-stream'
        },
        auth: TEST_AUTH
      }
    ]
  })

  describeRequest({
    desc: 'Add JSON Content to IPFS',
    method: 'post',
    responseData: { data: TEST_CID },
    requestFn: () => fission.add(JSON_CONTENT, JSON_NAME),
    expectedReturn: TEST_CID,
    expectedUrl: `${BASE_URL}/ipfs?name=${JSON_NAME}`,
    expectedArguments: [
      JSON_CONTENT,
      {
        headers: {
          'content-type': 'application/octet-stream'
        },
        auth: TEST_AUTH
      }
    ]
  })

  describeRequest({
    desc: 'Pin Content to IPFS',
    method: 'put',
    responseData: { data: {} },
    requestFn: () => fission.pin(TEST_CID),
    expectedReturn: undefined,
    expectedUrl: `${BASE_URL}/ipfs/${TEST_CID}`,
    expectedArguments: [{}, { auth: TEST_AUTH }]
  })

  describeRequest({
    desc: 'Remove Content to IPFS',
    method: 'delete',
    responseData: { data: {} },
    requestFn: () => fission.remove(TEST_CID),
    expectedReturn: undefined,
    expectedUrl: `${BASE_URL}/ipfs/${TEST_CID}`,
    expectedArguments: [{ auth: TEST_AUTH }]
  })

  describeRequest({
    desc: 'Update DNS',
    method: 'put',
    responseData: { data: { getDomainName: 'appsubdomain.runfission.com' } },
    requestFn: () => fission.updateDNS(TEST_CID),
    expectedReturn: 'appsubdomain.runfission.com',
    expectedUrl: `${BASE_URL}/dns/${TEST_CID}`,
    expectedArguments: [{ auth: TEST_AUTH }]
  })
})
