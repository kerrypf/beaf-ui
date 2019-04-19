<template>
	<div>
		<el-dialog
	      title="温馨提示"
	      center
	      :close-on-click-modal='false'
	      :before-close="handleClose1"
	      :visible.sync="showStep1"
	      width="508px">
	      <div>
	        <div style="margin-bottom:27px;">
	          您是否要以外部协作者的身份加入<span class='blue'
	          	>{{group.companyName}}</span>的项目组<span class='blue'
	          	>{{group.groupName}}</span>？
	        </div>
	        <span slot="footer" class="dialog-footer">
	          <div style="text-align: right;">
	          	<el-button type="primary" @click="confirm1">确认</el-button>
	            <el-button type="text" @click="handleClose1">取消</el-button>
				
	          </div>
	        </span>
	      </div>
	    </el-dialog>
	    <el-dialog
	      title="温馨提示"
	      center
	      :close-on-click-modal='false'
	      :before-close="handleClose2"
	      :visible.sync="showStep2"
	      width="508px">
	      <div>
	        <div style="margin-bottom:27px;">
	          <span class='blue'>{{group.companyName}}</span>的项目组<span class='blue'>{{group.groupName}}</span>已经收到了您的加入申请，请耐心等待管理员<span class='blue'>{{group.ownerName}}</span>的审核，审核结果会以邮件的形式发送到您的邮箱：
	        </div>
	        <span slot="footer" class="dialog-footer">
	          <div style="text-align: center;">
	            <el-button type="text" @click="handleClose2">我知道了</el-button>
	          </div>
	        </span>
	      </div>
	    </el-dialog>
	</div>
</template>
<script type="text/javascript">
import util from 'aife-vue-base/lib/util'
	export default {
		props:['AJAX','AlertMsg'],
		data(){
			return {
				query_obj:{},
				showStep1:false,
				showStep2:false,
				group:{
					companyName:'',
					groupName:'',
					ownerName:'',
				}
			}
		},
		created(){
			this.init()
		},
		methods:{
			init(){
				let query = util.parseURL(location.href).query;
				query && query.split('&').forEach((item)=>{
							      let arr = item && item.split('=')
							      this.query_obj[arr[0]] = arr[1]
							  }) 

				console.log(this.query_obj)
				if(this.query_obj.externalTeamworker == '1' && this.query_obj.groupId){
					this.inviteLoginCheck()
					
				}
			},
			inviteLoginCheck(){
				this.AJAX.get(`/permission/invitation/inviteLoginCheck?groupId=${this.query_obj.groupId}`,
					{baseURL:'/'})
					.then((res)=>{
						let resData = res.code === undefined ? res.data : res;
						if(resData.code == '103154'){
							this.showStep1 = true;
							this.group = resData.data;
						}
					})
				
			},
			handleClose1(){
				this.showStep1 = false;
			},
			handleClose2(){
				this.showStep2 = false;
			},
			confirm1(){
				// 调用接口向项目组发起申请
				this.AJAX.post(`/permission/groupMember/member/info/${this.query_obj.groupId}`,{
					userName:this.group.name,
		      		nickName:this.group.nickName,
		      		department:this.group.department,
		      		position:this.group.position,
		      		contactEmail:this.group.contactEmail,
		      		contactMobile:this.group.contactMobile,
				},{baseURL:'/'})
				.then((res)=>{
					let resData = res.code === undefined ? res.data : res;
					console.log(resData)
					if(resData.code == '0'){
						this.showStep1 = false;
						this.showStep2 = true;
					}else{
						this.AlertMsg({
							type: 'error',
           					message: res.message
						})
					}
					
				})
					
					
			},

		},
		// watch:{
		// 	['user.userId']:{
		// 		handler:function(){
		// 			this.init()
		// 		},
		// 		immediate:true
		// 	}
		// }
	}
</script>
<style lang='scss' scoped>
	.blue{
		color:#2196f3;
	}
</style>