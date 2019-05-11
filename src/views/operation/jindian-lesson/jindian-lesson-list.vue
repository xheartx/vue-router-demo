<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <div class="fl">
        <div class="form-item">
          <span>标题查询:</span>
          <el-input @keyup.enter.native="handleFilter('title')" style="width: 200px;" class="filter-item" placeholder="标题查询" v-model="listQuery.title">
          </el-input>
        </div>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      </div>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border
      fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="编号" width="60">
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否有效">
        <template slot-scope="scope">
          <span>{{scope.row.vaild}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.bankAccount}}</span>
        </template> -->
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
    name: 'binder-info',
    mixins: [tablist],
    data() {
      return {
        list: [],
        listQuery: {
          pageNum: 1,
          limit: 10,
          userName: ''
        },
        getDataUrl: '/licaiList'
      }
    },
    methods: {}
  }

</script>
