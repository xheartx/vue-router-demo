<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="form-row">
        <div class="form-item">
          <span>产品名称:</span>
          <el-input @keyup.enter.native="handleFilter" clearable style="width: 300px;" class="filter-item" placeholder="搜索产品名称" v-model="listQuery.title">
          </el-input>
        </div>
        <div class="form-item">
          <span>日期:</span>
          <el-date-picker v-model="listQuery.timeData" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="form-item">
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          <el-button class="filter-item" size="small" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
        </div>
      </div>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" @selection-change="handleSelectionChange" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <!-- <el-table-column type="selection" width="40" align="center">
      </el-table-column> -->
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="65" fixed="left">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template> -->
      </el-table-column>
      <el-table-column align="center" label="产品名称" min-width="150" fixed="left">
        <template slot-scope="scope">
          <span>{{scope.row.productName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品类型">
        <template slot-scope="scope">
          <span>{{scope.row.productType}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品状态">
        <template slot-scope="scope">
          <span>{{scope.row.productState}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="完成进度">
        <template slot-scope="scope">
          <span>{{scope.row.schedule}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年化收益">
        <template slot-scope="scope">
          <span>{{scope.row.annualizedReturns}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="理财期限">
        <template slot-scope="scope">
          <span>{{scope.row.financialPeriod}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="剩余天数">
        <template slot-scope="scope">
          <span>{{scope.row.remainingDays}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="起投金额">
        <template slot-scope="scope">
          <span>{{scope.row.investmentAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目总额">
        <template slot-scope="scope">
          <span>{{scope.row.totalProject}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已募金额">
        <template slot-scope="scope">
          <span>{{scope.row.yetRaiseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="实际募集金额">
        <template slot-scope="scope">
          <span>{{scope.row.actualAmountRaised}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投资券金额">
        <template slot-scope="scope">
          <span>{{scope.row.investmentSecuritiesAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="虚拟投资金额">
        <template slot-scope="scope">
          <span>{{scope.row.virtualInvestmentAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="剩余金额">
        <template slot-scope="scope">
          <span>{{scope.row.balance}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="发布时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.releaseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="到期时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.expirationTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预付利息">
        <template slot-scope="scope">
          <span>{{scope.row.interestAdvance}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="实付利息">
        <template slot-scope="scope">
          <span>{{scope.row.netInterestPaid}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button class="filter-item" size="small" type="warning" @click="handleVirtualInvestment(scope.row)">虚拟投资</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="info" @click="handleInvestmentRecord(scope.row)">虚拟投资记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align: right;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="虚拟投资" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="100px">
        <el-form-item label="虚拟投资产品" prop="modulName" class="row">
          <el-input v-model="temp.productName" :disabled="true" placeholder="请输入虚拟投资产品"></el-input>
        </el-form-item>
        <el-form-item label="剩余金额" prop="balance">
          <el-input v-model="temp.balance" :disabled="true" placeholder="请输入剩余金额"></el-input>
        </el-form-item>
        <el-form-item label="起投金额" prop="investmentAmount">
          <el-input v-model="temp.investmentAmount" :disabled="true" placeholder="请选择起投金额"></el-input>
        </el-form-item>
        <el-form-item label="投资人数" prop="investmentNumber">
          <el-input type="number" v-model="temp.investmentNumber" required placeholder="请输入投资人数"></el-input>
        </el-form-item>
        <el-form-item label="投资金额" prop="investmentMoney">
          <el-input type="number" v-model="temp.investmentMoney" required placeholder="请输入投资金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkVirtualInvestment" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="虚拟投资记录" :visible.sync="dialogFormVisibleTable" :modal-append-to-body="false" custom-class="record-table">
      <el-table ref="FormVisibleTable" :data="recordTable" max-height="500">
        <el-table-column property="userName" label="用户名" align="center" width="150"></el-table-column>
        <el-table-column property="productName" label="产品名称" align="center" width="150"></el-table-column>
        <el-table-column property="investmentMoney" label="购买金额(元)" align="center" width="150"></el-table-column>
        <el-table-column property="annualizedReturns" label="年化收益(%)" align="center" width="150"></el-table-column>
        <el-table-column property="investmentTime" label="投资时间" align="center" width="160"></el-table-column>
        <el-table-column property="expirationTime" label="项目到期时间" align="center" width="160"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import tablist from '@/mixins/tablist'
import { virtualInvestmentProduct, virtualInvestmentRecord } from '@/api/product'
export default {
  name: 'release-product-list',
  mixins: [tablist],
  data() {
    return {
      listQuery: {
        pageNum: 1,
        limit: 10,
        title: undefined,
        timeData: []
      },
      rules: {
        investmentNumber: [{ required: true, message: '请输入投资人数', trigger: 'change' }],
        investmentMoney: [{ required: true, message: '请输入投资金额', trigger: 'change' }]
      },
      recordTable: [],
      dialogFormVisibleTable: false,
      getDataUrl: '/product/getReleaseProductList',
      findDataUrl: '/product/getReleaseProductList'
    }
  },
  methods: {
    handleVirtualInvestment(row) {
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleInvestmentRecord(row) {
      this.dialogFormVisibleTable = true
      if (this.recordTable.id === row.id) {
        return
      }
      virtualInvestmentRecord({ id: row.id }).then((res) => {
        this.recordTable = res
        this.$refs.FormVisibleTable.bodyWrapper.scrollTop = 0
        this.$refs.FormVisibleTable.bodyWrapper.scrollLeft = 0
      })
    },
    checkVirtualInvestment() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          virtualInvestmentProduct(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list[index].virtualInvestmentAmount += (tempData.investmentMoney * 1)
                this.list[index].balance -= (tempData.investmentMoney * 1)
                break
              }
            }
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.resetTemp()
          }).catch(() => {
            this.dialogFormVisible = false
            this.dialogLoading = false
            this.resetTemp()
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        productName: '',
        balance: '',
        investmentNumber: null,
        investmentMoney: null
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.record-table{
  max-width: 70%;
  width: 52%;
}
</style>
