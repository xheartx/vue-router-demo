<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // /* globals globalCons*/
    // if (globalCons.url) {
    //   var url = globalCons.url
    //   console.log(url)
    //   this.$router.push({ path: url })
    // }
  }
}
</script>
