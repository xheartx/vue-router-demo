<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.searchName">
        </el-input>
        <el-date-picker @change="changetime" v-model="datatime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="listQuery.txStatus" placeholder="请选择" size="medium" style="width: 120px">
          <el-option v-for="item in FilterOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDownload" type="primary" :loading="downloadLoading" icon="el-icon-download">导出</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" label="流水号">
        <template slot-scope="scope">
          <span>{{scope.row.serialnumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提现金额（元）">
        <template slot-scope="scope">
          <span>{{scope.row.withdrawmoney}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.realname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请提现时间">
        <template slot-scope="scope">
          <span>{{scope.row.applywithdrawtime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核提现时间">
        <template slot-scope="scope">
          <span>{{scope.row.auditwithdrawtime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="平台订单号">
        <template slot-scope="scope">
          <span>{{scope.row.platformordernumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易流水号">
        <template slot-scope="scope">
          <span>{{scope.row.transactionflownumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提现状态">
        <template slot-scope="scope">
          <span>{{scope.row.withdrawstatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button v-if="(scope.row.withdrawstatus != '提现成功')&&(scope.row.withdrawstatus != '提现失败')" class="filter-item" size="small" style="margin-left: 10px;" @click="handleAudit(scope.row)" type="warning" icon="el-icon-edit-outline">审核资金</el-button>
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
import { fetchWithdrawRecord, auditMoney } from '@/api/capital'
export default {
  name: 'cash-record',
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: false,
      downloadLoading: false,
      total: 0,
      datatime: '',
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        searchName: '',
        startTime: '',
        endTime: '',
        txStatus: ''
      },
      FilterOptions: [{ key: '', value: '全部' }, { key: 0, value: '待审核' }, { key: 1, value: '提现成功' }, { key: 2, value: '提现失败' }, { key: 3, value: '正在审核' }]
    }
  },
  mounted() {
    this.getList()
  },
  computed: {
    tableHeight() {
      return document.body.clientHeight - (this.$store.getters.sidebar.opened ? 80 : 50) - 235
    }
  },
  methods: {
    getList() {
      fetchWithdrawRecord(this.listQuery).then(Response => {
        console.log(Response)
        this.list = Response.list
        this.total = Response.total
      })
    },
    sequenceNumber(index) {
      return (this.listQuery.currentPage - 1) * this.listQuery.pageSize + index + 1
    },
    handleFilter(name) {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleAudit(row) {
      this.$confirm('执行审核资金操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        auditMoney({ id: row.id }).then(Response => {
          this.$message({
            type: 'success',
            message: '审核成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
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
        this.listQuery.startTime = val[0]
        this.listQuery.endTime = val[1]
      } else {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      }
    }
  }
}
</script>