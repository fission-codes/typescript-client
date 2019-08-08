import axios from 'axios'

const BASE_URL_DEFAULT = "https://hostless.dev"

export default class Fission {
  baseURL: string
  auth?: { username: string, password: string }

  constructor(baseURL?: string) {
    this.baseURL = baseURL || BASE_URL_DEFAULT
  }

  login(username: string, password: string): Fission{
    if(!username || !password){
      throw new Error("Must supply both a username and password on login")
    }
    this.auth = { username, password }
    return this
  }

  async list(): Promise<string[]> {
    if(!this.auth){
      throw new Error("Must be logged in to list available CIDs")
    }
    const { data } = await axios.get<string[]>(`${this.baseURL}/ipfs/cids`, { auth: this.auth })
    return data
  }

  async content(cid: string): Promise<string | object> {
    const headers = { 'content-type': 'application/octet-stream' }
    const { data } = await axios.get<string | object>(`${this.baseURL}/ipfs/${cid}`, { headers })
    return data
  }

  url(cid: string): string {
    return `${this.baseURL}/ipfs/${cid}`
  }

  async add(content: string | Object | File, name?: string): Promise<string> {
    if(!this.auth){
      throw new Error("Must be logged in to add content to IPFS")
    }
    const headers = { 'content-type': 'application/octet-stream' }
    const nameStr = name ? `?name=${name}` : ''
    const { data } = await axios.post<string>(`${this.baseURL}/ipfs${nameStr}`, content, { headers, auth: this.auth })
    return data
  }

  async remove(cid: string) {
    if(!this.auth){
      throw new Error("Must be logged in to remove content from IPFs")
    }
    await axios.delete(`${this.baseURL}/ipfs/${cid}`, { auth: this.auth })
  }

  async pin(cid: string) {
    if(!this.auth){
      throw new Error("Must be logged in to pin content")
    }
    await axios.put(`${this.baseURL}/ipfs/${cid}`, {}, { auth: this.auth })
  }
}