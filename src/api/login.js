import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/adminLogin/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/adminLogin/outLogin',
    method: 'post'
  })
}

export function getUserInfo(data) {
  return request({
    url: '/userAdmin/userToRights',
    method: 'post',
    data
  })
}

export function updatepass(data) {
  return request({
    url: '/user/updatepassword',
    method: 'post',
    data
  })
}
