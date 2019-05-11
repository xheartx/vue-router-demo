<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.searchString">
        </el-input>
        <el-date-picker v-model="chargeTime" @change="changetime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="listQuery.chargeStatus" placeholder="请选择" size="medium" style="width: 120px">
          <el-option v-for="item in FilterOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" :loading="downloadLoading" icon="el-icon-download">导出</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="500" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" :index="changeindex" label="序号" width="40">
      </el-table-column>
      <el-table-column width="120" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="持卡人姓名">
        <template slot-scope="scope">
          <span>{{scope.row.holdcardname}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="所属省份">
        <template slot-scope="scope">
          <span>{{scope.row.province}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="所属城市">
        <template slot-scope="scope">
          <span>{{scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="持卡人好友" width="70">
        <template slot-scope="scope">
          <span>{{scope.row.holdcardfriend}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值金额（元）" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.chargemoney}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="到账时间" width="160">
        <template slot-scope="scope">
          <span>{{scope.row.arrivaltime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值状态" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.chargestatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请充值时间" width="160">
        <template slot-scope="scope">
          <span>{{scope.row.applytime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="流水号" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.serialnumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="平台订单号" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.platformordernumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易流水号" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.transactionflownumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付方式" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.paymentmethod}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align: right;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currentPage" :page-sizes="[10]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchChargeRecord } from '@/api/capital'

export default {
  name: 'pay-record',
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      downloadLoading: false,
      list: null,
      chargeTime: '',
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        searchString: '',
        chargeStartTime: '',
        chargeEndTime: '',
        chargeStatus: ''
      },
      total: 0,
      FilterOptions: [{ key: '', value: '全部' }, { key: 0, value: '待充值' }, { key: 1, value: '充值成功' }, { key: 2, value: '充值失败' }, { key: 3, value: '宝付充值成功,数据库插入失败' }]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      fetchChargeRecord(this.listQuery).then(Response => {
        this.list = Response.list
        this.total = Response.total
      })
    },
    changeindex(index) {
      return (this.listQuery.currentPage - 1) * this.listQuery.pageSize + index + 1
    },
    handleFilter(name) {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    changetime(val) {
      if (val && val.length > 0) {
        this.listQuery.chargeStartTime = val[0]
        this.listQuery.chargeEndTime = val[1]
      } else {
        this.listQuery.chargeStartTime = ''
        this.listQuery.chargeEndTime = ''
      }
    }
  }
}
</script>