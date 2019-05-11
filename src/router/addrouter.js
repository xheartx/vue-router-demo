import { IconArr } from '@/router/iconarr'
const _import = require(`@/router/_import_${process.env.NODE_ENV}`)
import Layout from '@/views/layout/layout'

function sort(arr) {
  arr.sort((a, b) => {
    return (a.sort - b.sort)
  })
  return arr
}

function recursionSort(list) {
  const sortArr = sort(list)
  sortArr.forEach(item => {
    if (item.children && item.children.length > 1) {
      recursionSort(item.children)
    }
  })
  return sortArr
}

function filterComponent(item, isOne) {
  if (item.type === 1 && !isOne) {
    return Layout
  }
  try {
    return _import(filterPath(item))
  } catch (err) {
    console.log(item)
    console.log(filterPath(item))
    return _import('default/default')
  }
}

function filterPath(item, ispath) {
  let path = (item.parentPath !== '' ? (item.parentPath + '/') : '') + item.path
  if (path.indexOf('/') === 0) {
    path = path.slice(1)
  }
  if (!ispath) {
    if (item.children && item.children.length > 0) {
      path += '/index'
    }
    if (item.type === 1 && (!item.children || item.children.length === 0)) {
      path = item.modulPath + '/index'
    }
  }
  return path
}

function initRouter(roles, parentPath) {
  roles.forEach((item, index) => {
    let temp = {
      name: item.modulName,
      path: item.modulPath,
      parentPath: parentPath || '',
      meta: {
        title: item.modulName
      }
    }
    if (item.type === 1) {
      if (item.modulPath.indexOf('/') < 0) {
        temp.path = '/' + item.modulPath
        temp.meta.icon = IconArr[index].icon || 'documentation'
      }
      if (!item.children || item.children.length === 0) {
        temp = {
          name: '',
          path: temp.path,
          redirect: temp.path + '/index',
          children: [{
            path: 'index',
            component: filterComponent(item, 'isOne'),
            parentPath: item.modulPath,
            name: item.modulName,
            meta: temp.meta
          }]
        }
      }
    }
    if (item.children && item.children.length === 1) {
      item.children[0].children = []
    }
    Object.assign(item, temp)
    item.component = filterComponent(item)

    if (item.children && item.children.length > 0 && item.name !== '') {
      initRouter(item.children, filterPath(item, 'path'))
    }
  })
}

export function createRouter(roles, type) {
  let routers = []
  if (type !== 'permission') {
    initRouter(roles)
  }

  console.log(roles)
  routers = recursionSort(roles)

  if (type !== 'permission') {
    routers.push({ path: '*', redirect: '/404', hidden: true })
  }
  return routers
}
