import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import router from '@/router/index'

export default function AxiosMiddleSetup () {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config.params) {
      config.params = {}
    }
    config.params.trace_token = localStorage.getItem('trace_token')
    // trace_token
    if (config.method === 'get') {
      config.params.__t__ = Date.now() / 1000
    } else if (config.method === 'post') {
      // if (!config.headers) {
      //   config.headers = {}
      // }
      // if (!config.headers.common) {
      //   config.headers.common = {}
      // }
      // config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  })
  axios.interceptors.response.use(
    (res: AxiosResponse<{code: number, msg: string, data?: unknown}>) => {
      if (res.status === 200 && res.data.code === 2001) {
        router.push('/login')
      } else if (res.status === 401) {
        router.push('/login')
      }
      return res
    }
  )
}
