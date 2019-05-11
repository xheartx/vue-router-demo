import request from '@/utils/request'

// 获取用户资金流水列表数据
export function fetchMoneyRecord(data) {
  return request({
    url: '/MoneyRecord',
    method: 'POST',
    data
  })
}

// 新增用户资金流水记录
export function addMoneyRecord(data) {
  return request({
    url: '/addMoneyRecord',
    method: 'POST',
    data
  })
}

// 删除用户资金流水记录
export function deleteMoneyRecord(data) {
  return request({
    url: '/deleteMoneyRecord',
    method: 'POST',
    data
  })
}

// 新增用户资金流水记录
export function editMoneyRecord(data) {
  return request({
    url: '/editMoneyRecord',
    method: 'POST',
    data
  })
}

// 获取充值记录
export function fetchChargeRecord(data) {
  return request({
    url: '/getChargeRecordList',
    method: 'POST',
    data
  })
}

// 获取提现记录
export function fetchWithdrawRecord(data) {
  return request({
    url: '/getWithdrawRecordList',
    method: 'POST',
    data
  })
}

// 审核资金
export function auditMoney(data) {
  return request({
    url: '/auditMoney',
    method: 'POST',
    data
  })
}

// 获取投资券记录
export function fetchVoucherRecord(data) {
  return request({
    url: '/getVoucherList',
    method: 'POST',
    data
  })
}

// 获取浙商资金对账
export function ZheshangFundReconciliation(data) {
  return request({
    url: '/funds/ZheshangFundReconciliation',
    method: 'POST',
    data
  })
}

// 获取浙商平台账户余额
export function zheshangAccountBalance(data) {
  return request({
    url: '/funds/zheshangAccountBalance',
    method: 'POST',
    data
  })
}

// 浙商平台账户余额-充值
export function zheshangChargeMoney(data) {
  return request({
    url: '/chargeMoney',
    method: 'POST',
    data
  })
}

// 浙商平台账户余额-提现
export function zheshangWithdrawMoney(data) {
  return request({
    url: '/withdrawMoney',
    method: 'POST',
    data
  })
}

// 资金协议管理
export function fundProtocol(data) {
  return request({
    url: '/FundAgreementManagement',
    method: 'POST',
    data
  })
}

// 资金协议管理-新增
export function createProtocol(data) {
  return request({
    url: '/createProtocol',
    method: 'POST',
    data
  })
}

// 资金协议管理-修改
export function editProtocol(data) {
  return request({
    url: '/editProtocol',
    method: 'POST',
    data
  })
}

// 资金协议管理-删除
export function deleteProtocol(data) {
  return request({
    url: '/deleteProtocol',
    method: 'POST',
    data
  })
}
