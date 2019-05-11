<template>
  <div class="app-container small-tab">
    <!-- <div class="filter-container">
      <div class="fl">
        <el-date-picker v-model="listQuery.Time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="listQuery.status" placeholder="请选择" size="medium" style="width: 120px">
          <el-option v-for="item in FilterOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" :loading="downloadLoading" icon="el-icon-download">导出</el-button>
    </div> -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="500" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" :index="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" label="账户类型">
        <template slot-scope="scope">
          <span>{{scope.row.accounttype}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户名">
        <template slot-scope="scope">
          <span>{{scope.row.accountname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户号码">
        <template slot-scope="scope">
          <span>{{scope.row.accountnumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户余额-银行存管（元）">
        <template slot-scope="scope">
          <span>{{scope.row.accountbalance}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleCharge(scope.row)" type="text">充值</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleCash(scope.row)" type="text">提现</el-button>
          <!-- <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDetail(scope.row)" type="text">查询流水</el-button> -->
          <!-- <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDetail(scope.row)" type="text">转账</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align: right;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currentPage" :page-sizes="[10]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="充值" :visible.sync="chargevisible" :modal-append-to-body="false">
      <el-form :model="chargeform" ref="chargeform">
        <el-form-item label="预留手机号" prop="tel">
          <el-input disabled type="tel" v-model="chargeform.tel"></el-input>
        </el-form-item>
        <el-form-item label="输入充值金额（元）" prop="chargemoney">
          <el-input v-model="chargeform.chargemoney"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitcharge">确定</el-button>
          <el-button @click="chargevisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="提现" :visible.sync="cashvisible" :modal-append-to-body="false">
      <el-form :model="cashform" ref="cashform">
        <el-form-item label="预留手机号" prop="tel">
          <el-input disabled type="tel" v-model="cashform.tel"></el-input>
        </el-form-item>
        <el-form-item label="输入提现金额（元）" prop="cashmoney">
          <el-input v-model="cashform.cashmoney"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitcash">确定</el-button>
          <el-button @click="chargevisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { zheshangAccountBalance, zheshangChargeMoney, zheshangWithdrawMoney } from '@/api/capital'

export default {
  name: 'pay-record',
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: null,
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
      total: 0,
      chargevisible: false,
      cashvisible: false,
      chargeform: {
        chargemoney: '',
        tel: ''
      },
      cashform: {
        cashmoney: '',
        tel: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      zheshangAccountBalance(this.listQuery).then(Response => {
        this.list = Response.list
        this.total = Response.total
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    handleCash(row) {
      this.cashvisible = true
      this.cashform.id = row.id
      this.cashform.tel = row.accountnumber
    },
    submitcash() {
      zheshangWithdrawMoney(this.cashform).then(Response => {
        this.cashvisible = false
        this.$message({
          type: 'success',
          message: '提现成功!'
        })
      })
    },
    handleCharge(row) {
      this.chargevisible = true
      this.chargeform.id = row.id
      this.chargeform.tel = row.accountnumber
    },
    submitcharge() {
      zheshangChargeMoney(this.chargeform).then(Response => {
        this.chargevisible = false
        this.$message({
          type: 'success',
          message: '充值成功!'
        })
      })
    },
    index(index) {
      return (this.listQuery.currentPage - 1) * this.listQuery.pageSize + index + 1
    }
  }
}
</script>