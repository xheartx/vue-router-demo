export default {
  data() {
    return {
      listQuery: {}
    }
  },
  watch: {
    $route() {
      if (this.$route.name === this.$options.name) {
        if (this.$route.query) {
          this.init()
        }
      }
    }
  },
  mounted() {
    if (!this.isCache) {
      this.init()
    }
  },
  methods: {
    init() {
      const query = this.$route.query
      const keys = Object.keys(query)
      keys.forEach(key => {
        this.listQuery[key] = query[key]
      })
      this.getList()
    },
    getList() {
    }
  }
}
