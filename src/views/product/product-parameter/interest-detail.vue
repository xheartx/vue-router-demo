<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <div class="fl">
        <div class="form-item">
          <span>用户名:</span>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.userName">
          </el-input>
        </div>
        <div class="form-item">
          <span>发期时间:</span>
          <el-date-picker
            v-model="listQuery.data"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            <template slot-scope="text">
              <span>充值时间</span>
            </template>
          </el-date-picker>
        </div>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDownload" type="primary" :loading="downloadLoading" icon="el-icon-download">导出报表</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="60">
      </el-table-column>
      <el-table-column min-width="240" align="center" label="产品名称">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="用户名">
        <template slot-scope="scope">
          <router-link :to='`/operation/register-management/binder-info?userName=${scope.row.userName}`' class="link">{{scope.row.userName}}</router-link>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="真实姓名">
        <template slot-scope="scope">
          <span>{{scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="项目年化收益率">
        <template slot-scope="scope">
          <span>{{scope.row.annualEarnings}}</span>%
        </template>
      </el-table-column>
      <el-table-column width="140" align="center" label="加息券年化收益率">
        <template slot-scope="scope">
          <span>{{scope.row.couponAnnualRate}}</span>%
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="最终年化收益率">
        <template slot-scope="scope">
          <span>{{scope.row.investorsAnnualEarnings}}</span>%
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="本次收益">
        <template slot-scope="scope">
          <span>{{scope.row.totalMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="投资本金">
        <template slot-scope="scope">
          <span>{{scope.row.inMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="付息">
        <template slot-scope="scope">
          <span>{{scope.row.payInterest}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布日期" width="160">
        <template slot-scope="scope">
          <span>{{scope.row.productInsertTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买日期"  width="160">
        <template slot-scope="scope">
          <span>{{scope.row.insertTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算日期"  width="160">
        <template slot-scope="scope">
          <span>{{scope.row.returnTime}}</span>
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
<style scope>
  .link {
    color: #409EFF;
  }
</style>
<script>
import tablist from '@/mixins/tablist'

export default {
  name: 'interest-detail',
  mixins: [tablist],
  data() {
    return {
      listQuery: {
        pageNum: 1,
        limit: 10,
        userName: '',
        returnTime: '',
        finishTime: '',
        data: []
      },
      getDataUrl: '/operation/interestDetails'
    }
  },
  methods: {
    handleFilter(name) {
      this.listQuery.page = 1
      const data = this.listQuery.data
      if (data && data.length > 0) {
        this.listQuery.returnTime = data[0].getTime()
        this.listQuery.finishTime = data[1].getTime()
      }
      this.getList()
    }
  }
}
</script>