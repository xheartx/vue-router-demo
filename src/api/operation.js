import request from '@/utils/request'

// 获取浙商平台账户余额
export function getBannerList(data) {
  return request({
    url: '/operations/banner',
    method: 'POST',
    data
  })
}
