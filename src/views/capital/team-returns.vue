<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <div class="fl">
        <el-date-picker @change="changetime" v-model="Time" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="listQuery.status" placeholder="请选择" size="medium" style="width: 120px">
          <el-option v-for="item in FilterOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" :loading="downloadLoading" icon="el-icon-download">导出</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="500" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" :index="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" label="对账文件日期">
        <template slot-scope="scope">
          <span>{{scope.row.reconciliationtime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文件上传日期">
        <template slot-scope="scope">
          <span>{{scope.row.uploadtime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结果确认时间">
        <template slot-scope="scope">
          <span>{{scope.row.resulttime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="新华金典对账文件包">
        <template slot-scope="scope">
          <span>{{scope.row.filezip}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="浙商对账文件包">
        <template slot-scope="scope">
          <span>{{scope.row.zsfilezip}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="对账结果">
        <template slot-scope="scope">
          <span>{{scope.row.result}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="对账明细">
        <template slot-scope="scope">
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDetail(scope.row)" type="warning" icon="el-icon-edit-outline">查看明细</el-button>
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
import { ZheshangFundReconciliation } from '@/api/capital'

export default {
  name: 'pay-record',
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      downloadLoading: false,
      list: null,
      Time: [],
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        status: '',
        startTime: '',
        endTime: ''
      },
      total: 0,
      FilterOptions: [{ key: '', value: '所有' }, { key: 0, value: '未对平' }, { key: 1, value: '已对平' }]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      ZheshangFundReconciliation(this.listQuery).then(Response => {
        this.list = Response.list
        this.total = Response.total
      })
    },
    handleFilter(name) {
      this.listQuery.page = 1
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
    handleDetail(row) {
      console.log(row)
    },
    index(index) {
      return (this.listQuery.currentPage - 1) * this.listQuery.pageSize + index + 1
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