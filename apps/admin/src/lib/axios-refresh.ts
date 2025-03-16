import { api } from '@repo/api'
import { getRefreshAccessToken } from '@repo/api/paths/auth/refresh-access-token'
import { storageToken } from '@repo/utils/storage'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

const refreshAuthLogic = (failedRequest: any) =>
  getRefreshAccessToken().then((res) => {
    const token = res.accessToken
    storageToken.set(token)
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token
    return
  })

createAuthRefreshInterceptor(api, refreshAuthLogic)

api.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${storageToken.get()}`
  return request
})
