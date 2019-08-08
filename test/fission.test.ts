import Fission from "../src/fission"

const baseURL = process.env.INTERPLANETARY_FISSION_URL
const username = process.env.INTERPLANETARY_FISSION_USERNAME || ''
const password = process.env.INTERPLANETARY_FISSION_PASSWORD || ''

const randomString = () => {
  return Math.random().toString(36).substring(7)
}

describe("Fission", () => {
  let fission: Fission

  beforeEach(() => {
    fission = (new Fission(baseURL)).login(username, password)
  })

  it("should return an instance of fission on login", () => {
    expect(fission).toBeInstanceOf(Fission)
  })

  it("should be able to add and retrieve strings from ipfs", async () => {
    const str = randomString()
    const cid = await fission.add(str)
    const cidList = await fission.list()
    expect(cidList.indexOf(cid)).toBeGreaterThan(-1)
    const ipfsContent = await fission.content(cid)
    expect(typeof ipfsContent).toBe('string')
    expect(ipfsContent).toEqual(str)
  })

  it("should be able to add and retrieve JSON objects from ipfs", async () => {
    const obj = {
      [randomString()]: randomString()
    }
    const cid = await fission.add(obj)
    const cidList = await fission.list()
    expect(cidList.indexOf(cid)).toBeGreaterThan(-1)
    const ipfsContent = await fission.content(cid)
    expect(typeof ipfsContent).toBe('object')
    expect(ipfsContent).toEqual(obj)
  })

  it("should be able to add and retrieve files from ipfs", async () => {
    const fs = require('fs')
    const path = require('path')
    const testFile = path.join(__dirname,'test_img.png')
    const stream = fs.createReadStream(testFile)
    const cid = await fission.add(stream)
    const cidList = await fission.list()
    expect (cidList.indexOf(cid)).toBeGreaterThan(-1)
    const ipfsContent = await fission.content(cid)
    const fileContent = fs.readFileSync(testFile).toString()
    expect(typeof ipfsContent).toBe('string')
    expect(ipfsContent).toEqual(fileContent)
  })

  it("should be able to retrieve content when unauthorized", async () => {
    const str = randomString()
    const cid = await fission.add(str)
    const fissionUnauth = new Fission(baseURL)
    const ipfsContent = await fissionUnauth.content(cid)
    expect(typeof ipfsContent).toBe('string')
    expect(ipfsContent).toEqual(str)
  })

  it("should be able to pin content", async () => {
    const str = randomString()
    const cid = await fission.add(str)
    await fission.pin(cid)
  })

  it("should be able to remove content from ipfs", async () => {
    const str = randomString()
    const cid = await fission.add(str)
    const cidList = await fission.list()
    expect(cidList.indexOf(cid)).toBeGreaterThan(-1)
    await fission.remove(cid)
    const cidListAfterDelete = await fission.list()
    expect(cidListAfterDelete.indexOf(cid)).toEqual(-1)
  })

  it("should give properly formatted urls for ipfs content", async () => {
    const str = randomString()
    const cid = await fission.add(str)
    const url = fission.url(cid)
    expect(url).toEqual(`${baseURL}/ipfs/${cid}`)
  })
})