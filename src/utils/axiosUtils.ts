import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { BASE_URL } from './constants'

const client = axios.create({
  baseURL: BASE_URL,
})

export const request = async (options: AxiosRequestConfig) => {
  client.defaults.headers.common.Authorization = 'Bearer Token'
  const onSuccess = (res: AxiosResponse) => res
  const onError = (err: AxiosError) => {
    return err
  }
  return client(options).then(onSuccess).catch(onError)
}
