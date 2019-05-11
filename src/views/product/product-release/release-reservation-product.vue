<template>
  <div class="app-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <div class="createPost-main-container">
        <el-row :gutter="gutter">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-tooltip class="item" effect="dark" content="目前已发布 196 个产品(含新手专享和预约中的产品)" placement="top">
              <el-form-item label-width="130px" label="产品名称:" prop="shopName" class="postInfo-container-item">
                <el-input v-model="postForm.shopName"></el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="标的类型:" prop="bType" class="postInfo-container-item">
              <el-select v-model="postForm.bType">
                <el-option v-for="item in productTypeOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="借款企业:" prop="borVenture" class="postInfo-container-item">
              <el-input v-model="postForm.borVenture"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="证件号:" prop="idNumber" class="postInfo-container-item">
              <el-input v-model="postForm.idNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="发起联系人电话:" prop="fNumber" class="postInfo-container-item">
              <el-input v-model="postForm.fNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="发起联系人地址:" prop="fAddress" class="postInfo-container-item">
              <el-input v-model="postForm.fAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-tooltip class="item" effect="dark" content="新手标的投资类别是货押宝" placement="top">
              <el-form-item label-width="130px" label="投资类别:" prop="investCategoary" class="postInfo-container-item">
                <el-select v-model="postForm.investCategoary" placeholder="请选择投资类别">
                  <el-option v-for="item in investTypeOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-tooltip>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="推荐产品:" prop="recommend" class="postInfo-container-item">
              <el-select v-model="postForm.recommend">
                <el-option v-for="item in boolerOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="常规产品类型:" prop="cType" class="postInfo-container-item">
              <el-select v-model="postForm.cType">
                <el-option v-for="item in cgcpTypeOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-tooltip class="item" effect="dark" content="时间类型要与理财期限相对应" placement="top">
              <el-form-item label-width="130px" label="常规产品时间类型:" prop="ctType" class="postInfo-container-item">
                <el-select v-model="postForm.ctType" placeholder="请选择投资类别">
                  <el-option v-for="item in qxTypeOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-tooltip>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="奖励产品:" prop="rewardProduct" class="postInfo-container-item">
              <el-select v-model="postForm.rewardProduct">
                <el-option v-for="item in boolerOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="放置模块:" prop="setModel" class="postInfo-container-item">
              <el-select v-model="postForm.setModel">
                <el-option v-for="item in moduleOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="项目总额:" prop="totalProduct" class="postInfo-container-item">
              <el-input v-model="postForm.totalProduct">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="起投金额:" prop="sueAmount" class="postInfo-container-item">
              <el-input v-model="postForm.sueAmount">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="年化收益率:" prop="annual" class="postInfo-container-item">
              <el-input v-model="postForm.annual">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="基础年化收益率:" prop="basicsAnnual" class="postInfo-container-item">
              <el-input v-model="postForm.basicsAnnual">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="额外年化收益率:" prop="extraAnnual" class="postInfo-container-item">
              <el-input v-model="postForm.extraAnnual">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="奖励收益:" prop="award" class="postInfo-container-item">
              <el-input v-model="postForm.award">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="总收益:" class="postInfo-container-item">
              <el-input v-model="postForm.total">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="还款方式:" prop="repayment" class="postInfo-container-item">
              <el-select v-model="postForm.repayment">
                <el-option v-for="item in payInterestWayOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="起息日:" prop="valueDate" class="postInfo-container-item">
              <el-select v-model="postForm.valueDate">
                <el-option v-for="item in calcInterestWayOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="活动时间:" prop="activityTime" class="postInfo-container-item">
              <el-date-picker type="date" placeholder="选择日期" v-model="postForm.activityTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="理财期限:" prop="financialPeriod" class="postInfo-container-item">
              <el-input v-model="postForm.financialPeriod">
                <span slot="suffix">天</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="活动标语:" prop="slogan" class="postInfo-container-item">
              <el-input v-model="postForm.slogan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="手机活动链接:" prop="phoneUrl" class="postInfo-container-item">
              <el-input v-model="postForm.phoneUrl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="网站活动链接:" prop="webUrl" class="postInfo-container-item">
              <el-input v-model="postForm.webUrl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="产品标签:" prop="pLabel" class="postInfo-container-item">
              <el-input v-model="postForm.pLabel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="借款用途:" prop="purpose" class="postInfo-container-item">
              <el-input v-model="postForm.purpose"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="标的活动名称:" prop="bName" class="postInfo-container-item">
              <el-input v-model="postForm.bName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label-width="130px" label="标的活动颜色:" prop="bColor" class="postInfo-container-item">
              <el-input v-model="postForm.bColor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="gutter">
          <div class="editor-item">
            <span class="el-form-item__label editor-label">借款人信息:</span>
            <div class="editor-container">
              <editor name="bMessage" :gutter="gutter" class="editor-item-el"></editor>
            </div>
          </div>
          <div class="editor-item">
            <span class="el-form-item__label editor-label">还款来源:</span>
            <div class="editor-container">
              <editor name="sourceRepay" :gutter="gutter" class="editor-item-el"></editor>
            </div>
          </div>
          <div class="editor-item">
            <span class="el-form-item__label editor-label">资金保障:</span>
            <div class="editor-container">
              <editor name="fundGuarantee" :gutter="gutter" class="editor-item-el"></editor>
            </div>
          </div>
          <div class="editor-item">
            <span class="el-form-item__label editor-label">项目流程说明:</span>
            <div class="editor-container">
              <editor name="projectProcedure	" :gutter="gutter" class="editor-item-el"></editor>
            </div>
          </div>
        </el-row>
      </div>
      <div class="btns">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
  import Editor from '@/components/Editor'
  import Upload from '@/components/Upload/singleImage3'
  import { launchProduct } from '@/api/product'
  // import { validateURL } from '@/utils/validate'
  // import { fetchArticle } from '@/api/article'
  // import { userSearch } from '@/api/remoteSearch'

  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    source_name: '', // 文章外部作者
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform']
  }

  export default {
    name: 'articleDetail',
    components: {
      Editor,
      Upload
    },
    data() {
      return {
        postForm: {
          shopName: '',
          bType: '',
          borVenture: '',
          idNumber: '',
          fNumber: '',
          fAddress: '',
          investCategoary: '',
          recommend: '',
          cType: '',
          ctType: '',
          rewardProduct: '',
          setModel: '',
          totalProduct: '',
          sueAmount: '',
          annual: 0,
          extraAnnual: 0,
          basicsAnnual: 0,
          award: 0,
          total: 0,
          repayment: '',
          valueDate: '',
          activityTime: '',
          financialPeriod: '',
          slogan: '',
          phoneUrl: '',
          webUrl: '',
          pLabel: '',
          purpose: '',
          bName: '',
          bColor: '',
          bMessage: '',
          sourceRepay: '',
          fundGuarantee: '',
          projectProcedure: ''
        },
        gutter: 20,
        isEdit: false,
        // postForm: Object.assign({}, defaultForm),
        fetchSuccess: true,
        loading: false,
        userLIstOptions: [],
        boolerOptions: [{
          key: 0,
          value: '否'
        }, {
          key: 1,
          value: '是'
        }],
        productTypeOptions: [{
          key: 0,
          value: '普通项目'
        }, {
          key: 1,
          value: '新手专享'
        }],
        investTypeOptions: [{
          key: 0,
          value: '车无忧'
        }, {
          key: 5,
          value: '货押宝'
        }],
        cgcpTypeOptions: [{
          key: 0,
          value: '普通'
        }, {
          key: 1,
          value: '爆款'
        }, {
          key: 2,
          value: '活动'
        }],
        qxTypeOptions: [{
          key: 0,
          value: '周标'
        }, {
          key: 1,
          value: '月标'
        }, {
          key: 2,
          value: '单季标'
        }, {
          key: 3,
          value: '双季标'
        }, {
          key: 4,
          value: '新手标'
        }, {
          key: 5,
          value: '半季标'
        }, {
          key: 6,
          value: '双月标'
        }],
        moduleOptions: [{
          key: 0,
          value: '优选理财'
        }, {
          key: 1,
          value: '特色理财'
        }],
        payInterestWayOptions: [{
          key: 1,
          value: '到期还本付息'
        }],
        calcInterestWayOptions: [{
          key: 0,
          value: 'T + 0'
        }, {
          key: 1,
          value: 'T + 1'
        }],
        rules: {
          shopName: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
          ],
          borVenture: [{
            required: true,
            message: '请输入借款企业',
            trigger: 'change'
          }],
          idNumber: [{
            required: true,
            message: '请输入证件号',
            trigger: 'change'
          }],
          fNumber: [{
            required: true,
            message: '请输入发起联系人电话',
            trigger: 'change'
          }],
          fAddress: [{
            required: true,
            message: '请输入发起联系人地址',
            trigger: 'change'
          }],
          totalProduct: [{
            required: true,
            message: '请输入项目总额',
            trigger: 'change'
          }],
          sueAmount: [{
            required: true,
            message: '请输入起投金额',
            trigger: 'change'
          }],
          investCategoary: [{
            required: true,
            message: '请选择投资类别',
            trigger: 'change'
          }],
          annual: [{
            required: true,
            message: '请输入年化收益',
            trigger: 'change'
          }],
          basicsAnnual: [{
            required: true,
            message: '请输入基础年化收益',
            trigger: 'change'
          }],
          extraAnnual: [{
            required: true,
            message: '请输入额外年化收益',
            trigger: 'change'
          }],
          award: [{
            required: true,
            message: '奖励收益',
            trigger: 'change'
          }],
          repayment: [{
            required: true,
            message: '请选择还款方式',
            trigger: 'change'
          }],
          date1: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          date2: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          type: [{
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }],
          resource: [{
            required: true,
            message: '请选择活动资源',
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: '请填写活动形式',
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      contentShortLength() {
        return this.postForm.content_short.length
      }
      // totalRevenue() {
      //   return this.postForm.baseEarnings
      // }
    },
    created() {
      if (this.isEdit) {
        this.fetchData()
      } else {
        this.postForm = Object.assign({}, defaultForm)
      }
    },
    methods: {
      fetchData() {
        // fetchArticle().then(response => {
        //   this.postForm = response.data
        // }).catch(err => {
        //   this.fetchSuccess = false
        //   console.log(err)
        // })
      },
      onEditorReady(editor) {},
      submitForm() {
        this.postForm.display_time = parseInt(this.display_time / 1000)
        console.log(this.postForm)
        this.$refs.postForm.validate(valid => {
          console.log(valid)
          if (valid) {
            launchProduct(this.postForm).then(res => {
              this.loading = true
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              // this.postForm.status = 'published'
              this.loading = false
            })
          } else {
            console.log('未成功!!！')
            return false
          }
  
          // if (valid) {
          //   this.loading = true
          //   this.$notify({
          //     title: '成功',
          //     message: '发布文章成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          //   this.postForm.status = 'published'
          //   this.loading = false
          // } else {
          //   console.log('error submit!!')
          //   return false
          // }
        })
      },
      draftForm() {
        if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
          this.$message({
            message: '请填写必要的标题和内容',
            type: 'warning'
          })
          return
        }
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        this.postForm.status = 'draft'
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 40px 20px 20px;
      .el-select {
        width: 100%;
      }
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-item {
        margin-bottom: 22px;
        min-height: 300px;
        .editor-label {
          width: 130px;
          float: left;
          font-weight: 700;
          padding-right: 0;
        }
        .editor-container {
          margin: 0 auto;
        }
        .editor-item-el {
          padding: 0 10px;
          border-radius: 5px;
        }
      }
    }
    .btns {
      text-align: center;
    }
  }

</style>
<style>
  .w-e-toolbar {
    border-color: #dcdfe6 !important;
  }

  .w-e-text-container {
    border-color: #dcdfe6 !important;
    height: auto;
    max-height: 300px;
  }

</style>
