import axios, { AxiosRequestConfig } from 'axios'
import { Message, MessageBox, Loading } from 'element-ui'
import { UserModule } from '../store/modules/user'
import router from '@/router'

interface ApiRequestOptions extends AxiosRequestConfig {
  reqName?: string
  // headers?: { [key: string]: any };
  // data?: any;
}

const defaultAxiosOptions: AxiosRequestConfig = {
  baseURL: '/v1',
  timeout: 1000 * 20,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  maxContentLength: 1024 * 1024 * 20,
  method: 'GET'
}

const apiAxios = axios.create(defaultAxiosOptions)
apiAxios.interceptors.request.use(
  config => {
    if (UserModule.getToken) {
      config.headers.Authorization = 'Bearer ' + UserModule.getToken
    }
    config.headers['X-Client'] = 'Web'
    return config
  },
  error => {
    // Handle request error here
    // Promise.reject(error);
  }
)

// respone 拦截器
apiAxios.interceptors.response.use(
  response => {
    const { data } = response
    const msg = `code=${data.code}, ${data.message}`
    if (data.code === 401) {
      UserModule.LogOut()
      // alert('请重新登录');
      router.push({ name: 'login' })
    }
    if (data.code !== 0) {
      Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
      throw new Error(msg)
    }

    return response
  },
  error => {
    if (error.response) {
      console.log('API ERROR error.response:', error.response)
      switch (error.response.status) {
        case 400:
          Message({
            message: error.response.code + ':' + error.response.data.message,
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 401:
          UserModule.LogOut()
          alert('请重新登录')
          router.push({ name: 'login' })
          break
        case 403:
          MessageBox.alert(`code=403: ${error.response.data.message}`, '警告')
          break
        case 500:
          MessageBox.alert(`服务器错误: ${error.response.data.message}`, '警告')
          break
        default:
          MessageBox.alert(
            `错误:code=${error.response.status},response=${
              error.response.data.message
            }`,
            '错误'
          )
      }
    } else {
      console.log('API ERROR:', error)
      MessageBox.alert(`错误:response=${error}`, '错误')
    }
    return Promise.reject(error)
  }
)

async function apiRequest<R>(reqOptions: ApiRequestOptions): Promise<R> {
  const options = Object.assign(defaultAxiosOptions, reqOptions)

  const promise = new Promise(async (resolve, reject) => {
    try {
      const res = await apiAxios(reqOptions)
      resolve(res.data as R)
    } catch (error) {
      reject(error)
    }
  })

  return promise as Promise<R>
  // return apiAxios( reqOptions ) as any as Promise<R>;
}

async function apiSendAsync<R>(opts: AxiosRequestConfig): Promise<R> {
  const options = Object.assign(defaultAxiosOptions, opts)

  const promise = new Promise(async (resolve, reject) => {
    try {
      const res = await apiAxios(options)
      resolve(res.data as R)
    } catch (error) {
      reject(error)
    }
  })
  return promise as Promise<R>
}
export default apiRequest
export { apiRequest, ApiRequestOptions, apiSendAsync }
