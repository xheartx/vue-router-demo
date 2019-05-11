import request from '@/utils/request'

// 获取数据
export function getData(url, data) {
  return request({
    url,
    data,
    method: 'POST'
  })
}

// 查询数据
export function findData(url, data) {
  return request({
    url,
    data,
    method: 'post'
  })
}

// 修改数据
export function addData(url, data) {
  return request({
    url,
    data,
    method: 'post'
  })
}

// 修改数据
export function updateData(url, data) {
  return request({
    url,
    data,
    method: 'post'
  })
}

// 删除数据
export function delData(url, data) {
  return request({
    url,
    data,
    method: 'post'
  })
}
