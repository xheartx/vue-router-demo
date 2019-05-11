<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="fl">
        <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="搜索用户名" v-model="listQuery.title">
        </el-input>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
      <!-- <el-button class="filter-item" size="small" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading"  @selection-change="handleSelectionChange" element-loading-text="加载中" :max-height="tableHeight" border fit highlight-current-row
      style="width: 100%">
      <!-- <el-table-column type="selection" width="40" align="center">
      </el-table-column> -->
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="65">
      <!-- <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template> -->
      </el-table-column>
      <el-table-column width="100" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="用户类型">
        <template slot-scope="scope">
          <span>{{scope.row.userType}}</span>
          <!-- <span>{{scope.row.userType | typeFilter}}</span> -->
        </template>
      </el-table-column>
      <el-table-column width="110" align="center" label="用户角色">
        <template slot-scope="scope">
          <span> {{scope.row.userRoles}} </span>
          <!-- <span> {{filterRole(scope.row.roles)}} </span> -->
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="所属部门">
        <template slot-scope="scope">
          <span>{{scope.row.department}}</span>
          <!-- <span>{{departmentList[scope.row.deptId]}}</span> -->
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.insertTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.note}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.userStatus | statusFilter('type')">{{scope.row.userStatus | statusFilter('text')}}</el-tag>
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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="userType">
          <el-select class="filter-item" v-model="temp.userTypeId" placeholder="请选择用户类型">
            <el-option v-for="item in typeOptions" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" auto-complete="off" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="temp.checkPass" placeholder="请确认密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="rolesIds">
          <el-select class="filter-item" v-model="temp.rolesId" placeholder="请选择角色">
          <!-- <el-select class="filter-item" multiple collapse-tags v-model="temp.rolesIds" placeholder="请选择角色"> -->
            <el-option v-for="item in roleOptions" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId">
          <el-select class="filter-item" v-model="temp.departmentId" placeholder="请选择所属部门">
            <el-option v-for="item in departmentOptions" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="userStatus">
          <el-select class="filter-item" v-model="temp.userStatus" placeholder="请选择用户状态">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备 注" prop="note">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" resize="none" placeholder="请输入备注信息" v-model="temp.note">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" icon="el-icon-close">关 闭</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" icon="el-icon-document" :loading="dialogLoading">保 存</el-button>
        <el-button v-else type="primary" @click="updateData" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tablist from '@/mixins/tablist'
import { getUserOption } from '@/api/authority'
import { parseTime } from '@/utils'
import { userType } from '@/config/variable'
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'usermanage',
  mixins: [tablist],
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    return {
      temp: {
        id: undefined,
        userName: '',
        password: '',
        checkPass: '',
        userType: '',
        userTypeId: '',
        insertTime: '',
        depId: '',
        note: '',
        rolesIds: [],
        userStatus: 0,
        userOption: undefined
      },
      typeOptions: [{ key: userType.SuperAdmin, value: '超级管理员' }, { key: userType.Admin, value: '管理员' }, { key: userType.User, value: '普通用户' }],
      departmentOptions: [{ key: userType.SuperAdmin, value: '技术部' }, { key: userType.Admin, value: '产品部' }, { key: userType.User, value: '运营部' }],
      statusOptions: [{ key: 0, value: '可用' }, { key: 1, value: '禁用' }],
      textMap: {
        update: '修改',
        create: '新增'
      },
      departmentList: {
        0: '技术部',
        5: '技术部'
      },
      rules: {
        userName: [{ required: true, message: '请输入正确的用户名', trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, message: '请填写密码', trigger: 'change' }],
        checkPass: [{ required: true, validator: this.validatePass, trigger: 'blur' }],
        userTypeId: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
        userStatus: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
        department: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
        rolesId: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
      },
      userOption: {
        update: [],
        create: []
      },
      rolseList: [],
      searchName: 'username',
      getDataUrl: '/userAdmin/findUserAdminList',
      findDataUrl: '/userAdmin/findUserAdminList',
      updataDataUrl: '/userAdmin/updateUsersAdmin',
      addDataUrl: '/userAdmin/insertUserAdmin',
      delDataUrl: '/userAdmin/deleteUsersAdmin'
    }
  },
  filters: {
    statusFilter(status, val) {
      const statusMap = {
        0: {
          text: '可用',
          type: 'success'
        },
        1: {
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
  computed: {
    roleOptions() {
      return this.userOption[this.dialogStatus]
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        userName: '',
        password: '',
        checkPass: '',
        userType: '',
        userTypeId: '',
        insertTime: '',
        department: '',
        note: '',
        userStatus: 0,
        rolesIds: []
      }
    },
    getUserOption(data) {
      return getUserOption(data ? { userId: data.id } : {}).then(response => {
        var res = response
        this.rolseList = res.roles
        this.userOption[this.dialogStatus] = res.roles.map((item) => {
          return {
            key: item.id,
            value: item.roleName
          }
        })
        this.departmentOptions = res.departments.map((item) => {
          return {
            key: item.id,
            value: item.departmentName
          }
        })
        this.typeOptions = res.types.map((item) => {
          return {
            key: item.id,
            value: item.typeName
          }
        })
      })
    },
    handleCreate() {
      this.dialogCreate(() => {
        if (this.userOption[this.dialogStatus].length === 0) {
          this.getUserOption()
        }
      })
    },
    createDataBefore() {
      this.temp.rolesId = this.temp.rolesIds.toString()
    },
    handleUpdate(item) {
      this.resetTemp()
      const row = item || this.judgeSelection()
      if (row) {
        this.temp = Object.assign({
          rolesIds: []
        }, row) // copy obj
        console.log(this.temp)
        this.temp.checkPass = this.temp.password
        this.getUserOption(this.temp)
        // this.getUserOption(this.temp).then(() => {
        //   this.temp.roles.forEach(item => {
        //     if (item) {
        //       this.temp.rolesIds.push(item.id)
        //     }
        //   })
        // })
        this.formVisible()
      }
    },
    updateDataBefore() {
      this.temp.rolesId = this.temp.rolesIds.toString()
      this.temp.roles = []
      console.log(this.temp.rolesId)
      this.rolseList.forEach(item => {
        this.temp.rolesIds.forEach(id => {
          if (item.id === id) {
            this.temp.roles.push(item)
          }
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const data = this.formatJson(filterVal, this.list)
      //   excel.export_json_to_excel(tHeader, data, 'table-list')
      //   this.downloadLoading = false
      // })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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
    filterRole(list) {
      const arr = []
      if (list) {
        list.forEach(item => {
          if (item) {
            arr.push(item.roleName)
          }
        })
        return arr.join(', ')
      } else {
        return ''
      }
    }
  }
}
</script>
