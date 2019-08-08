import Fission, { FissionUser, CID, Content as IPFSContent } from '../src/fission'
import { Object as JSONObject } from 'json-typescript'

const baseURL = process.env.INTERPLANETARY_FISSION_URL
const username = process.env.INTERPLANETARY_FISSION_USERNAME || ''
const password = process.env.INTERPLANETARY_FISSION_PASSWORD || ''

const randomString = () => {
  return Math.random()
    .toString(36)
    .substring(7)
}

describe('Fission', () => {
  let fission: Fission
  let fissionUser: FissionUser

  beforeAll(async () => {
    fission = new Fission(baseURL)
    fissionUser = fission.login(username, password)
  })

  it('returns an instance of fission on login', () => {
    expect(fissionUser).toBeInstanceOf(FissionUser)
  })

  describe('content retrieval', () => {
    let str: string
    let cid: CID
    let ipfsContent: IPFSContent

    beforeAll(async () => {
      str = randomString()
      cid = await fissionUser.add(str)
      ipfsContent = await fission.content(cid)
    })

    it('is the same content as the original', async () => {
      expect(ipfsContent).toEqual(str)
    })

    it('gives properly formatted urls for IPFS content', () => {
      const url = fission.url(cid)
      expect(url).toEqual(`${baseURL}/ipfs/${cid}`)
    })

    it('defaults baseURL to https://hostless.dev', () => {
      const url = new Fission().url(cid)
      expect(url).toEqual(`https://hostless.dev/ipfs/${cid}`)
    })
  })
})

describe('FissionUser', () => {
  let fission: FissionUser

  beforeAll(() => {
    fission = new Fission(baseURL).login(username, password)
  })

  describe('adds strings to IPFS', () => {
    let str: string
    let cid: CID
    let cidList: CID[]

    beforeAll(async () => {
      str = randomString()
      cid = await fission.add(str)
      cidList = await fission.list()
    })

    it('uploads strings to IPFS', () => {
      expect(cidList.indexOf(cid)).toBeGreaterThan(-1)
    })

    it('pins strings to IPFS', async () => {
      await fission.pin(cid)
    })

    describe('string retrieval', () => {
      let ipfsContent: IPFSContent

      beforeAll(async () => {
        ipfsContent = await fission.content(cid)
      })

      it('is a string', () => {
        expect(typeof ipfsContent).toBe('string')
      })

      it('is the same string as the original', () => {
        expect(ipfsContent).toEqual(str)
      })
    })

    it('removes strings from IPFS', async () => {
      await fission.remove(cid)
      const cidListAfterDelete = await fission.list()
      expect(cidListAfterDelete.indexOf(cid)).toEqual(-1)
    })
  })

  describe('adds JSON objects to IPFS', () => {
    let obj: JSONObject
    let cid: CID
    let cidList: CID[]

    beforeAll(async () => {
      obj = {
        [randomString()]: randomString()
      }
      cid = await fission.add(obj)
      cidList = await fission.list()
    })

    it('uploads JSON to IPFS', () => {
      expect(cidList.indexOf(cid)).toBeGreaterThan(-1)
    })

    it('pins JSON to IPFS', async () => {
      await fission.pin(cid)
    })

    describe('JSON retrieval', () => {
      let ipfsContent: IPFSContent

      beforeAll(async () => {
        ipfsContent = await fission.content(cid)
      })

      it('is an object', () => {
        expect(typeof ipfsContent).toBe('object')
      })

      it('is the same object as the original', () => {
        expect(ipfsContent).toEqual(obj)
      })
    })

    it('removes JSON from IPFS', async () => {
      await fission.remove(cid)
      const cidListAfterDelete = await fission.list()
      expect(cidListAfterDelete.indexOf(cid)).toEqual(-1)
    })
  })

  describe('adds files to IPFS', () => {
    const fs = require('fs')
    const path = require('path')
    const filename = 'test_img.png'
    const filepath = path.join(__dirname, filename)
    let cid: CID
    let cidList: CID[]

    beforeAll(async () => {
      const stream = fs.createReadStream(filepath)
      cid = await fission.add(stream, filename)
      cidList = await fission.list()
    })

    it('uploads files to IPFS', () => {
      expect(cidList.indexOf(cid)).toBeGreaterThan(-1)
    })

    it('pins files to IPFS', async () => {
      await fission.pin(cid)
    })

    describe('file retrieval', () => {
      let ipfsContent: IPFSContent
      let fileContent: string

      beforeAll(async () => {
        ipfsContent = await fission.content(cid)
        fileContent = fs.readFileSync(filepath).toString()
      })

      it('is a string', () => {
        expect(typeof ipfsContent).toBe('string')
      })

      it('is the same object as the original', () => {
        expect(ipfsContent).toEqual(fileContent)
      })
    })

    it('removes files from IPFS', async () => {
      await fission.remove(cid)
      const cidListAfterDelete = await fission.list()
      expect(cidListAfterDelete.indexOf(cid)).toEqual(-1)
    })
  })
})
