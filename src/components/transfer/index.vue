<template>
  <div class="transfer-wrapper">
    <div class="left-transfer transfer-item">
      <div class="transfer-item-title">{{titles[0]}}</div>
      <div class="el-tree-wrapper">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          accordion
          ref="leftTransfer"
          @check-change="onSourceCheckedChange"
          :default-checked-keys="value"
          :default-expanded-keys="[]"
          empty-text="暂无权限"
          :props="props">
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transfer',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    titles: {
      type: Array,
      default() {
        return []
      }
    },
    buttonTexts: {
      type: Array,
      default() {
        return []
      }
    },
    leftDefaultChecked: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    },
    format: {
      type: Object,
      default() {
        return {}
      }
    },
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          label: 'modulName',
          key: 'id',
          children: 'children',
          disabled: 'disabled'
        }
      }
    }
  },

  data() {
    return {
      leftChecked: [],
      targetData: [],
      expandedKeys: []
    }
  },

  computed: {
  },

  watch: {
    value(val) {
      // this.dispatch('ElFormItem', 'el.form.change', val)
    }
  },
  created() {
  },
  methods: {
    onSourceCheckedChange(data, checked) {
      if (checked) {
        this.leftChecked.push(data)
        this.leftChecked = this.sort(this.leftChecked)
      } else {
        this.del(this.leftChecked, data)
      }
    },
    sort(arr) {
      arr.sort((a, b) => {
        return (a.sort - b.sort)
      })
      return arr
    },
    del(arr, item) {
      const index = arr.indexOf(item)
      if (index > -1) {
        arr.splice(index, 1)
      }
    },
    getPartent(arr, data) {
      const packData = [data]

      forEachData(arr, data)

      function forEachData(a, d) {
        a.find(item => {
          if (item.id === d.parentId) {
            packData.push(item)
            if (item.parentId && item.type > 1) {
              forEachData(a, item)
            }
          }
        })
      }

      for (let i = packData.length - 1; i > 0; i--) {
        packData[i].children = [packData[i - 1]]
      }
      packData.forEach((item) => {
        this.expandedKeys.push(item.id)
      })
      this.expandedKeys = [...new Set(this.expandedKeys)]
      return packData[packData.length - 1]
    },
    mergeData(list, data) {
      return false
    },
    save() {
      // const currentValue = this.leftChecked.slice()
      // const permission = []
      // currentValue.forEach(item => {
      //   permission.push(item.id)
      // })
      const permission = this.$refs.leftTransfer.getCheckedKeys()
      this.$emit('input', permission)
      this.$refs.leftTransfer.setCheckedKeys([])
    },
    close() {
      this.$refs.leftTransfer.setCheckedKeys(this.value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.transfer-wrapper{
  padding: 20px;
  text-align: center;
  height: 100%;
  .transfer-item{
    border: 1px solid #ebeef5;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    display: inline-block;
    vertical-align: middle;
    width: auto;
    min-width: 100%;
    height: 100%;
    max-height: 100%;
    text-align: left;
    box-sizing: border-box;
    position: relative;
    .el-tree-wrapper{
      height: calc(100% - 40px);
      overflow: auto;
    }
    & > .transfer-item-title{
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding-left: 15px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
    }
    .el-tree-node__label{
      // font-size: 16px;
    }
  }
}
</style>
