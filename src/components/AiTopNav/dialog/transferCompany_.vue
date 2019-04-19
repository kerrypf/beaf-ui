<template>
  <div>
    <el-dialog
      title="移交团队"
      center
      :visible.sync="dialogVisible"
      width="508px"
      :before-close="handleClose">
      <div>
        <div style="margin-bottom:27px;">如果您不想再管理当前团队，您可以选择一个团队成员作为新的团队管理员，移交后您的角色可以变为成员。</div>
        <el-form :inline="true" :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="90px"  v-if='memberlist.length'>
          <el-form-item label="" prop="memberName">
            <el-autocomplete
              style="width:360px;"
              v-model.trim="ruleForm.memberName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请选择成员"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onTransfer">移交</el-button>
          </el-form-item>
        </el-form> 
        <p v-if="memberlist.length === 0" style="font-size: 12px;position: relative;top: -10px;">当前团队无其他成员，你需要先<a target="_blank" href="/console/account/index.html#/ProjectGroup/MemberList?type=invite">邀请成员</a>加入团队</p>
      </div>
    </el-dialog>
    <el-dialog
      center
      :visible.sync="confirm_transfer"
      width="508px"
      :before-close="handle_confirm_close">
      <p style='font-size:14px;text-align: center;'>
        您是否确定要将团队的管理员身份转让给<span style='color:#2196f3;'> {{ruleForm.memberName}} </span>?
      </p>
      <span slot="footer" class="dialog-footer">
          <div style="text-align: right;">
            <el-button type='primary' @click='transfer'>确认</el-button>
            <el-button type="text" @click="handle_confirm_close">取消</el-button>
          </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { VALIDATE } from 'ai-components/utils'
// import loginout from '../util/loginout.js'

export default {
  mounted(){
    this.AJAX.get(`/permission/company/account/info/list`,{baseURL:'/'}).then((res) => {
      if (res.code === '0') {
        this.memberlist = res.data.map(m => {
          m.value = m.name || m.nickName || m.email || m.mobile
          return m
        }).filter(m => m.roleId != 1)
      }
    })
  },
  // mixins:[loginout],
  props: ['dialogTransferCompany', 'AJAX', 'AlertMsg'],
  data(){
    return {
      memberlist: [],
      ruleForm: {
        memberName: ''
      },
      rules: {
        memberName: [{
          required: true,
          message: '请输入成员名称',
          trigger: 'change'
        }]
      },
      currentMember: {},
      confirm_transfer:false,
    }
  },
  computed: {
    dialogVisible() {
      return this.dialogTransferCompany
    },
  },
  methods: {
    handle_confirm_close(){
      this.confirm_transfer = false;
    },
    handleClose(){
      this.$emit('handleClose')
      this.$refs['ruleForm'].resetFields()
    },
    onTransfer(){
      if (!this.currentMember.userId) {
        this.AlertMsg({
          type: 'warning',
          message: '请选择一个成员'
        })
        return
      }
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
           this.confirm_transfer = true
        }
      })
    },
    transfer(){
        this.AJAX.post(`/permission/company/owner/transfer`, {
          newOwnerId: this.currentMember.userId
        },{baseURL:'/'}).then((res) => {
          if (res.code === '0') {
            this.AlertMsg({
              type: 'success',
              message: '操作成功'
            })
            location.href = '/console/account/index.html?'+(+new Date())+'#/TransferComSuccess'
          } else {
            this.AlertMsg({
              type: 'error',
              message: res.message
            })
          }
        })   
    },
    querySearchAsync(queryString, cb) {
      var results = queryString ? this.memberlist.filter(this.createStateFilter(queryString)) : this.memberlist
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item);
      this.currentMember = item
      this.ruleForm.memberName = item.value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
