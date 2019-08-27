import axios from 'axios'
import { Value as JSONValue } from 'json-typescript'

const BASE_URL_DEFAULT = 'https://hostless.dev'

export type Content = JSONValue
export type Upload = JSONValue | File
export type CID = string
export type Auth = {
  username: string
  password: string
}

export const content = async (baseURL: string, cid: CID): Promise<Content> => {
  const headers = { 'content-type': 'application/octet-stream' }
  const { data } = await axios.get<Content>(`${baseURL}/ipfs/${cid}`, { headers })
  return data
}

export const url = (baseURL: string, cid: CID): string => {
  return `${baseURL}/ipfs/${cid}`
}

export const cids = async (baseURL: string, auth: Auth): Promise<CID[]> => {
  const { data } = await axios.get<CID[]>(`${baseURL}/ipfs/cids`, { auth })
  return data
}

export const add = async (
  baseURL: string,
  auth: Auth,
  content: Content,
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

export const remove = async (baseURL: string, auth: Auth, cid: CID) => {
  await axios.delete(`${baseURL}/ipfs/${cid}`, { auth })
}

export const pin = async (baseURL: string, auth: Auth, cid: CID) => {
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
    return content(this.baseURL, cid)
  }

  url(cid: CID): string {
    return url(this.baseURL, cid)
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
    return cids(this.baseURL, this.auth)
  }

  async add(content: Content, name?: string): Promise<CID> {
    return add(this.baseURL, this.auth, content, name)
  }

  async remove(cid: CID) {
    return remove(this.baseURL, this.auth, cid)
  }

  async pin(cid: CID) {
    return pin(this.baseURL, this.auth, cid)
  }
}
