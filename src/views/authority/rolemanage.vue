<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="搜索名称" v-model="listQuery.title">
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
      <el-table-column width="150" align="center" label="角色名称">
        <template slot-scope="scope">
          <span>{{scope.row.roleName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.insertTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="备注" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.note}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter('type')">{{scope.row.status | statusFilter('text')}}</el-tag>
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
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="temp.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择角色状态">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限管理"  class="row">
          <el-button @click="dialogPermission = !dialogPermission">{{(temp.rolesRight && temp.rolesRight.length > 0) ? '修改权限' : '设置权限'}}</el-button>
          <span>&nbsp;&nbsp;&nbsp;已选择&nbsp;{{temp.rolesRight.length}}&nbsp;项权限</span>
        </el-form-item>
        <el-form-item label="备 注" prop="note" class="row">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" resize="none" placeholder="请输入备注信息" v-model="temp.note">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" icon="el-icon-close">关 闭</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click.prevent.stop="createData" :loading="dialogLoading" icon="el-icon-document">保 存</el-button>
        <el-button v-else type="primary" @click="updateData" :loading="dialogLoading" icon="el-icon-document">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="权限设置" :visible.sync="dialogPermission" :modal-append-to-body="false" class="dialogPermission">
      <transfer ref="transfer" v-model="temp.rolesRight" :data="permission" :titles="['权限管理', '选中权限']"></transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handlePermission(false)" icon="el-icon-close">关 闭</el-button>
        <el-button type="primary" @click="handlePermission(true)" icon="el-icon-document">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tablist from '@/mixins/tablist'
import { getPermissionList } from '@/api/authority'
import transfer from '@/components/transfer'
import { createRouter } from '@/router/addrouter'

export default {
  name: 'rolemanage',
  mixins: [tablist],
  components: {
    transfer
  },
  data() {
    return {
      importanceOptions: [1, 2, 3],
      temp: {
        id: undefined,
        rolename: '',
        insertTime: '',
        creator: '',
        note: '',
        status: 0,
        rolesRight: []
      },
      statusOptions: [{ key: 0, value: '可用' }, { key: 1, value: '禁用' }],
      dialogPermission: false,
      rules: {
        roleName: [{ required: true, message: '请填写角色名称', trigger: 'change' }],
        status: [{ required: true, message: '请选择角色状态', trigger: 'change' }]
      },
      permission: [],
      searchName: 'roleName',
      getDataUrl: '/roles/getRolesInfo',
      findDataUrl: '/roles/getRolesInfo',
      updataDataUrl: '/roles/updateRoles',
      addDataUrl: '/roles/insertRoles',
      delDataUrl: '/roles/deleteRoles'
    }
  },
  filters: {
    statusFilter(status, val) {
      const statusMap = {
        '0': {
          text: '可用',
          type: 'success'
        },
        '1': {
          text: '禁用',
          type: 'danger'
        }
      }
      return statusMap[status][val]
    },
    typeFilter(type) {
      const typeMap = {
        '-1': '超级管理员',
        '0': '管理员',
        '1': '普通用户'
      }
      return typeMap[type]
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        username: '',
        password: '',
        checkPass: '',
        userType: '',
        insertTime: '',
        department: '',
        note: '',
        userStatus: 0,
        role: '',
        rolesRight: []
      }
    },
    getPermissionList() {
      if (this.permission.length > 0) {
        return
      }
      getPermissionList(this.listQuery).then(response => {
        var data = response.permission
        this.originalPermission = data
        this.permission = createRouter(data, 'permission')
      })
    },
    handleCreate() {
      this.dialogCreate()
      this.getPermissionList()
    },
    createDataBefore() {
      this.temp.modulIds = this.getModulIds(this.temp.rolesRight, this.originalPermission)
    },
    handleUpdate(item) {
      this.resetTemp()
      const row = item || this.judgeSelection()
      if (row) {
        this.temp = Object.assign({}, row)
        this.formVisible()
        this.getPermissionList()
      }
    },
    updateDataBefore() {
      this.temp.modulIds = this.getModulIds(this.temp.rolesRight, this.originalPermission)
    },
    handlePermission(type) {
      this.dialogPermission = false
      console.log(this.temp)
      if (type) {
        this.$refs.transfer.save()
      } else {
        this.$refs.transfer.close()
      }
    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.temp.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    getModulIds(ids, lists) {
      let arr = [...ids]
      ids.forEach((id) => {
        getId(id)
        getPId(id)
      })
      function getId(id) {
        lists.find((item) => {
          if (item.parentId === id) {
            arr.push(item.id)
            getId(item.id)
          }
        })
      }
      function getPId(id) {
        lists.find((item) => {
          if (item.id === id) {
            if (item.parentId !== 0) {
              arr.push(item.parentId)
            }
            getPId(item.parentId)
          }
        })
      }
      arr = [...new Set(arr)]
      return arr.toString()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dialogPermission {
  .el-dialog{
    width: 50%;
    height: 50%;
    max-width: 60%;
    .el-dialog__body{
      height: 100%;
      background: #fff;
    }
    .el-dialog__footer{
      background-color: #fff;
    }
  }
}
</style>
