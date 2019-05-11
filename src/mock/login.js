export default {
  loginByUsername: config => {
    return {
      mock: true,
      code: 0,
      data: { 'token': 'A6F1977702820E9294952AC351ACDB01EDF912A6C43368A8587C8A74CA4BF38E898932557AE3549A311D8E086ED631CCB263FEEA9CFC3522EC63CD28C8113C7E42599D8BA4A8EA49' }
    }
  },
  getUserInfo: config => {
    return {
      mock: true,
      code: 1,
      message: '成功',
      data: {
        permission: [{
          'id': 8,
          'modulName': '首页',
          'modulPath': 'dashboard',
          'sort': 1,
          'type': 1
        }, {
          'id': 9,
          'modulName': '个人中心',
          'modulPath': 'personal',
          'sort': 1,
          'type': 1,
          'children': [{
            'id': 91,
            'modulName': '账户信息',
            'modulPath': 'account-information',
            'sort': 1,
            'type': 2
          }, {
            'id': 10,
            'modulName': '修改密码',
            'modulPath': 'changepassword',
            'sort': 1,
            'type': 2
          }]
        }, {
          'id': 11,
          'modulName': '权限管理',
          'modulPath': 'authority',
          'sort': 1,
          'type': 1,
          'children': [{
            'id': 12,
            'modulName': '用户管理',
            'modulPath': 'usermanage',
            'sort': 1,
            'type': 2
          }, {
            'id': 13,
            'modulName': '角色管理',
            'modulPath': 'rolemanage',
            'sort': 1,
            'type': 2
          }, {
            'id': 14,
            'modulName': '菜单管理',
            'modulPath': 'menumanage',
            'sort': 1,
            'type': 2
          }]
        }],
        usreInfo: {
          'createrId': 1000,
          'deptId': 8,
          'id': 11000,
          'insertTime': '2015-05-26 19:08:30',
          'insertTimeStr': '2015-05-26 19:08:30',
          'isOnline': '',
          'lastTime': null,
          'lastTimeStr': '',
          'note': '超级管理员',
          'password': '',
          'roles': [],
          'rolesId': 5,
          'updateTime': null,
          'updateTimeStr': '',
          'userStatus': '0',
          'userType': -1,
          'username': '15112304365'
        }
      }
    }
  },
  logout: () => {
    return {
      mock: true,
      code: 0,
      data: ''
    }
  }
}
