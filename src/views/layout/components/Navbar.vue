<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="slogn hidden-xs-only">后台管理系统</div>
    <div class="right-menu">
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
      <!-- <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item hidden-xs-only"></screenfull>
      </el-tooltip> -->
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
          <span class="greetings">{{greetings}}</span>
          <span class="user-name">{{userInfo.username || ''}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target='_blank' href="http://www.xinhuajindian.com">
            <el-dropdown-item>
             官网
            </el-dropdown-item>
          </a>
          <router-link to="/personal/changepassword">
            <el-dropdown-item>
             修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'

export default {
  components: {
    // ErrorLog
    // Screenfull
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    greetings() {
      const now = new Date()
      const hour = now.getHours()
      if (hour < 6) {
        return '凌晨好！'
      } else if (hour < 9) {
        return '早上好！'
      } else if (hour < 12) {
        return '上午好！'
      } else if (hour < 14) {
        return '中午好！'
      } else if (hour < 17) {
        return '下午好！'
      } else if (hour < 19) {
        return '傍晚好！'
      } else if (hour < 22) {
        return '晚上好！'
      } else {
        return '夜里好！'
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了避免错误，为了重新实例化vue-路由器对象
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  border-bottom: none; 
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .slogn{
    float: left;
    font-size: 22px;
    color: #333;
    margin-left: 5px;
    letter-spacing: 1px;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .greetings{
          font-size: 14px;
          line-height: 45px;
          display: inline-block;
          vertical-align: top;
          color: #666;
        }
        .user-name{
          line-height: 43px;
          font-size: 16px;
          color: #666;
          display: block;
          float: right;
          margin-left: 5px;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
