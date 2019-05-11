import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import decode from '@/assets/js/decode'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    username: '@first',
    department: '@first',
    password: '@integer(100000, 999999)',
    note: '@csentence',
    'userType|1': ['-1', '0', '1'],
    'userStatus|1': ['0', '1'],
    'role|1': ['产品经理', '设计', '前端'],
    insertTime: '@datetime',
    pageviews: '@integer(300, 5000)'
  }))
}

export default {
  getModulInfo: () => {
    const mockList = [{
      'id': 8,
      'modulName': '首页',
      'modulPath': 'dashboard',
      'sort': 1,
      'type': 1,
      'note': '',
      'parent': '',
      'parentId': ''
    }, {
      'id': 9,
      'modulName': '个人中心',
      'modulPath': 'personal',
      'sort': 1,
      'type': 1,
      'note': '',
      'parent': '',
      'parentId': ''
    }, {
      'id': 91,
      'modulName': '账户信息',
      'modulPath': 'account-information',
      'sort': 1,
      'type': 2,
      'note': '',
      'parent': '个人中心',
      'parentId': 9
    }, {
      'id': 10,
      'modulName': '修改密码',
      'modulPath': 'changepassword',
      'sort': 1,
      'type': 2,
      'note': '',
      'parent': '个人中心',
      'parentId': 9
    }, {
      'id': 11,
      'modulName': '权限管理',
      'modulPath': 'authority',
      'sort': 1,
      'type': 1,
      'note': '',
      'parent': '',
      'parentId': ''
    }, {
      'id': 12,
      'modulName': '用户管理',
      'modulPath': 'usermanage',
      'sort': 1,
      'type': 2,
      'note': '',
      'parent': '权限管理',
      'parentId': 11
    }, {
      'id': 13,
      'modulName': '角色管理',
      'modulPath': 'rolemanage',
      'sort': 1,
      'type': 2,
      'note': '',
      'parent': '权限管理',
      'parentId': 11
    }, {
      'id': 14,
      'modulName': '菜单管理',
      'modulPath': 'menumanage',
      'sort': 1,
      'type': 2,
      'note': '',
      'parent': '权限管理',
      'parentId': 11
    }]
    const data = {
      list: mockList,
      total: mockList.length
    }
    return {
      code: 1,
      data,
      message: 'success'
    }
  },
  findUserAdminList: config => {
    const { userType, page = 1, limit = 10, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (userType && item.userType !== userType) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    const data = {
      modulPage: {
        rowCount: mockList.length,
        rows: pageList
      }
    }
    return {
      code: 0,
      data: decode.encryptData(JSON.stringify(data))
    }
  },
  getRoleList: () => {
    const mockList = []
    const count = 10

    for (let i = 0; i < count; i++) {
      mockList.push(Mock.mock({
        id: '@increment',
        rolename: '@first',
        insertTime: '@datetime',
        creator: '@first',
        note: '@csentence',
        'status|1': ['0', '1']
      }))
    }
    const data = {
      modulPage: {
        rowCount: mockList.length,
        rows: mockList
      }
    }
    return {
      code: 0,
      data: decode.encryptData(JSON.stringify(data))
    }
  },
  getArticle: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
