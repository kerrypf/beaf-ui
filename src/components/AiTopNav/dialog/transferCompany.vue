<template>
  <div>
    <el-dialog
      title="移交团队"
      center
      :visible.sync="dialogVisible"
      width="580px"
      :before-close="handleClose">
      <div>
        <div style="margin-bottom:27px;">如果您不想再管理当前团队，您可以选择一个团队成员作为新的团队管理员，移交后您的角色变为成员。</div>
        <section class='transferCompany_main' v-if="memberlist.length">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchValue">
          </el-input>
          <div class='transferCompany_main_members'>
            <div class="members_item" v-for='item in show_memberlist'
              v-on:click='selectItem(item)'
              v-bind:class="{'selected':item.userId === currentMember.userId}">
              <div class='members_item_radioName' 
                v-bind:class="[{'isChinese':isChinese(item.name)}]">{{item.name[0]}}</div>
              <p class='members_item_des'>
                <span class='members_item_name'>{{item.name}} </span>
                <span class='members_item_department'>(</span>
                <span class='members_item_department'>{{item.department}}</span>
                <span class='members_item_department'>)</span>
              </p>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onTransfer" size="medium">确认</el-button>
            <el-button type="text"  @click="handleClose" size="medium">取消</el-button>
          </div>
        </section>
        
        
        <p v-if="memberlist.length === 0" style="font-size: 13px;position: relative;top: -10px;">当前团队无其他成员，你需要先<a target="_blank" style='color:#2196f3;' href="/console/account/index.html#/ProjectGroup/MemberList?type=invite">邀请成员</a>加入团队</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VALIDATE } from 'ai-components/utils'

export default {
  mounted(){
    this.AJAX.get(`/permission/company/account/info/list`,{baseURL:'/'}).then((res) => {
      if (res.code === '0') {
        this.memberlist = res.data.filter(m => m.roleId != 1)
      }
    })
  },
  props: ['dialogTransferCompany', 'AJAX', 'AlertMsg','user'],
  data(){
    return {
      memberlist: [],
      currentMember: {},
      confirm_transfer:false,
      searchValue:'',
    }
  },
  computed: {
    dialogVisible() {
      return this.dialogTransferCompany
    },
    show_memberlist(val){
      return this.memberlist.filter((item)=>{
        return this.searchValue ? ~item.name.indexOf(this.searchValue) : true;
      })
    }
  },
  methods: {
    isChinese(val){
      return /^[\u4e00-\u9fa5]/.test(val)
    },
    handle_confirm_close(){
      this.confirm_transfer = false;
    },
    handleClose(){
      this.searchValue = '';
      this.currentMember = {};
      this.$emit('handleClose')
    },
    selectItem(item){
      this.currentMember = item;
    },
    onTransfer(){
      if (!this.currentMember.userId) {
        this.AlertMsg({
          type: 'warning',
          message: '请选择一个成员'
        })
        return
      }
      this.$confirm(`您是否确定要将<span class="confirm_blue">${this.user.company.name || this.user.company.shortName}</span>团队的管理员身份转让给<span class="confirm_blue">${this.currentMember.name}</span>?`, '团队转让', {
        confirmButtonText: '确定转让',
        cancelButtonText: '取消',
        type: 'warning',
        center:true,
        customClass: 'prompt',
        dangerouslyUseHTMLString: true
      }).then(()=>{
        this.transfer()
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
   
   
  }
}
</script>
<style type="text/css">
  .confirm_blue{
    color:#2196f3;
  }
</style>
<style lang="scss" scoped>
  %ell{
    text-overflow:ellipsis; 
    white-space:nowrap; 
    overflow:hidden;
    display: inline-block;
  }
  .dialog-footer{
    text-align: right;
  }
  .transferCompany_main{
    width:460px;
    margin: 0 auto; 
    .transferCompany_main_members{
      box-sizing:content-box;
      max-height: 310px;
      min-height:56px;
      margin:20px 0 30px;
      overflow-y:auto;
      padding:10px;
      border:1px solid #dadada;
      border-radius:4px;
      .members_item{
        width:50%;
        float:left;
        height:56px;
        background: #fff;
        cursor:pointer;
        &:hover{
          background:rgba(196,196,196,.15);
        }
        &.selected{
          background:rgba(33,150,243,.15);
        }
        .members_item_des{
          float:left;
          line-height: 56px;
          height:56px;
          font-size:0;
          .members_item_name{
            color:#333;
            font-size:14px;
            max-width:60px;
            padding-right:5px;
            @extend %ell;
          }
          .members_item_department{
            font-size:12px;
            color:#959595;
            max-width:60px;
            @extend %ell;
          }
        }
        
        .members_item_radioName{
          width:36px;
          height:36px;
          margin:10px 13px 10px 20px; 
          border-radius:50%;
          color:#fff;
          text-align:center;
          float:left;
          line-height:36px;
          background:#14CAB4;
          &.isChinese{
            background:#2196f3;
          }
        }
      }
    }
  }
</style>
