<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item of typeList" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component v-bind:is="activeName"></component>
    </keep-alive>
  </div>
</template>

<script>
  import releaseReservationProduct from './release-reservation-product'
  import releaseTimingReservationProduct from './release-timing-reservation-product'
  import releaseDepositReservationProduct from './release-deposit-reservation-product'
  import releaseDepositTimingReservationProduct from './release-deposit-timing-reservation-product'
  export default {
    name: 'release-product',
    components: {
      releaseReservationProduct,
      releaseTimingReservationProduct,
      releaseDepositReservationProduct,
      releaseDepositTimingReservationProduct
    },
    data() {
      return {
        activeName: 'releaseDepositReservationProduct',
        typeList: [{
          label: '发布存管预约产品',
          name: 'releaseDepositReservationProduct'
        }, {
          label: '发布存管定时预约产品',
          name: 'releaseDepositTimingReservationProduct'
        }, {
          label: '发布预约常规产品',
          name: 'releaseReservationProduct'
        }, {
          label: '发布定时预约常规产品',
          name: 'releaseTimingReservationProduct'
        }]
      }
    },
    computed: {
    },
    created() {
    },
    methods: {
      handleClick(tab) {
        console.log(tab.name)
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
