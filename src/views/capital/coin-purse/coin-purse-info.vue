<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.userName">
        </el-input>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDownload" type="primary" :loading="downloadLoading" icon="el-icon-download">导出</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="80">
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="插入时间">
        <template slot-scope="scope">
          <span>{{scope.row.insert_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="剩余金额">
        <template slot-scope="scope">
          <span>{{scope.row.in_money}}</span>
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
  name: 'coin-purse-info',
  mixins: [tablist],
  data() {
    return {
      searchName: 'userName',
      getDataUrl: '/operation/balanceOfPiggyBank'
    }
  },
  methods: {
  },
  created() {
  }
}
</script>