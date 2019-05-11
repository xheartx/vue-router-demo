<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" clearable style="width: 160px;" class="filter-item" placeholder="用户名" v-model="listQuery.searchName" size="mini">
        </el-input>
        <div class="form-item">
          <span>发送投资券时间:</span>
          <el-date-picker v-model="releaseTime" @change="changereleasetime" style="width: 300px;" clearable type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
          </el-date-picker>
        </div>
        <div class="form-item">
          <span>使用投资券时间:</span>
          <el-date-picker v-model="useTime" @change="changeusetime" style="width: 300px;" clearable type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
          </el-date-picker>
        </div>
        <el-input @keyup.enter.native="handleFilter" clearable style="width: 160px;" class="filter-item" placeholder="关键字查询" v-model="listQuery.keyWords" size="mini">
        </el-input>
        <el-select v-model="listQuery.status" clearable placeholder="请选择" size="mini" style="width: 90px">
          <el-option v-for="item in FilterOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="mini" style="margin-left: 10px;" @click="handleDownload" type="primary" :loading="downloadLoading" icon="el-icon-download">导出</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发送金额">
        <template slot-scope="scope">
          <span>{{scope.row.sendmoney}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类别">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发送时间">
        <template slot-scope="scope">
          <span>{{scope.row.sendtime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="到期时间">
        <template slot-scope="scope">
          <span>{{scope.row.endtime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="使用时间">
        <template slot-scope="scope">
          <span>{{scope.row.usetime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册平台">
        <template slot-scope="scope">
          <span>{{scope.row.registerplatform}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册渠道">
        <template slot-scope="scope">
          <span>{{scope.row.registerchannel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
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
import { fetchVoucherRecord } from '@/api/capital'
export default {
  name: 'coupon-record',
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: false,
      downloadLoading: false,
      total: 0,
      releaseTime: [],
      useTime: [],
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        searchName: '',
        releaseSatrtTime: '',
        releaseEndTime: '',
        useStartTime: '',
        useEndTime: '',
        keyWords: '',
        status: ''
      },
      FilterOptions: [{ key: '', value: '全部' }, { key: 0, value: '未使用' }, { key: 1, value: '未用完' }, { key: 2, value: '已用完' }, { key: 3, value: '已过期' }]
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
      fetchVoucherRecord(this.listQuery).then(Response => {
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
    changereleasetime(val) {
      if (val && val.length > 0) {
        this.listQuery.releaseSatrtTime = val[0]
        this.listQuery.releaseEndTime = val[1]
      } else {
        this.listQuery.releaseSatrtTime = ''
        this.listQuery.releaseEndTime = ''
      }
    },
    changeusetime(val) {
      if (val && val.length > 0) {
        this.listQuery.useStartTime = val[0]
        this.listQuery.useEndTime = val[1]
      } else {
        this.listQuery.useStartTime = ''
        this.listQuery.useEndTime = ''
      }
    }
  }
}
</script>