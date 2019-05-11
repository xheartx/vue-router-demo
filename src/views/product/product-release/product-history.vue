<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="form-row">
        <div class="form-item">
          <span>产品名称:</span>
          <el-input v-model="listQuery.productName"  placeholder="请输入产品名称" @keyup.enter.native="handleFilter" clearable style="width: 250px;" class="filter-item">
          </el-input>
        </div>
        <div class="form-item">
          <span>借款企业:</span>
          <el-input v-model="listQuery.borrowingVenture"  placeholder="请输入借款企业" @keyup.enter.native="handleFilter" clearable style="width: 250px;" class="filter-item">
          </el-input>
        </div>
        <div class="form-item">
          <span>年化收益:</span>
          <el-input v-model="listQuery.annualizedReturns"  placeholder="请输入年化收益" @keyup.enter.native="handleFilter" clearable style="width: 200px;" class="filter-item">
          </el-input>
        </div>
        <div class="form-item">
          <span>项目总额:</span>
          <el-input v-model="listQuery.projectTotal"  placeholder="请输入项目总额" @keyup.enter.native="handleFilter" clearable style="width: 200px;" class="filter-item">
          </el-input>
        </div>
        <div class="form-item">
          <span>发布日期:</span>
           <el-date-picker
            v-model="listQuery.releaseTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="发布日期">
          </el-date-picker>
        </div>
        <div class="form-item">
          <span>到期日期:</span>
          <el-date-picker
            v-model="listQuery.expirationTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="发布日期">
          </el-date-picker>
        </div>
        <div class="form-item">
          <span>产品状态:</span>
          <el-select v-model="listQuery.productStatus" clearable placeholder="请选择">
            <el-option v-for="item in productStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          <el-button class="filter-item" size="small" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
        </div>
      </div>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" @selection-change="handleSelectionChange" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="65" fixed="left">
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
      <el-table-column align="center" label="产品状态" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.productStatus | statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布状态">
        <template slot-scope="scope">
          <span>{{scope.row.releaseStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="借款企业">
        <template slot-scope="scope">
          <span>{{scope.row.borrowingVenture}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年化总收益">
        <template slot-scope="scope">
          <span>{{scope.row.annualizedReturns}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="奖励（浮动）收益">
        <template slot-scope="scope">
          <span>{{scope.row.award}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目总额">
        <template slot-scope="scope">
          <span>{{scope.row.projectTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="虚拟投资总额">
        <template slot-scope="scope">
          <span>{{scope.row.virtualTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="真实投资总额">
        <template slot-scope="scope">
          <span>{{scope.row.realTotal}}</span>
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

      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="filter-item" size="small" type="success" @click="handleExamine(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align: right;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="产品详情" :visible.sync="dialogFormVisibleTable" :modal-append-to-body="false" class="dialogFormVisibleTable">
      <el-table
        ref="detailTable"
        class="detail-table"
        :max-height="dialogTableHeight"
        :show-header="false"
        :data="detailData"
        border>
        <el-table-column
          prop="name"
          align="right"
          width="150">
        </el-table-column>
        <el-table-column
          prop="content"
          align="left"
          class-name="explain">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import tablist from '@/mixins/tablist'
import { getProductDetail } from '@/api/product'
const statusMap = {
  '-3': '预约中',
  '-2': '审核不通过',
  '-1': '未审核',
  '0': '营销中',
  '1': '已售罄',
  '2': '结算中',
  '3': '已结算'
}
export default {
  name: 'product-history',
  mixins: [tablist],
  data() {
    return {
      listQuery: {
        pageNum: 1,
        limit: 10,
        productName: '',
        annualizedReturns: '',
        projectTotal: '',
        borrowingVenture: '',
        releaseTime: '',
        expirationTime: '',
        productStatus: ''
      },
      productStatusOptions: [
        { value: '', label: '全部' }
      ],
      detailData: [
        { name: '产品名称', prop: 'productName' },
        { name: '发起人姓名', prop: 'sponsorName' },
        { name: '发起人身份证号', prop: 'sponsorIDCard' },
        { name: '发起人联系电话', prop: 'sponsorPhone' },
        { name: '发起人联系地址', prop: 'sponsorAddress' },
        { name: '投资类别', prop: 'productType' },
        { name: '推荐产品', prop: 'recommendProducts' },
        { name: '定时配置', prop: 'timingConfiguration' },
        { name: '常规产品类型', prop: 'conventionalProductType' },
        { name: '奖励产品', prop: 'awardProduct' },
        { name: '放置模块', prop: 'placeModule' },
        { name: '项目总额', prop: 'projectTotal' },
        { name: '起投金额', prop: 'investmentAmount' },
        { name: '总年化收益', prop: 'annualizedReturns' },
        { name: '基础年化收益', prop: 'baseAnnualizedReturns' },
        { name: '额外年化收益', prop: 'extraAnnualizedReturns' },
        { name: '还款方式', prop: 'payMentMethod' },
        { name: '起息日', prop: 'valueDate' },
        { name: '理财期限', prop: 'financialPeriod' },
        { name: '活动标语', prop: 'slogan' },
        { name: '借款用途', prop: 'purpose' },
        { name: '借款人信息', prop: 'borrowerInformation' },
        { name: '还款来源', prop: 'payMentSourc' },
        { name: '项目特色', prop: 'feature' },
        { name: '项目介绍', prop: 'introduce' },
        { name: '风控措施', prop: 'measure' },
        { name: '风险提示', prop: 'riskWarning' }
      ],
      temp: { id: null },
      dialogFormVisibleTable: false,
      getDataUrl: '/product/product-history',
      findDataUrl: '/product/product-history'
    }
  },
  filters: {
    statusFilter(status) {
      return statusMap[status]
    }
  },
  computed: {
    dialogTableHeight() {
      return document.body.clientHeight * 0.6
    }
  },
  mounted() {
    for (const key in statusMap) {
      this.productStatusOptions.push({
        value: key,
        label: statusMap[key]
      })
    }
  },
  methods: {
    handleExamine(item) {
      this.dialogFormVisibleTable = true
      if (this.temp.id === item.id) {
        return
      }
      this.resetTemp()
      getProductDetail({ id: item.id }).then(res => {
        this.temp = Object.assign({}, res, item)
        for (const key in this.temp) {
          this.detailData.forEach(item => {
            if (item.prop === key) {
              this.$set(item, 'content', this.temp[key])
            }
          })
        }
        this.$refs.detailTable && (this.$refs.detailTable.bodyWrapper.scrollTop = 0)
      })
    },
    resetTemp() {
      this.temp = {
        id: null
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.record-table{
  max-width: 70%;
  width: 52%;
}
</style>
