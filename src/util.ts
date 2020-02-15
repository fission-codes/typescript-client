import { BASE_URL_DEFAULT } from './constants'
import { CID } from './types'

export const getContentURL = (cid: CID, baseURL = BASE_URL_DEFAULT): string => {
  return `${baseURL}/ipfs/${cid}`
}

// Slightly modified from https://www.regextester.com/94502
const BASE_URL_PATTERN = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/[\]@!\$&'\(\)\*\+,;=.]+[^/]$/

export const validateBaseURL = (baseURL: string): string => {
  if (baseURL.match(BASE_URL_PATTERN) === null) {
    throw Error(
      `Bad BaseURL (${baseURL}) provided. Base URL should be a full web URL with no trailing slash or query parameters.`
    )
  }
  return baseURL
}
