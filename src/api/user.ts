import axios from 'axios'
import { BASE_URL_DEFAULT } from '../constants'
import { Auth, Content, ResetPassword } from '../types'

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
