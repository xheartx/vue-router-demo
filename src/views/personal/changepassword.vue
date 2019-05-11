<template>
  <div class="app-container">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldpass" style="width:400px;">
        <el-input type="password" v-model="ruleForm2.oldpass"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass" style="width:400px;">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码确认" prop="checkPass" style="width:400px;">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatepass } from '@/api/login'
export default {
  name: 'changepassword',
  data() {
    const checkOldPass = (rule, value, callback) => {
      const re = /^([\d]|[\w]){6,16}$/
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else if (!re.test(value)) {
        callback(new Error('格式不正确'))
      }
      callback()
    }

    const checkNewPass = (rule, value, callback) => {
      const re = /^([\d]|[\w]){6,16}$/
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!re.test(value)) {
        callback(new Error('格式不正确')) // 格式为字母数字下划线
      }
      callback()
    }

    const checkCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (this.ruleForm2.pass !== this.ruleForm2.checkPass) {
        callback(new Error('新密码与确认密码不一致'))
      }
      callback()
    }

    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        oldpass: ''
      },
      rules2: {
        oldpass: [
          { validator: checkOldPass, trigger: 'blur' }
        ],
        pass: [
          { validator: checkNewPass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: checkCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatepass(this.ruleForm2).then(Response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 50px;
}
</style>
