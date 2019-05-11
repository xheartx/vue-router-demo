<template>
  <section class="app-main" style="min-height: calc(100% - 59px)" :class="{grayBg: !showBreadcrumb}">
    <breadcrumb class="breadcrumb-container" ref="breadcrumb"></breadcrumb>
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    showBreadcrumb() {
      if (this.$route.name === 'dashboard') {
        return false
      }
      return true
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  watch: {
    $route() {
      this.$refs.breadcrumb && this.$refs.breadcrumb.getBreadcrumb()
    }
  },
  methods: {
  }
}
</script>
