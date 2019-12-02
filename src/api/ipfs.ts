/* TYPES */
import axios from 'axios'
import { BASE_URL_DEFAULT } from '../constants'
import { Auth, Content, CID, Peer } from '../types'

export const content = async (cid: CID, baseURL = BASE_URL_DEFAULT): Promise<Content> => {
  const headers = { 'content-type': 'application/octet-stream' }
  const { data } = await axios.get<Content>(`${baseURL}/ipfs/${cid}`, { headers })
  return data
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

export const peers = async (baseURL = BASE_URL_DEFAULT): Promise<Peer[]> => {
  const { data } = await axios.get<Peer[]>(`${baseURL}/ipfs/peers`)
  return data
}

export const updateDNS = async (
  cid: CID,
  auth: Auth,
  baseURL = BASE_URL_DEFAULT
): Promise<Content> => {
  const {
    data: { getDomainName }
  } = await axios.put(`${baseURL}/dns/${cid}`, { auth })
  return getDomainName
}
