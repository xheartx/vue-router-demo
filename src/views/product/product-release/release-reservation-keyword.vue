<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="搜索关键字" v-model="listQuery.title">
        </el-input>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click.prevent.stop="handleCreate" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
      <!-- <el-button class="filter-item" size="small" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" @selection-change="handleSelectionChange" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <!-- <el-table-column type="selection" width="40" align="center">
      </el-table-column> -->
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="65">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template> -->
      </el-table-column>
      <el-table-column align="center" label="关键字">
        <template slot-scope="scope">
          <span>{{scope.row.keyword}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.state ? '已启动' : '未启动'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="插入时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.insertTime}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="修改时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button class="filter-item" size="small" @click="handleUpdate(scope.row)" type="warning">修改</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDelete(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align: right;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="80px">
        <el-form-item label="关键字" prop="roleName" class="row">
          <el-input v-model="temp.keyword" placeholder="关键字"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select class="filter-item" v-model="temp.type" placeholder="请选择类型">
            <el-option v-for="item in typeOptions" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="temp.state">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" icon="el-icon-close">关 闭</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click.prevent.stop="createData" :loading="dialogLoading" icon="el-icon-document">保 存</el-button>
        <el-button v-else type="primary" @click="updateData" :loading="dialogLoading" icon="el-icon-document">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tablist from '@/mixins/tablist'

export default {
  name: 'release-reservation-keyword',
  mixins: [tablist],
  data() {
    return {
      temp: {
        id: undefined,
        keyword: '',
        type: '默认',
        state: true
      },
      typeOptions: [{ key: '默认', value: '默认' }],
      rules: {
        keyword: [{ required: true, message: '请填写关键字', trigger: 'change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }]
      },
      getDataUrl: '/product/releaseReservationKeyword',
      findDataUrl: '/product/releaseReservationKeyword',
      updataDataUrl: '/product/updateReleaseReservationKeyword',
      addDataUrl: '/product/insertReleaseReservationKeyword',
      delDataUrl: '/product/deleteReleaseReservationKeyword'
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        keyword: '',
        type: '默认',
        state: true
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
