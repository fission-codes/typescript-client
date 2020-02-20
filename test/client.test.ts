import { Object as JSONObject } from 'json-typescript'

import Fission, { FissionUser, getContentURL, Auth } from '../src'
import { BASE_URL_DEFAULT } from '../src/constants'
import { describeRequest } from './util'

// NOTE: We must import sinon in this manner: https://github.com/sinonjs/sinon/issues/1711
const sinon = require('sinon')

/* CONSTANTS */

const TEST_BASE_URL = 'https://runfissiontest.com'

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

/* Tests */

describe('Fission', () => {
  let fission: Fission
  let fissionUser: FissionUser

  beforeEach(() => sinon.restore())

  beforeAll(() => {
    fission = new Fission(TEST_BASE_URL)
    fissionUser = fission.login(TEST_AUTH.username, TEST_AUTH.password)
  })

  it('returns an instance of fission on login', () => {
    expect(fissionUser).toBeInstanceOf(FissionUser)
  })

  it('gives properly formatted urls for IPFS cids', () => {
    const url = fission.getContentURL(TEST_CID)
    expect(url).toEqual(`${TEST_BASE_URL}/ipfs/${TEST_CID}`)
  })

  it('defaults BASE_URL_DEFAULT when formatting url', () => {
    const contentURL = getContentURL(TEST_CID)
    expect(contentURL).toEqual(`${BASE_URL_DEFAULT}/ipfs/${TEST_CID}`)
  })

  it('defaults BASE_URL_DEFAULT when not given a url', () => {
    const fissionDefault = new Fission()
    expect(fissionDefault.baseURL).toEqual(BASE_URL_DEFAULT)
  })

  it("removes trailing slashes on provided BASE_URL", () => {
    const trailingFission = new Fission("https://example.com/")
    expect(trailingFission.baseURL).toEqual("https://example.com")
  })

  describeRequest({
    desc: 'Register User',
    method: 'post',
    responseData: { data: undefined },
    requestFn: () => fission.register(TEST_AUTH.username, TEST_AUTH.password, 'abs@123.org'),
    expectedReturn: undefined,
    expectedUrl: `${TEST_BASE_URL}/user`,
    expectedArguments: [{ ...TEST_AUTH, email: 'abs@123.org' }]
  })

  describeRequest({
    desc: 'Retrieve Peer List',
    method: 'get',
    responseData: { data: TEST_PEERS },
    requestFn: () => fission.peers(),
    expectedReturn: TEST_PEERS,
    expectedUrl: `${TEST_BASE_URL}/ipfs/peers`,
    expectedArguments: []
  })

  describeRequest({
    desc: 'Retrieves IPFS content',
    method: 'get',
    responseData: { data: STRING_CONTENT },
    requestFn: () => fission.content(TEST_CID),
    expectedReturn: STRING_CONTENT,
    expectedUrl: `${TEST_BASE_URL}/ipfs/${TEST_CID}`,
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
    fission = new FissionUser(TEST_AUTH.username, TEST_AUTH.password, TEST_BASE_URL)
  })

  it('defaults BASE_URL_DEFAULT when not given a url', () => {
    const fissionDefault = new FissionUser(TEST_AUTH.username, TEST_AUTH.password)
    expect(fissionDefault.baseURL).toEqual(BASE_URL_DEFAULT)
  })

  describeRequest({
    desc: 'Verify Users credentials',
    method: 'get',
    responseData: { data: true },
    requestFn: () => fission.verify(),
    expectedReturn: true,
    expectedUrl: `${TEST_BASE_URL}/user/verify`,
    expectedArguments: [{ auth: TEST_AUTH }]
  })

  describeRequest({
    desc: 'Reset Passowrd',
    method: 'put',
    responseData: { data: { password: 'newPassword' } },
    requestFn: () => fission.resetPassword('newPassword'),
    expectedReturn: { password: 'newPassword' },
    expectedUrl: `${TEST_BASE_URL}/user/reset_password`,
    expectedArguments: [{ password: 'newPassword' }, { auth: TEST_AUTH }]
  })

  describeRequest({
    desc: 'Get all CIDs for user',
    method: 'get',
    responseData: { data: TEST_CIDs },
    requestFn: () => fission.cids(),
    expectedReturn: TEST_CIDs,
    expectedUrl: `${TEST_BASE_URL}/ipfs/cids`,
    expectedArguments: [{ auth: TEST_AUTH }]
  })

  describeRequest({
    desc: 'Add String Content to IPFS',
    method: 'post',
    responseData: { data: TEST_CIDs },
    requestFn: () => fission.add(STRING_CONTENT),
    expectedReturn: TEST_CIDs,
    expectedUrl: `${TEST_BASE_URL}/ipfs`,
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
    expectedUrl: `${TEST_BASE_URL}/ipfs?name=${JSON_NAME}`,
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
    expectedUrl: `${TEST_BASE_URL}/ipfs/${TEST_CID}`,
    expectedArguments: [{}, { auth: TEST_AUTH }]
  })

  describeRequest({
    desc: 'Remove Content to IPFS',
    method: 'delete',
    responseData: { data: {} },
    requestFn: () => fission.remove(TEST_CID),
    expectedReturn: undefined,
    expectedUrl: `${TEST_BASE_URL}/ipfs/${TEST_CID}`,
    expectedArguments: [{ auth: TEST_AUTH }]
  })

  describeRequest({
    desc: 'Update DNS',
    method: 'put',
    responseData: { data: 'appsubdomain.runfission.com' },
    requestFn: () => fission.updateDNS(TEST_CID),
    expectedReturn: 'appsubdomain.runfission.com',
    expectedUrl: `${TEST_BASE_URL}/dns/${TEST_CID}`,
    expectedArguments: [{}, { auth: TEST_AUTH }]
  })
})
