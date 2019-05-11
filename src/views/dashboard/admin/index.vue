<template>
  <div class="app-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import PanelGroup from '@/components/Chart/PanelGroup'
import LineChart from '@/components/Chart/LineChart'

const lineChartData = {
  newVisitis: {
    seriesArr: [{
      name: 'expected',
      type: 'line',
      data: [100, 120, 161, 134, 105, 160, 165]
    }, {
      name: 'actual',
      type: 'line',
      data: [120, 82, 91, 154, 162, 140, 145]
    }],
    xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    legendData: ['expected', 'actual']
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      legendData: ['expected', 'actual']
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  padding: 32px;
}
</style>
