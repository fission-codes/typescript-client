import axios from 'axios'
import { BASE_URL_DEFAULT } from '../constants'
import { Auth, App } from '../types'

export const listApps = async (auth: Auth, baseURL = BASE_URL_DEFAULT) => {
  const { data } = await axios.get<Array<App>>(`${baseURL}/app`, { auth })
  return data
}

export const createApp = async (subdomain: string, auth: Auth, baseURL = BASE_URL_DEFAULT) => {
  const subdomainStr = subdomain ? `?subdomain=${subdomain}` : ''
  const { data } = await axios.post<string>(`${baseURL}/create${subdomainStr}`, {}, { auth })
  return data
}
