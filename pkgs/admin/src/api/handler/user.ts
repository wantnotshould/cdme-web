import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { UserLoginReq } from '../req/user'
import type { CommonResp } from '../resp/resp'
import type { UserProfileResp } from '../resp/user'

export const userLogin = (param: UserLoginReq) => {
  return request.post('/api/v1/auth/login', param)
}

let refreshTokenPromise: Promise<AxiosResponse<CommonResp>>
let isRefreshing = false
export const userRefreshToken = () => {
  if (isRefreshing) {
    return refreshTokenPromise
  }
  isRefreshing = true
  refreshTokenPromise = request.get<CommonResp>('/api/v1/auth/refresh-token').finally(() => {
    isRefreshing = false
  })
  return refreshTokenPromise
}

export const userProfile = () => {
  return request.get<CommonResp<UserProfileResp>>('/api/v1/admin/users/profile')
}

export const userLogout = () => {
  return request.get<CommonResp>('/api/v1/admin/users/logout')
}
