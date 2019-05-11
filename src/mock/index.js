import Mock from 'mockjs'
import loginAPI from './login'
// import authorityAPI from './authority'
// import remoteSearchAPI from './remoteSearch'
// import transactionAPI from './transaction'
// import product from './product'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
// Mock.mock(/\/adminLogin\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/adminLogin\/outLogin/, 'post', loginAPI.logout)
Mock.mock(/\/userAdmin\/userToRights/, 'post', loginAPI.getUserInfo)

// 搜索相关
// Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
// Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 权限相关
// Mock.mock(/\/UserAdmin\/findUserAdminList/, 'post', authorityAPI.findUserAdminList)
// Mock.mock(/\/modul\/getModulInfo/, 'post', authorityAPI.getModulInfo)
Mock.mock(/\/rolesModul\/findRolseModuls/, 'post', loginAPI.getUserInfo)

// 产品管理
// Mock.mock(/\/product\/getInvestmentRecordList/, 'post', product.getInvestmentRecordList)
// Mock.mock(/\/product\/findInvestmentRecordList/, 'post', product.findInvestmentRecordList)
export default Mock
