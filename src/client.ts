import axios from 'axios'
import { Value as JSONValue } from 'json-typescript'

const BASE_URL_DEFAULT = 'https://runfission.com'

/* TYPES */

export type Content = JSONValue
export type Upload = JSONValue | File
export type CID = string
export type Peer = string
export type ResetPassword = {
  password: string
}
export type Auth = {
  username: string
  password: string
  email?: string
}

/* IPFS */

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

/* New User */

export const register = async (content: Auth, baseURL = BASE_URL_DEFAULT): Promise<Content> => {
  const { data } = await axios.post<Content>(`${baseURL}/user`, content)
  return data
}

export const resetPassword = async (
  content: ResetPassword,
  auth: Auth,
  baseURL = BASE_URL_DEFAULT
): Promise<ResetPassword> => {
  const { data } = await axios.put<ResetPassword>(`${baseURL}/user/reset_password`, content, {
    auth
  })
  return data
}

export const verify = async (auth: Auth, baseURL = BASE_URL_DEFAULT): Promise<Boolean> => {
  const { data } = await axios.get<Boolean>(`${baseURL}/user/verify`, { auth })
  return data
}

/* New IPFS */

export const peers = async (baseURL = BASE_URL_DEFAULT): Promise<Peer[]> => {
  const { data } = await axios.get<Peer[]>(`${baseURL}/ipfs/peers`)
  return data
}

export const updateDNS = async (cid: CID, auth: Auth, baseURL = BASE_URL_DEFAULT) => {
  await axios.put(`${baseURL}/dns/${cid}`, { auth })
}

export default class Fission {
  baseURL: string

  constructor(baseURL?: string) {
    this.baseURL = baseURL || BASE_URL_DEFAULT
  }

  login(username: string, password: string): FissionUser {
    return new FissionUser(username, password, this.baseURL)
  }

  register(username: string, password: string, email?: string): Promise<Content> {
    return register({ username, password, email }, this.baseURL)
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
