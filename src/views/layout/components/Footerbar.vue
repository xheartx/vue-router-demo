<template>
  <div class="footer-bar">
    <div class="content">
      <span>浙ICP备15022130</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footerbar'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.footer-bar{
  height: 25px;
  background-color: #fff;
  border-top: solid 1px #e6e6e6;
  margin-top: -1px;
  .content{
    padding: 0 20px;
    color: #666;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
  }
}
</style>