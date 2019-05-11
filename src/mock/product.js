import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import decode from '@/assets/js/decode'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    username: '@first',
    name: '@cname',
    channel: '@integer(10000, 99999)',
    is_firstshot: '@boolean',
    product_name: '@ctitle',
    invest_days: '@integer(10, 100)',
    financial_period: '@integer(10, 100)',
    residue_days: '@integer(10, 100)',
    buy_state: '@boolean',
    buy_copies: '@integer(1000, 99999)',
    input_principal: '@integer(1000, 99999)',
    principal_earnings: '@integer(1000, 2000)',
    investment_securities: '@integer(500, 5000)',
    investment_securities_source: '@integer(10000, 99999)',
    investment_securities_earnings: '@integer(10, 100)',
    bonus_amount: '@integer(10, 100)',
    bonus_source: '@integer(10000, 99999)',
    annualized_returns: '@float(1, 40, 2, 2)',
    gross_proceeds: '@float(10, 500, 3, 3)',
    invest_time: '@datetime',
    interest_time: '@datetime',
    clearing_time: '@datetime',
    due_time: '@datetime'
  }))
}

export default {
  getInvestmentRecordList: config => {
    const mockList = []
    const count = 10

    for (let i = 0; i < count; i++) {
      mockList.push(Mock.mock({
        id: '@increment',
        username: '@integer(10000000000, 18999999999)',
        name: '@cname',
        channel: '@integer(1260000000, 1269999999)',
        is_firstshot: '@boolean',
        product_name: '@ctitle',
        invest_days: '@integer(100, 1000)',
        financial_period: '@integer(100, 1000)',
        residue_days: '@integer(100, 1000)',
        buy_state: '@boolean',
        buy_copies: '@integer(1000, 99999)',
        input_principal: '@integer(1000, 99999)',
        principal_earnings: '@integer(1000, 2000)',
        investment_securities: '@integer(500, 5000)',
        investment_securities_source: '@integer(10000, 99999)',
        investment_securities_earnings: '@integer(10, 100)',
        bonus_amount: '@integer(10, 100)',
        bonus_source: '@integer(10000, 99999)',
        annualized_returns: '@float(1, 40, 2, 2)',
        gross_proceeds: '@float(10, 500, 3, 3)',
        invest_time: '@datetime',
        interest_time: '@datetime',
        clearing_time: '@datetime',
        due_time: '@datetime'
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
  findInvestmentRecordList: config => {
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
  }
}
