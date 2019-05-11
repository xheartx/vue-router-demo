<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="搜索名称" v-model="listQuery.title">
        </el-input>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
      <!-- <el-button class="filter-item" size="small" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" @selection-change="handleSelectionChange" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <!-- <el-table-column type="selection" width="40" align="center">
      </el-table-column> -->
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="65">
      </el-table-column>
      <el-table-column width="150" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.modulName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="排序">
        <template slot-scope="scope">
          <span>{{scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type | typeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="父节点">
        <template slot-scope="scope">
          <span>{{allParentsObj[scope.row.parentId] || '无'}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="路径">
        <template slot-scope="scope">
          <span>{{scope.row.modulPath}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="备注"  width="150">
        <template slot-scope="scope">
          <span>{{scope.row.note}}</span>
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
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="70px">
        <el-form-item label="名称" prop="modulName" class="row">
          <el-input v-model="temp.modulName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="temp.sort" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input-number v-model="temp.type" size="medium" placeholder="请选择类型" :min="1" :max="typeMax"></el-input-number>
        </el-form-item>
        <el-form-item label="父节点" prop="parentId" v-if="temp.type != 1">
          <el-select class="filter-item" v-model="temp.parentId" placeholder="请选择父节点">
            <el-option v-for="item in allParents[temp.type - 1]" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="路径" prop="modulPath" :class="temp.type != 1 ? '' : 'row'">
        <!-- <el-form-item label="路径" prop="modulPath" v-if="temp.type != 1"> -->
          <el-input v-model="temp.modulPath" placeholder="请输入路径"></el-input>
        </el-form-item>
        <el-form-item label="备 注" prop="note" class="row">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" resize="none" placeholder="请输入备注信息" v-model="temp.note">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" :loading="dialogLoading">确 定</el-button>
        <el-button v-else type="primary" @click="updateData" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tablist from '@/mixins/tablist'
import { getModulInfoAll } from '@/api/authority'
import { toZhDigit } from '@/assets/js/toZhDigit'
import { mapActions } from 'vuex'

export default {
  name: 'menumanage',
  mixins: [tablist],
  data() {
    return {
      temp: {
        id: undefined,
        modulName: '',
        type: '',
        modulPath: '',
        parentId: '',
        note: '',
        sort: ''
      },
      rules: {
        modulName: [{ required: true, message: '请填写菜单名称', trigger: 'change' }],
        type: [{ type: 'number', required: true, message: '请选择菜单类型', trigger: 'change' }],
        modulPath: [{ required: true, message: '请填写菜单路径', trigger: 'change' }],
        parentId: [{ required: true, message: '选择父节点', trigger: 'change' }],
        sort: [{ required: true, message: '输入排序', trigger: 'change' }]
      },
      typeOptions: [{ key: 1, value: '超级管理员' }, { key: 2, value: '管理员' }, { key: 3, value: '普通用户' }],
      allParents: [],
      allParentsObj: {},
      typeMax: 3,
      searchName: 'modulName',
      getDataUrl: '/modul/getModulInfo',
      findDataUrl: '/modul/getModulInfo',
      updataDataUrl: '/modul/updateModul',
      addDataUrl: '/modul/insertModulInfo',
      delDataUrl: '/modul/deleteModul'
    }
  },
  filters: {
    typeFilter(type) {
      return toZhDigit(type) + '级菜单'
    }
  },
  created() {
    this.getParentsList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        modulName: '',
        type: '',
        modulPath: '',
        parentId: '',
        note: '',
        sort: ''
      }
    },
    getParentsList() {
      getModulInfoAll(this.listQuery).then(response => {
        var data = response
        var list = {}
        var typeArr = new Set()
        data.map((item) => {
          this.allParentsObj[item.id] = item.modulName
          typeArr.add(item.type)
          if (!list[item.type]) {
            list[item.type] = []
          }
          list[item.type].push({
            id: item.id,
            name: item.modulName
          })
        })
        this.allParents = list
        this.typeMax = Object.getOwnPropertyNames(list).length
      })
    },
    findParentName(id) {
      if (!this.allParents) {
        return ''
      }
      this.allParents.find((item) => {
        if (item.id === id) {
          return item.name
        }
        return ''
      })
    },
    createDataAfter() {
      this.updateRoutes()
    },
    updateDataAfter() {
      this.updateRoutes()
    },
    ...mapActions({
      updateRoutes: 'updateRoutes'
    })
  }
}
</script>
