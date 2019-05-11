<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<headerbar :class="{hideSidebar:!sidebar.opened}"></headerbar>
    <sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
      <tags-view></tags-view>
      <app-main></app-main>
      <footerbar></footerbar>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import { Headerbar, Footerbar, TagsView, Sidebar, AppMain } from './components'

export default {
  name: 'layout',
  components: {
    Headerbar,
    Footerbar,
    TagsView,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  created() {
    window.onresize = () => {
      const width = document.body.clientWidth
      if (width < 767) {
        if (this.sidebar.opened) {
          this.$store.dispatch('toggleSideBar')
        }
      } else {
        if (!this.sidebar.opened) {
          this.$store.dispatch('toggleSideBar')
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
</style>
