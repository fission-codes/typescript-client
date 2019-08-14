import axios from 'axios'
import { Value as JSONValue } from 'json-typescript'

const BASE_URL_DEFAULT = 'https://hostless.dev'

export type Content = JSONValue
export type Upload = JSONValue | File
export type CID = string

export default class Fission {
  baseURL: string

  constructor(baseURL?: string) {
    this.baseURL = baseURL || BASE_URL_DEFAULT
  }

  login(username: string, password: string): FissionUser {
    return new FissionUser(username, password, this.baseURL)
  }

  async content(cid: CID): Promise<Content> {
    const headers = { 'content-type': 'application/octet-stream' }
    const { data } = await axios.get<Content>(`${this.baseURL}/ipfs/${cid}`, { headers })
    return data
  }

  url(cid: CID): string {
    return `${this.baseURL}/ipfs/${cid}`
  }
}

export class FissionUser extends Fission {
  auth: {
    username: string
    password: string
  }

  constructor(username: string, password: string, baseURL?: string) {
    super(baseURL)
    this.auth = { username, password }
    return this
  }

  async cids(): Promise<CID[]> {
    const { data } = await axios.get<CID[]>(`${this.baseURL}/ipfs/cids`, { auth: this.auth })
    return data
  }

  async add(content: Content, name?: string): Promise<CID> {
    const headers = { 'content-type': 'application/octet-stream' }
    const nameStr = name ? `?name=${name}` : ''
    const { data } = await axios.post<CID>(`${this.baseURL}/ipfs${nameStr}`, content, {
      headers,
      auth: this.auth
    })
    return data
  }

  async remove(cid: CID) {
    await axios.delete(`${this.baseURL}/ipfs/${cid}`, { auth: this.auth })
  }

  async pin(cid: CID) {
    await axios.put(`${this.baseURL}/ipfs/${cid}`, {}, { auth: this.auth })
  }
}
