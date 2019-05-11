<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!-- <h2 class="title">{{title}}</h2> -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item) in levelList" :key="item.path" v-if='item.meta.title'>
        <!-- <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link> -->
        <span class="no-redirect">{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      levelList: null
    }
  },
  created() {
    this.getBreadcrumb()
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      matched = [{ path: '/index', redirect: 'noredirect', meta: { title: '我的位置' }}].concat(matched)
      // const first = matched[0]
      // if (first && first.name !== 'dashboard') {
      // matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      // }
      this.levelList = matched
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: block;
    font-size: 14px;
    padding-left: 15px;
    padding-top: 15px;
    // line-height: 50px;
    // border-bottom: 1px solid #e7eaec;
    .title{
      font-size: 24px;
      font-weight: 300;
      margin-top: 20px;
      margin-bottom: -2px;
      line-height: 1.1;
      color: #333;
    }
    .el-breadcrumb__inner{
      a{
        color: #666;
      }
    }
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>