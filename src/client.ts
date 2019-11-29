import axios from 'axios'
import { Value as JSONValue } from 'json-typescript'

const BASE_URL_DEFAULT = 'https://runfission.com'

export type Content = JSONValue
export type Upload = JSONValue | File
export type CID = string
export type Auth = {
  username: string
  password: string
}

export const content = async (cid: CID, baseURL = BASE_URL_DEFAULT): Promise<Content> => {
  const headers = { 'content-type': 'application/octet-stream' }
  const { data } = await axios.get<Content>(`${baseURL}/ipfs/${cid}`, { headers })
  return data
}

export const url = (cid: CID, baseURL = BASE_URL_DEFAULT): string => {
  return `${baseURL}/ipfs/${cid}`
}

export const cids = async (auth: Auth, baseURL = BASE_URL_DEFAULT): Promise<CID[]> => {
  const { data } = await axios.get<CID[]>(`${baseURL}/ipfs/cids`, { auth })
  return data
}

export const add = async (
  content: Content,
  auth: Auth,
  baseURL = BASE_URL_DEFAULT,
  name?: string
): Promise<CID> => {
  const headers = { 'content-type': 'application/octet-stream' }
  const nameStr = name ? `?name=${name}` : ''
  const { data } = await axios.post<CID>(`${baseURL}/ipfs${nameStr}`, content, {
    headers,
    auth
  })
  return data
}

export const remove = async (cid: CID, auth: Auth, baseURL = BASE_URL_DEFAULT) => {
  await axios.delete(`${baseURL}/ipfs/${cid}`, { auth })
}

export const pin = async (cid: CID, auth: Auth, baseURL = BASE_URL_DEFAULT) => {
  await axios.put(`${baseURL}/ipfs/${cid}`, {}, { auth })
}

export default class Fission {
  baseURL: string

  constructor(baseURL?: string) {
    this.baseURL = baseURL || BASE_URL_DEFAULT
  }

  login(username: string, password: string): FissionUser {
    return new FissionUser(username, password, this.baseURL)
  }

  async content(cid: CID): Promise<Content> {
    return content(cid, this.baseURL)
  }

  url(cid: CID): string {
    return url(cid, this.baseURL)
  }
}

export class FissionUser extends Fission {
  auth: Auth

  constructor(username: string, password: string, baseURL?: string) {
    super(baseURL)
    this.auth = { username, password }
    return this
  }

  async cids(): Promise<CID[]> {
    return cids(this.auth, this.baseURL)
  }

  async add(content: Content, name?: string): Promise<CID> {
    return add(content, this.auth, this.baseURL, name)
  }

  async remove(cid: CID) {
    return remove(cid, this.auth, this.baseURL)
  }

  async pin(cid: CID) {
    return pin(cid, this.auth, this.baseURL)
  }
}
