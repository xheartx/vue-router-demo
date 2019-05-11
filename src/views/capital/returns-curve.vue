<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户ID" v-model="listQuery.id">
        </el-input>
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
        <span>零钱包剩余金额:0</span>
      </div>
    </div>
    <el-row style="margin: 50px 0 30px 0;" v-if="linData.length > 0">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="80">
      </el-table-column>
      <el-table-column align="center" label="零钱包收益">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收益时间">
        <template slot-scope="scope">
          <span>{{scope.row.insert_time}}</span>
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
import LineChart from '@/components/Chart/LineChart'

export default {
  name: 'returns-curve',
  mixins: [tablist],
  components: {
    LineChart
  },
  data() {
    return {
      listQuery: {
        id: '',
        userName: '',
        data: []
      },
      list: [],
      linData: [],
      xData: [],
      getDataUrl: '/operation/balanceOfPiggyBank'
    }
  },
  computed: {
    lineChartData() {
      return {
        seriesArr: [{
          name: '收益',
          type: 'line',
          data: this.linData
        }],
        xData: this.xData,
        legendData: ['收益']
      }
    }
  }
}
</script>
