import { BASE_URL_DEFAULT } from './constants'
import { CID } from './types'

export const getContentURL = (cid: CID, baseURL = BASE_URL_DEFAULT): string => {
  return `${baseURL}/ipfs/${cid}`
}

export const trimBaseURL = (baseUrl: string): string => {
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
}
