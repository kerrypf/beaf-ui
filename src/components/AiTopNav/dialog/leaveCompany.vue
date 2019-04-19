<template>
  <div>
    <el-dialog
      title="退出团队"
      center
      :visible.sync="dialogVisible"
      width="508px"
      :before-close="handleClose">
      <div class="info">
        <svg class="icon iconfont" aria-hidden="true">
          <use xlink:href="#icon-morentu"></use>
        </svg>
        <div>
          <p>{{user.company&&user.company.name}}&nbsp;|&nbsp;{{user.company&&user.company.legalPerson || '-'}}</p>
          <!-- <p class="detail">人工智能 | 500人 | 张三丰</p> -->
        </div>
      </div>
      <div class="tip">
        退出团队后，您将成为个人开发者
      </div>
      <span slot="footer" class="dialog-footer clearfix">
        <div>
          <el-button type="primary" @click="leaveCompany" size="small">是的，我要退出</el-button>
          <el-button @click="handleClose" type="text">放弃退出</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import loginout from '../util/loginout.js'

export default {
  created(){
  },
  // mixins:[loginout],
  props: ['dialogLeaveCompany', 'AJAX', 'user', 'AlertMsg'],
  data(){
    return {
      // memberlist: [],
      // ruleForm: {
      //   companyName: ''
      // },
      // rules: {
      //   companyName: [{
      //     required: true,
      //     message: '请输入团队名称',
      //     trigger: 'change'
      //   }]
      // },
      // currentMember: {}
    }
  },
  computed: {
    dialogVisible() {
      return this.dialogLeaveCompany
    },
  },
  methods: {
    handleClose(){
      this.$emit('handleClose')
    },
    leaveCompany (){
      this.AJAX.post(`/permission/company/leave`,{},{baseURL:'/'}).then((res) => {
        if (res.code === '0') {
          this.AlertMsg({
            type: 'success',
            message: '操作成功'
          })
          location.href = '/console/account/index.html?'+(+new Date())+'#/LeaveComSuccess'
        } else {
          this.AlertMsg({
            type: 'error',
            message: res.message
          })
        }
      })   
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  > div {
    float: right;
  }
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.tip {
  color: #666666;
}
.info {
  font-size: 13px;
  background-color: #f8f8f8;
  padding: 30px 0px;
  position: relative;
  margin-bottom: 20px;
  .icon {
    height: 64px;
    width: 64px;
    position: absolute;
    left: 10px;
    top: 12px;
  }
  > div {
    position: relative;
    padding-left: 100px;
    .detail {
      color: #959595;
    }
  }
}
</style>
