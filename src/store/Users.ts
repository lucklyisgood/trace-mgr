import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios, { AxiosError } from 'axios'

export const useUserStore = defineStore('trace-user', () => {
  const name = ref('trace123')

  function setUserInfo (info: {name: string}) {
    name.value = info.name
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function Sleep (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function loginByName (name: string, pwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      axios.post<{code: number, msg: string}>('/usr/login', {
        usr_name: name,
        usr_pwd: pwd
      }).then(resp => {
        if (resp?.data.code === 0) {
          console.log('登录succ')
        } else {
          console.log('登录fail', resp?.data.msg)
          return reject(new Error('登录失败~'))
        }
        setUserInfo({
          name: name
        })
        resolve('')
      }).catch((e: AxiosError) => {
        console.log('登录fail', e)
        return reject(new Error('登录失败~'))
      })
    })
  }
  return { name, loginByName }
})
