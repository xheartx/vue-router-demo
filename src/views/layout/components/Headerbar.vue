<template>
  <div class="header-bar">
    <div class="logo-content">
      LOGO
    </div>
    <div class="right-content">
      <navbar class="navbar-wrapper"></navbar>
    </div>
  </div>
</template>

<script>
import { Navbar } from '../components'
export default {
  name: 'Headerbar',
  components: {
    Navbar
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header-bar{
  height: 80px;
  display: flex;
  background-color: #fff;
  transition: all 0.28s;
  position: relative;
  z-index: 1005;
  &.hideSidebar{
    height: 50px;
    .logo-content{
      width: 100px;
      padding: 5px;
      margin: 0 5px;
    }
    .right-content{
      h1{
        line-height: 50px;
        font-size: 20px;
      }
    }
  }
  .logo-content{
    margin: 0 10px;
    padding: 10px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.28s;
    img{
      width: 100%;
      height: auto;
    }
  }
  .right-content{
    position: relative;
    flex: 1;
    .navbar-wrapper{
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>