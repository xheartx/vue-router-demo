<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <div class="fl">
        <div class="form-item">
          <span>用户名:</span>
          <el-input @keyup.enter.native="handleFilter('userName')" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.title">
          </el-input>
        </div>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDownload" type="primary" :loading="downloadLoading" icon="el-icon-download">导出报表</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.bankAccountName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号码">
        <template slot-scope="scope">
          <span>{{scope.row.idcard}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="银行卡号">
        <template slot-scope="scope">
          <span>{{scope.row.bankAccount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开户银行">
        <template slot-scope="scope">
          <span>{{scope.row.bankName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="绑定时间">
        <template slot-scope="scope">
          <span>{{scope.row.insertTime}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="绑卡状态">
        <template slot-scope="scope">
          <span>{{scope.row.bankStatus}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import tablist from '@/mixins/tablist'

export default {
  name: 'binder-info',
  mixins: [tablist],
  data() {
    return {
      listQuery: {
        pageNum: 1,
        limit: 10,
        userName: ''
      },
      getDataUrl: '/account/accountList'
    }
  },
  methods: {
  }
}
</script>