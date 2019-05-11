<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.userName">
        </el-input>
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="产品名称" v-model="listQuery.productName">
        </el-input>
        <el-date-picker
          v-model="listQuery.data"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="listQuery.productStatus" placeholder="请选择" size="medium" style="width: 90px"> 
          <el-option v-for="item in FilterOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDownload" type="primary" :loading="downloadLoading" icon="el-icon-download">导出</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="40">
      </el-table-column>
      <el-table-column width="120" align="center" label="用户名">
        <template slot-scope="scope">
          <span class="clickable" @click="handleFilter('userName', scope.row.userName)">{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.real_name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="渠道">
        <template slot-scope="scope">
          <span>{{scope.row.regist_channel}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="是否首投">
        <template slot-scope="scope">
          <span>{{scope.row.isFristBuy}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品名称" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投资天数"  width="50">
        <template slot-scope="scope">
          <span>{{scope.row.lcqx}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="理财期限"  width="50">
        <template slot-scope="scope">
          <span>{{scope.row.lcqx}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="剩余天数"  width="50">
        <template slot-scope="scope">
          <span>{{scope.row.daysRemaining >= 0 ? scope.row.daysRemaining : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买状态"  width="70">
        <template slot-scope="scope">
          <span>{{filterState(scope.row.investor_status)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买份数"  width="70">
        <template slot-scope="scope">
          <span>{{scope.row.copies}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投入本金"  width="70">
        <template slot-scope="scope">
          <span>{{scope.row.in_money}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本金收益"  width="80">
        <template slot-scope="scope">
          <span>{{Math.round(scope.row.expect_earnings*100)/100}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投资券"  width="70">
        <template slot-scope="scope">
          <span>{{scope.row.coupon}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投资券来源"  width="70">
        <template slot-scope="scope">
          <span>{{scope.row.couponSource}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投资券收益"  width="70">
        <template slot-scope="scope">
          <span>{{scope.row.investment_securities_earnings || 0}}%</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="红包金额"  width="70">
        <template slot-scope="scope">
          <span>{{scope.row.hongbao}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="红包来源"  width="70">
        <template slot-scope="scope">
          <span>{{scope.row.hongbaoSource}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最终年化收益"  width="70">
        <template slot-scope="scope">
          <span>{{scope.row.annual_earnings || 0}}%</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="到期总收益"  width="70">
        <template slot-scope="scope">
          <span>{{scope.row.gross_proceeds || 0}}%</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投资时间" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.pay_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="起息时间" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.start_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算时间" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.clear_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目到期时间" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.finish_time}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align: right;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tablist from '@/mixins/tablist'

export default {
  name: 'investment-record',
  mixins: [tablist],
  data() {
    return {
      listQuery: {
        pageNum: 1,
        limit: 10,
        productStatus: -1,
        userName: '',
        productName: '',
        data: [],
        insertTime: '',
        finishTime: ''
      },
      FilterOptions: [{ key: -1, value: '全部' }, { key: 0, value: '待付款' }, { key: 1, value: '已付款' }, { key: 2, value: '待结算' }, { key: 3, value: '已结算' }, { key: 5, value: '失败' }],
      getDataUrl: '/product/getInvestmentRecords'
    }
  },
  methods: {
    filterState(state) {
      const states = {
        0: '待付款',
        1: '已付款',
        2: '结算中',
        3: '已结算',
        4: '已删除',
        5: '失败'
      }
      return states[state]
    },
    handleFilter(key, value) {
      this.listQuery.page = 1
      if (key) {
        this.listQuery[key] = value
      }
      const data = this.listQuery.data
      if (data && data.length > 0) {
        this.listQuery.insertTime = data[0].getTime()
        this.listQuery.finishTime = data[1].getTime()
      } else {
        this.listQuery.insertTime = null
        this.listQuery.finishTime = null
      }
      this.getList()
    }
  },
  created() {
  }
}
</script>