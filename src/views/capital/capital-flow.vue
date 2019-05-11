<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="fl">
        <el-input style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.userName" clearable>
        </el-input>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row style="width: 100%">
      <!-- <el-table-column type="selection" width="40" align="center">
      </el-table-column> -->
      <el-table-column align="center" type="index" :index="changeindex" label="序号" width="100">
      </el-table-column>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="交易金额（元）">
        <template slot-scope="scope">
          <span>{{scope.row.trsAmout}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="交易类型">
        <template slot-scope="scope">
          <span>{{scope.row.trsType}}</span>
        </template>
      </el-table-column>
      <el-table-column width="220" align="center" label="记录产生时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户余额（元）" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.balance}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" min-width="300">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleUpdate(scope.row)" type="warning" icon="el-icon-edit-outline">修改</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="text-align: right;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum" :page-sizes="[10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="Title[sign]" :visible.sync="dialogVisible" :modal-append-to-body="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="交易类型" prop="trsType">
          <el-select v-model="ruleForm.trsType" placeholder="请选择交易类型">
            <el-option label="支付宝" value="支付宝"></el-option>
            <el-option label="余额宝" value="余额宝"></el-option>
            <el-option label="微信" value="微信"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="记录产生时间" prop="createTime">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.createTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="交易金额" prop="trsAmout">
          <el-input type="number" v-model="ruleForm.trsAmout"></el-input>
        </el-form-item>
        <el-form-item label="账户余额" prop="balance">
          <el-input type="number" v-model="ruleForm.balance"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="sign==='create'" type="primary" @click="submitCreate">立即创建</el-button>
          <el-button v-else type="primary" @click="submitEdit">确定修改</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchMoneyRecord, addMoneyRecord, deleteMoneyRecord, editMoneyRecord } from '@/api/capital'
export default {
  name: 'capital-flow',
  data() {
    return {
      listQuery: {
        userName: '',
        pageNum: 1,
        limit: 10
      },
      Title: {
        create: '新增',
        update: '修改'
      },
      tableKey: 0,
      dialogVisible: false,
      sign: '',
      list: null,
      listLoading: false,
      total: 0,
      ruleForm: {
        userName: '',
        trsAmout: 0,
        trsType: '',
        createTime: '',
        balance: 0,
        remark: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        trsType: [
          { required: true, message: '请选择交易类型', trigger: 'change' }
        ],
        createTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        balance: [
          { required: true, message: '请输入余额', trigger: 'blur' }
        ],
        trsAmout: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      fetchMoneyRecord(this.listQuery).then(Response => {
        this.list = Response.list
        this.total = Response.total
      })
    },
    changeindex(index) {
      return (this.listQuery.pageNum - 1) * this.listQuery.limit + index + 1
    },
    resetruleForm() {
      this.ruleForm = {
        userName: '',
        trsAmout: 0,
        trsType: '',
        createTime: '',
        balance: 0,
        remark: ''
      }
    },
    handleCreate() {
      this.dialogVisible = true
      this.sign = 'create'
      this.resetruleForm()
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    submitCreate() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          addMoneyRecord(this.ruleForm).then(Response => {
            this.list.unshift(this.ruleForm)
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          })
        } else {
          return false
        }
      })
    },
    handleUpdate(row) {
      this.dialogVisible = true
      this.sign = 'update'
      this.ruleForm = row
      this.ruleForm.id = row.id
    },
    submitEdit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          editMoneyRecord(this.ruleForm).then(Response => {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
        } else {
          return false
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该行数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMoneyRecord({ id: row.id }).then(Response => {
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleFilter() {
      const name = this.listQuery.userName
      const searchlist = []
      this.list.forEach(element => {
        if (name === element.userName) {
          searchlist.push(element)
          this.list = searchlist
        }
        if (name === '') {
          this.getList()
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    }
  }
}

</script>
