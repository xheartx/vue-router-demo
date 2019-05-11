<template>
  <div class="app-container small-tab">
    <div class="filter-container">
      <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" @click="handleCreate">新增</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" :max-height="500" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" :index="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" label="协议名称">
        <template slot-scope="scope">
          <span>{{scope.row.protocolTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="协议编号">
        <template slot-scope="scope">
          <span>{{scope.row.protocolNo}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间">
        <template slot-scope="scope">
          <span>{{scope.row.uploadtime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="handledelete(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align: right;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currentPage" :page-sizes="[10]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="Title[titlesign]" :visible.sync="dialogvisible" :modal-append-to-body="false">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="协议标题" prop="protocolTitle">
          <el-input v-model="form.protocolTitle"></el-input>
        </el-form-item>
        <el-form-item label="显示设置" prop="showSet">
          <el-radio-group v-model="form.showSet">
            <el-radio label="显示"></el-radio>
            <el-radio label="隐藏"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="协议编号" prop="protocolNo">
          <el-input v-model="form.protocolNo"></el-input>
        </el-form-item>
        <el-form-item label="协议内容" prop="protocolText">
          <editor id="editor_id" width="100%" :resizeType="1" v-model="form.protocolText" :content="form.protocolText" :loadStyleMode="false" @on-content-change="onContentChange"></editor>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="titlesign==='create'" type="primary" @click="submitCreateForm('form')">保存</el-button>
          <el-button v-else type="primary" @click="submitEditForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fundProtocol, deleteProtocol, createProtocol, editProtocol } from '@/api/capital'

export default {
  name: 'pay-record',
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: null,
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
      total: 0,
      dialogvisible: false,
      titlesign: '',
      Title: {
        create: '新增',
        update: '修改'
      },
      form: {
        protocolTitle: '',
        showSet: '显示',
        protocolNo: '',
        protocolText: '',
        remark: ''
      },
      rules: {
        protocolTitle: [
          { required: true, message: '协议标题不能为空', trigger: 'blur' }
        ],
        showSet: [
          { required: true, message: '请设置是否显示', trigger: 'change' }
        ],
        protocolNo: [
          { required: true, message: '协议编号不能为空', trigger: 'blur' }
        ],
        protocolText: [
          { required: true, message: '协议内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      fundProtocol(this.listQuery).then(Response => {
        this.list = Response.list
        this.total = Response.total
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    index(index) {
      return (this.listQuery.currentPage - 1) * this.listQuery.pageSize + index + 1
    },
    handledelete(row) {
      this.$confirm('此操作将永久删除该行数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProtocol({ id: row.id }).then(Response => {
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
    reset() {
      this.form = {
        protocolTitle: '',
        showSet: '显示',
        protocolNo: '',
        protocolText: '',
        remark: ''
      }
    },
    handleCreate() {
      this.titlesign = 'create'
      this.dialogvisible = true
      this.reset()
    },
    submitCreateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createProtocol(this.form).then(Response => {
            console.log(Response)
          })
        } else {
          return false
        }
      })
    },
    handleEdit(row) {
      this.titlesign = 'update'
      this.dialogvisible = true
      this.form = Object.assign({}, row)
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editProtocol(this.form).then(Response => {
            console.log(Response)
          })
        } else {
          return false
        }
      })
    },
    onContentChange(val) {
      this.form.protocolText = val
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog .el-form-item {
  width: auto;
  float: none;
  margin: 18px 1%;
}
</style>
