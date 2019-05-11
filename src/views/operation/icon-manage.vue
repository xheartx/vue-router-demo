<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter('model')" style="width: 200px;" class="filter-item" placeholder="模块名" v-model="listQuery.searchName">
        </el-input>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleUpdate" type="warning" icon="el-icon-edit-outline">修改</el-button>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDelete" type="danger" icon="el-icon-delete">删除</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="tableHeight" border
      fit highlight-current-row style="width: 100%">
      <el-table-column type="selection" width="40" align="center">
      </el-table-column>
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="50">
      </el-table-column>
      <el-table-column width="50" align="center" label="顺序号">
        <template slot-scope="scope">
          <span>{{scope.row.SN}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="图标名">
        <template slot-scope="scope">
          <span>{{scope.row.iconName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="220" align="center" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.iconUrl" />
        </template>
      </el-table-column>
      <el-table-column width="230" align="center" label="图标URL">
        <template slot-scope="scope">
          <span>{{scope.row.iconUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图标模块" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.iconModel|modelfilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否可点击" min-width="60">
        <template slot-scope="scope">
          <span>{{scope.row.clickable|clickfilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="不可点击提示信息" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.unclickableHint}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否停用" min-width="50">
        <template slot-scope="scope">
          <span>{{scope.row.wStop|clickfilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否H5" min-width="50">
        <template slot-scope="scope">
          <span>{{scope.row.wH5|clickfilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="H5地址" min-width="230">
        <template slot-scope="scope">
          <span>{{scope.row.h5Url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否需要登录" min-width="50">
        <template slot-scope="scope">
          <span>{{scope.row.wLogin|clickfilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人" min-width="60">
        <template slot-scope="scope">
          <span>{{scope.row.creater}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间" min-width="220">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改人" min-width="60">
        <template slot-scope="scope">
          <span>{{scope.row.modifier}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" min-width="220">
        <template slot-scope="scope">
          <span>{{scope.row.modifTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.describle}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="text-align: right;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import tablist from '@/mixins/tablist'

  export default {
    name: 'capital-flow',
    mixins: [tablist],
    data() {
      return {
        getDataUrl: '/iconManage',
        findDataUrl: '/iconManage'
      }
    },
    filters: {
      clickfilter(type) {
        const typeMap = {

          '0': '否',
          '1': '是'
        }
        return typeMap[type]
      },
      modelfilter(val) {
        const iconMap = {

          '0': '首页',
          '1': '发现'
        }
        return iconMap[val]
      }
    }
  }

</script>
