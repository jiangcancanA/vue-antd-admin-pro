import request from '@/utils/request'

const api = {
  login: '/api/auth/login',
  getUserInfo: '/api/user/info',
  logout: '/api/auth/logout'
}

export function loginApi(params) {
  return request({
    url: api.login,
    method: 'POST',
    data: params
  })
}

export function getUserInfoApi(params) {
  return request({
    url: api.getUserInfo,
    method: 'GET',
    params: params
  })
}

export function logoutApi() {
  return request({
    url: api.logout,
    method: 'POST'
  })
}