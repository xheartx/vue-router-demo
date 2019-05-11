<template>
  <div class="app-container default-page">
    <img class="pic-404__parent" :src="nothing_img" alt="404">
  </div>
</template>

<script>
import nothing_img from '@/assets/nothing_image/pc_nothing.png'

export default {
  name: 'default',
  data() {
    return {
      nothing_img
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.default-page{
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    padding: 50px;
  }
}
</style>

