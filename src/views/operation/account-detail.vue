<template>
  <div class="app-container">
     <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="用户ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="真实姓名">
        <template slot-scope="scope">
          <span>{{scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否为黑名单用户">
        <template slot-scope="scope">
          <span>{{scope.row.is}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.note}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20">
      <el-row>
        <el-col :span="6">
          <div class="grid-content">
            <span>总资产：</span>
            <span></span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span>是否为异常账户：</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>可用余额：</span><span>{{this.leftMoney}}</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>账户偏差值：</span><span>{{this.totalMoney}}</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>账户冻结资金：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>零钱包余额：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>产品冻结资金：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>零钱包收益：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>冻结资金是否一致：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>提现总次数：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>充值总次数：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>提现总金额：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>充值总金额：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>提现待审核总金额：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>成功投资产品：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>可用总积分：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>已结算投资产品：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>已使用总积分：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>未结算投资产品：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>已使用的投资券总金额：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>总利息：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>未使用的投资券总金额：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>已支付利息：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>已过期的投资券总金额：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>未支付利息：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>已使用的红包总金额：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>邀请奖励：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>未使用的红包总金额：</span><span></span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>已过期的红包的总金额：</span><span></span></div>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="12">
          <div class="mt20 pl30 ft14">
            <p class="small lh20">1.账户偏差值:“+”代表平台少给钱了；“-”代表多拿了平台的钱；</p>
            <p class="small lh20">2.如果不是异常账户，但冻结资金不一致；如果是产品冻结资金比账户冻结资金要多,则说明此用户当时提现没有扣款,继续拿那笔钱进行投资（建议把可用余额设置为多拿那笔钱的负数）。</p>
          </div>
        </el-col>
      </el-row> 
    </div>
  </div>
</template>
<style>
  p {
    padding: 0;
    margin: 0;
  }
  .mt20 {
    margin-top: 20px;
  }
  .pl30 {
    padding-left: 30px;
  }
  .ft14 {
    font-size: 14px;
  }
  .lh20 {
    line-height: 20px;
  }
  .grid-content {
    color: #666;
    font-size: 15px;
    line-height:30px;
    padding-left: 30px;
  }
</style>
<script>
import tablist from '@/mixins/tablist'
import cache from '@/mixins/cache'

export default {
  name: 'account-detail',
  mixins: [cache, tablist],
  data() {
    return {
      getDataUrl: '/account/showMyPurse',
      leftMoney: '',
      totalMoney: ''
    }
  }
}
</script>
