import { BASE_URL_DEFAULT } from './constants'
import {
  register,
  content,
  peers,
  cids,
  add,
  remove,
  pin,
  updateDNS,
  resetPassword,
  verify
} from './api'
import { getGatewayURL } from './util'

import { Content, CID, Auth } from './types'

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

  async peers(): Promise<Content> {
    return peers(this.baseURL)
  }

  getGatewayURL(cid: CID): string {
    return getGatewayURL(cid, this.baseURL)
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

  async updateDNS(cid: CID): Promise<Content> {
    return updateDNS(cid, this.auth, this.baseURL)
  }

  async resetPassword(newPassword: string): Promise<string> {
    return resetPassword(newPassword, this.auth, this.baseURL)
  }

  async verify(): Promise<Boolean> {
    return verify(this.auth, this.baseURL)
  }
}
