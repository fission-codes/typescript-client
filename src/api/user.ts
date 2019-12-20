import axios from 'axios'
import { BASE_URL_DEFAULT } from '../constants'
import { Auth, Content, Register } from '../types'

export const register = async (content: Register, baseURL = BASE_URL_DEFAULT): Promise<Content> => {
  const { data } = await axios.post<Content>(`${baseURL}/user`, content)
  return data
}

export const resetPassword = async (
  newPassword: string,
  auth: Auth,
  baseURL = BASE_URL_DEFAULT
): Promise<string> => {
  const body = { password: newPassword }
  const { data } = await axios.put<string>(`${baseURL}/user/reset_password`, body, {
    auth
  })
  return data
}

export const verify = async (auth: Auth, baseURL = BASE_URL_DEFAULT): Promise<Boolean> => {
  const { data } = await axios.get<Boolean>(`${baseURL}/user/verify`, { auth })
  return data
}
