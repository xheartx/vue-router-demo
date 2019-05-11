<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <div class="form-row">
        <div class="form-item">
          <span>关键字:</span>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名/用户ID/姓名" v-model="listQuery.title">
          </el-input>
        </div>
        <div class="form-item">
          <span>渠道:</span>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="渠道" v-model="listQuery.registChannel">
          </el-input>
        </div>
        <div class="form-item">
          <span>注册时间:</span>
          <el-date-picker
            v-model="listQuery.registerData"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="form-item">
          <span>绑卡时间:</span>
          <el-date-picker
            v-model="listQuery.tiedCardData"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="form-item">
          <span>是否绑卡:</span>
          <el-select v-model="listQuery.isBindBank" placeholder="请选择" size="medium" style="width: 100px"> 
            <el-option v-for="item in isBindBankOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <span>只投资活期/定期:</span>
          <el-select v-model="listQuery.islqg" placeholder="请选择" size="medium" style="width: 100px"> 
            <el-option v-for="item in investTypeOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <span>等级:</span>
          <el-select v-model="listQuery.level" placeholder="请选择" size="medium" style="width: 100px"> 
            <el-option v-for="item in levelOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <span>投资总额范围:</span>
          <el-input style="width: 80px;" class="filter-item" v-model="listQuery.scopeStart"></el-input> <span>一</span> <el-input style="width: 80px;" class="filter-item" v-model="listQuery.scopeEnd"></el-input>
        </div>
        <div class="form-btns">
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="handleReset">重置</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleRefresh" type="primary" icon="el-icon-refresh">刷新</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDownload" type="primary" :loading="downloadLoading" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
        style="width: 100%">
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="40">
      </el-table-column>
      <el-table-column width="65" align="center" label="用户ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center" label="用户名">
        <template slot-scope="scope">
    	     <span class="clickable" @click="handleFilter('title', scope.row.userName)">{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex}}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" label="年龄">
        <template slot-scope="scope">
          <span>{{scope.row.age}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="生日">
        <template slot-scope="scope">
          <span>{{scope.row.birthday}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="所属省份">
        <template slot-scope="scope">
          <span>{{scope.row.province}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="所属城市">
        <template slot-scope="scope">
          <span>{{scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="电话类型">
        <template slot-scope="scope">
          <span>{{scope.row.cardType}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{scope.row.insertTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="绑卡时间">
        <template slot-scope="scope">
          <span>{{scope.row.acinsertTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="注册平台">
        <template slot-scope="scope">
          <span>{{scope.row.registPlatform}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="是否绑定银行卡">
        <template slot-scope="scope">
          <span>{{scope.row.isBindBank}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="首投日期" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.payTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="首投产品"  width="80">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="首投金额(元)"  width="80">
        <template slot-scope="scope">
          <span>{{scope.row.firstMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投资总金额（元）"  width="80">
        <template slot-scope="scope">
          <span>{{scope.row.inMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="零钱罐金额（元）">
        <template slot-scope="scope">
          <span>{{scope.row.coinPurseFundsRecordMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="VIP等级">
        <template slot-scope="scope">
          <span>{{scope.row.level}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="渠道号">
        <template slot-scope="scope">
          <span>{{scope.row.registChannel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="400">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <router-link :to='`/product/product-parameter/investment-record?userName=${scope.row.userName}`'>投资记录</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/capital/pay-withdraw/pay-record?userName=${scope.row.userName}`'>充值记录</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/capital/pay-withdraw/cash-record?userName=${scope.row.userName}`'>提现记录</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/capital/capital-flow?userName=${scope.row.userName}`'>用户资金流水</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/product/product-parameter/interest-detail?userName=${scope.row.userName}`'>付息明细表记录</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/operation/account-detail?userName=${scope.row.userName}`'>账户详情</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/capital/coupon/coupon-record?userName=${scope.row.userName}`'>投资券记录</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/capital/returns-curve?userName=${scope.row.userName}`'>收益曲线图</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/operation/register-management/binder-info?userName=${scope.row.userName}`'>绑卡人信息</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/capital/coin-purse/coin-purse-in-record?userName=${scope.row.userName}`'>零钱包转入记录</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/capital/coin-purse/coin-purse-out-record?userName=${scope.row.userName}`'>零钱包转出记录</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/capital/coin-purse/coin-purse-info?userName=${scope.row.userName}`'>零钱包余额</router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link :to='`/capital/team-returns?userName=${scope.row.userName}&&realName=${scope.row.realName}`'>团队收益</router-link>
          </el-button>
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
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'register-userinfo',
  mixins: [tablist],
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      listQuery: {
        pageNum: 1,
        limit: 10,
        title: '',
        type: undefined,
        registerData: '',
        tiedCardData: '',
        userName: '',
        id: '',
        realName: '',
        insertTime: '',
        acinsertTime: '',
        isBindBank: '',
        islqg: '',
        investType: '',
        level: '',
        investRange: '',
        scopeStart: '',
        scopeEnd: ''
      },
      isBindBankOptions: [{ key: '', value: '所有' }, { key: 1, value: '是' }, { key: 0, value: '否' }],
      investTypeOptions: [{ key: '', value: '所有' }, { key: 1, value: '活期' }, { key: 0, value: '定期' }],
      levelOptions: [{ key: '', value: '所有' }, { key: 0, value: 0 }, { key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }, { key: 4, value: 4 }, { key: 5, value: 5 }, { key: 6, value: 6 }],
      getDataUrl: '/operation/registerUserInfo',
      findDataUrl: '/operation/registerUserInfo',
      updataDataUrl: '/modul/updateModul'
    }
  },
  methods: {
    handleFilter(key, value) {
      this.listQuery.page = 1
      if (key) {
        this.listQuery[key] = value
      }
      const data = this.listQuery.data
      if (data && data.length > 0) {
        this.listQuery.insertTime = data[0]
        this.listQuery.finishTime = data[1]
      } else {
        this.listQuery.insertTime = null
        this.listQuery.finishTime = null
      }

      const title = this.listQuery.title
      console.log(Number.isNaN(parseInt(title)))
      if (isvalidUsername(title)) {
        this.listQuery.userName = title
      } else if (Number.isNaN(parseInt(title))) {
        this.listQuery.realName = title
      } else {
        this.listQuery.id = title
      }

      if (!title) {
        this.listQuery.id = ''
        this.listQuery.realName = ''
        this.listQuery.userName = ''
      }

      this.getList()
    },
    handleRefresh() {
      this.getList()
    },
    handleReset() {
      this.listQuery = {
        pageNum: 1,
        limit: 10,
        title: undefined,
        type: undefined,
        userName: '',
        insertTime: '',
        acinsertTime: '',
        isBindBank: '',
        investType: '',
        level: '',
        investRange: ''
      }
    }
  }
}
</script>