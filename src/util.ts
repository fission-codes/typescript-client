import { BASE_URL_DEFAULT } from './constants'
import { CID } from './types'

export const getContentURL = (cid: CID, baseURL = BASE_URL_DEFAULT): string => {
  return `${baseURL}/ipfs/${cid}`
}
