import request from '@/utils/request'

// 获取用户选项
export function getUserOption(data) {
  return request({
    url: `/userRoles/findRoles`,
    method: 'post',
    data
  })
}

// 获取所有菜单列表
export function getModulInfoAll(data) {
  return request({
    url: '/modul/getModulInfoAll',
    method: 'post',
    data
  })
}

// 获取角色权限
export function getPermissionList(data) {
  return request({
    url: '/rolesModul/findRolseModuls',
    method: 'post',
    data
  })
}
