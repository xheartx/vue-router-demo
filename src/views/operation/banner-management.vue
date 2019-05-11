<template>
  <div class="app-container small-tab">
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="500" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" :index="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="插入时间">
        <template slot-scope="scope">
          <span>{{scope.row.inserttime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公告ID">
        <template slot-scope="scope">
          <span>{{scope.row.announceid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动链接">
        <template slot-scope="scope">
          <span>{{scope.row.link}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="渠道号">
        <template slot-scope="scope">
          <span>{{scope.row.channel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序序号">
        <template slot-scope="scope">
          <span>{{scope.row.order}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="目前状态">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '启用'" class="filter-item" size="small" style="margin-left: 10px;" @click="handleDetail(scope.row)" type="text">停用</el-button>
          <el-button v-else class="filter-item" size="small" style="margin-left: 10px;" @click="handleDetail(scope.row)" type="text">启用</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDetail(scope.row)" type="text">修改</el-button>
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
import { getBannerList } from '@/api/operation'

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
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getBannerList(this.listQuery).then(Response => {
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
    handleDetail(row) {
      console.log(row)
    },
    index(index) {
      return (this.listQuery.currentPage - 1) * this.listQuery.pageSize + index + 1
    }
  }
}
</script>