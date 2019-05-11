import { getData, findData, addData, updateData, delData } from '@/api/common'

export default {
  data() {
    return {
      temp: {
        id: undefined
      },
      tableKey: 0,
      list: [],
      total: 1,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        limit: 10,
        title: undefined,
        type: undefined,
        filter: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      downloadLoading: false,
      dialogLoading: false,
      isCache: true,
      multipleSelection: '',
      searchName: '',
      getDataUrl: '',
      findDataUrl: '',
      updataDataUrl: '',
      addDataUrl: '',
      delDataUrl: ''
    }
  },
  computed: {
    tableHeight() {
      return document.body.clientHeight - (this.$store.getters.sidebar.opened ? 80 : 50) - 235
    }
  },
  mounted() {
    if (this.searchName) {
      this.listQuery[this.searchName] = ''
    }
    const query = this.$route.query
    const keys = Object.keys(query)
    if (keys.length !== 0) {
      this.listQuery.title = query[keys[0]]
      keys.forEach(key => {
        this.listQuery[key] = query[key]
      })
    }
    this.getList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined
      }
    },
    sequenceNumber(index) {
      return (this.listQuery.pageNum - 1) * this.listQuery.limit + index + 1
    },
    getList() {
      this.listLoading = true
      if (this.searchName && this.listQuery.title) {
        this.listQuery[this.searchName] = this.listQuery.title
        this.listQuery.pageNum = 1
      }
      getData(this.getDataUrl, this.listQuery).then(response => {
        let data = {
          list: [],
          total: 0
        }
        data = response
        // for (const key in response) {
        //   if (typeof response[key] === 'object') {
        //     data = response[key]
        //   }
        // }
        this.list = data.list
        this.total = data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    findList(name) {
      this.listLoading = true
      let data = {}
      if (name) {
        data[name] = this.listQuery.title
      } else {
        data = this.listQuery
      }
      findData(this.findDataUrl, data).then(response => {
        console.log(response)
        let data = {
          rows: [],
          rowCount: 1
        }
        for (const key in response) {
          if (typeof response[key] === 'object') {
            data = response[key]
          }
        }
        if (data.rows) {
          this.list = data.rows
          this.total = data.rowCount
        } else {
          if (Array.isArray(data)) {
            this.list = data
          } else {
            this.list = [data]
          }
        }
        this.total = 1
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    createDataBefore() {},
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.createDataBefore()
          this.addItem()
        }
      })
    },
    createDataAfter() {},
    addItem() {
      this.dialogLoading = true
      addData(this.addDataUrl, this.temp).then((res) => {
        // 添加操作
        this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.listQuery.page = 1
        this.getList()
        this.dialogLoading = false
        this.createDataAfter()
      }).catch(() => {
        this.dialogFormVisible = false
        this.dialogLoading = false
      })
    },
    updateDataBefore() {},
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.updateDataBefore()
          this.updateItem()
        }
      })
    },
    updateDataAfter() {},
    updateItem() {
      this.dialogLoading = true
      const tempData = Object.assign({}, this.temp)
      updateData(this.updataDataUrl, tempData).then(() => {
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        this.dialogFormVisible = false
        this.dialogLoading = false
        this.resetTemp()
        this.updateDataAfter()
      }).catch(() => {
        this.dialogFormVisible = false
        this.dialogLoading = false
        this.resetTemp()
      })
    },
    delItems(rows) {
      const ids = []
      rows.forEach((row) => {
        ids.push(row.id)
      })
      delData(this.delDataUrl, { ids: ids.toString() }).then(() => {
        // 删除操作
        rows.forEach((row) => {
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
        this.total -= 1
        this.$notify({
          title: '提示',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$notify({
          title: '提示',
          message: '已取消删除',
          type: 'info',
          duration: 2000
        })
      })
    },
    handleFilter(key, value) {
      this.listQuery.pageNum = 1
      if (key) {
        this.listQuery[key] = value
      }
      this.getList()
      // this.findList(name)
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCreate() {
      this.dialogCreate()
    },
    handleUpdate(item) {
      this.resetTemp()
      const row = item || this.judgeSelection()
      if (row) {
        this.temp = Object.assign({}, row) // copy obj
        this.formVisible()
      }
    },
    handleDelete(item) {
      const rows = item ? [item] : this.multipleSelection
      if (!rows || rows.length === 0) {
        this.$notify({
          title: '提示',
          message: '请先选择删除项目',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.$confirm('此操作将删除选中内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delItems(rows)
      })
    },
    dialogCreate(cb) {
      cb = cb || function() {}
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      cb()
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    judgeSelection() {
      const rows = this.multipleSelection
      if (!rows || rows.length === 0) {
        this.$notify({
          title: '提示',
          message: '请先选择修改内容',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      if (rows.length > 1) {
        this.$notify({
          title: '提示',
          message: '只能选择一项修改',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      return rows[0]
    },
    formVisible() {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDownload() {
      this.downloadLoading = true
      setTimeout(() => {
        this.downloadLoading = false
      }, 3000)
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const data = this.formatJson(filterVal, this.list)
      //   excel.export_json_to_excel(tHeader, data, 'table-list')
      //   this.downloadLoading = false
      // })
    }
  }
}
