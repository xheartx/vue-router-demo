<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.userName">
        </el-input>
        <el-date-picker
          v-model="listQuery.data"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDownload" type="primary" :loading="downloadLoading" icon="el-icon-download">导出</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="80">
      </el-table-column>
      <el-table-column align="center" label="用户名" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="转入金额" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.in_money}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="剩余金额" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.left_money}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="插入时间">
        <template slot-scope="scope">
          <span>{{scope.row.insert_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <span>{{filterState(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="100">
        <template slot-scope="scope">
          <span>{{filterType(scope.row.type)}}</span>
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
  name: 'coin-purse-in-record',
  mixins: [tablist],
  data() {
    return {
      listQuery: {
        pageNum: 1,
        limit: 10,
        userName: '',
        data: [],
        insertTime: '',
        finishTime: ''
      },
      getDataUrl: '/operation/shiftOTRecord'
    }
  },
  methods: {
    filterState(state) {
      const states = {
        '-1': '无效',
        0: '未发息',
        1: '发息中',
        2: '已转出'
      }
      return states[state]
    },
    filterType(type) {
      const types = {
        0: '成功',
        1: '失败'
      }
      return types[type]
    },
    handleFilter(name) {
      this.listQuery.page = 1
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