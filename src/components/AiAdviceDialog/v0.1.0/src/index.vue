<template>
<el-dialog class="ai-dialog AiAdviceDialog" size="tiny"  :visible="_show && adviceDialog" @close="adviceCancel">
  <div style="margin-top: -30px;">
    <p style="text-align: center;font-size: 18px;margin-bottom: 30px;">{{ dialogTitle }}</p>
    <div v-if="wo.advice && wo.advice.tips" v-html="wo.advice.tips" class="top-tip"></div>
    <el-form label-position="left" label-width="100px" :model="advice" :rules="rules" ref="adviceForm">
      <el-form-item label="问题类型：">
        <el-select class="ai-select" v-model="advice.type" style="width: 100%"
          :disabled="wo.adviceDialogType === 'custom'">
          <el-option :label="item.name" :value="item.code" v-for="item in adviceTypes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="advice.title" placeholder="请输入标题"
        :disabled="wo.adviceDialogType === 'custom'"></el-input>
      </el-form-item>
      <el-form-item label="问题描述：" prop="detail">
        <el-input type="textarea" :rows="5" :placeholder="wo.advice && wo.advice.detailPlaceholder|| '请输入问题描述'" v-model="advice.detail"></el-input>
      </el-form-item>
      <el-form-item :label="`${fileLabel}：`" v-if="showFile">
        <div ref="uploadBox">
          <el-upload class="ai-upload"
            :action="actionUrl"
            :accept="`.${fileTypes.join(',.')}`"
            :show-file-list="false"
            :data="uploadParams"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :on-error="uploadError">
            <el-button class="ai-btn--primary" :loading="loading">选择文件</el-button>
            <div slot="tip" class="explain-tip" style="margin: 7px 0;line-height:18px;font-size:13px;">
              支持上传{{ fileTypes.join('，') }}类型文件,单个文件不大于2M；<br>
              文件名只能是中文、字母、数字、下划线、空格符或“_”、“-”、“.”，首字母为中文字母数字或下划线。
            </div>
          </el-upload>
        </div>
          <ul class="uploadfile-box">
            <li v-for="(file, index) in files" class="file-list">
              <i class="icon iconfont icon-ai ai-dialog-icon-file" 
              :class="['icon-upload-'+fileType(file.name, fileTypes),'icon-ai-upload-'+fileType(file.name, fileTypes)]"></i>
               {{file.name}}
              <i class="icon iconfont icon-ai icon-yichu icon-ai-yichu ai-dialog-icon-file-del"
                @click="delFile(file, index)"></i>
              
             <!--  <svg class="icon icon-file" aria-hidden="true">
                <use :xlink:href="'#icon-upload-' + fileType(file.name, fileTypes)  "></use>
              </svg>{{file.name}}
              <svg class="icon icon-file-del" aria-hidden="true" >
                <use xlink:href="#icon-yichu"></use>
              </svg> -->
            </li>
          </ul>
      </el-form-item>
      <el-form-item label="联系邮箱：" prop="email">
        <div v-if="user.email">&nbsp;{{user.email}}</div>
        <el-input v-model="advice.email" v-else></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" style="margin-bottom: 0" prop="mobile">
        <div v-if="user.mobile">&nbsp;{{user.mobile}}</div>
        <el-input v-model="advice.mobile" v-else></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div slot="footer">
    <el-button type="primary" @click="adviceSubmit">提交</el-button>
    <el-button type="text" @click="adviceCancel">取消</el-button>
  </div>
</el-dialog>
</template>
<script>
import VALIDATE from '../utils/validates'
export default {
  VERSION:'v0.1.4',
  //name: 'adviceDialog',
  data () {
    return {
      // container: null,
      advice: {
        type: '1',
        title: '',
        detail: '',
        email: '',
        mobile: ''
      },
      rules: {
        title: [{
          required: true,
          message: '请输入问题标题！',
          trigger: 'blur'
        }, {
          validator: VALIDATE.charLength,
          max: 90,
          message: '标题不能多于90个字符（1个汉字为3个字符）'
        }],
        detail: [{
          required: true,
          message: '请输入问题描述！',
          trigger: 'blur'
        }, {
          validator: VALIDATE.charLength,
          max: 1500,
          message: '描述不能多于1500个字符（1个汉字为3个字符）'
        }],
        mobile: [{
          trigger: 'blur'
        }, {
          validator: VALIDATE.checkPhoneOrTel
        }],
        email: [{
          trigger: 'blur'
        }, {
          validator: VALIDATE.checkEmail
        }]
      },
      files: [],
      uploadParams: {},
      fileType: VALIDATE.validateFileType,
      inputFile: null,
      loading: false
    }
  },
  props:{
    user:{default:{},required: true,},
    company:{default:{},required: true,},
    wo:{default:{},required: true,},
    show:{default:false,required: true,},
    actionUrl:{default:'/console/api/v1.0/track/upload'},
    action:{default:function (){
        return function(params){
                  return this.$http.post('/console/api/v1.0/track/formdata',params)
                }}
    },
    requestMethod:{},
    alertMsg:{type:Function}

  },
  computed: {
    fileClass(){
      return
    },
    _show:{
        get(){
            return this.show;
        },
        set(val){
            this.$emit('update:show',val)
        }
    },
    adviceTypes () {
      if (this.wo.types && this.wo.types.length) {
        this.advice['type'] = this.wo.types[0].code
      }
      return this.wo.types
    },
    AJAX(){
      return this.requestMethod ? this.requestMethod : this.$http;
    },
    adviceDialog(){
        // 异常日志生成工单
        // if (this.wo.adviceDialogType === 'exceptionLog' && this.wo.advice) {
        //   this.advice['type'] = this.wo.advice['type']
        //   this.advice['title'] = this.wo.advice['title']
        //   this.advice['detail'] = this.wo.advice['detail']
        // }
        // 自定义生成工单内容
        if (this.wo.adviceDialogType === 'custom' && this.wo.advice) {
          this.advice['type'] = this.wo.advice['type']
          this.advice['title'] = this.wo.advice['title']
          this.advice['detail'] = this.wo.advice['detail']
        }
        // 现金充值生成工单
        if (this.wo.adviceDialogType === 'capitalCharge' && this.wo.advice) {
          this.advice['type'] = this.wo.advice['type']
        }
        return this.wo.adviceDialog

      // set (val) {
        // if (this.wo.adviceDialog !== val) {
        //   this.$store.commit('SHOW_ADVICE_DIALOG', val) //将this.wo.adviceDialog设置为true
        // }
      // }
    },
    showFile: {
      get () {
        if (this.wo.adviceDialogType === 'custom' && this.wo.advice && this.wo.advice['file'] === 'hide') {
          return false
        } else {
          return true
        }
      }
    },
    fileTypes: {
      get () {
        if (this.wo.adviceDialogType === 'custom' && this.wo.advice && this.wo.advice['fileTypes']) {
          return this.wo.advice['fileTypes']
        } else {
        	return ['zip']
          // return ['jpg','png','txt','zip']
        }
      }
    },
    fileLabel: {
      get () {
        if (this.wo.adviceDialogType === 'custom' && this.wo.advice && this.wo.advice['fileLabel']) {
          return this.wo.advice['fileLabel']
        } else {
          return '上传附件'
        }
      }
    },
    dialogTitle: {
      get () {
        if (this.wo.adviceDialogType === 'custom' && this.wo.advice && this.wo.advice['dialogTitle']) {
          return this.wo.advice['dialogTitle']
        } else {
          return '反馈问题'
        }
      }
    }
  },
  methods: {
    adviceSubmit () { // 提交意见
      this.$emit('submit')
      this.$refs.adviceForm.validate((valid) => {
        if (valid) {
          const attachment = []
          this.files.length && this.files.map(item => attachment.push({
            filename: item.response.filname,
            uploadTime: item.response.uploadTime
          }))
          const paramObj = {
            type: this.advice.type,
            title: this.advice.title,
            desc: this.advice.detail,
            email: this.user.email ? this.user.email : this.advice.email,
            contact: this.user.mobile ? this.user.mobile : this.advice.mobile,
            attachment: attachment,
            username: this.user.nickName || this.user.email || this.user.mobile || '',
            company: this.company.info.abbreviation || this.company.info.companyName || '',
            company_id: this.user.company && this.user.company.companyId || ''
          }
          // this.$emit('commit',paramObj)
          // this.$http.post('api/v1.0/track/formdata', JSON.stringify(paramObj))
          
          // this.action(paramObj)
          this.AJAX.post('/console/api/v1.0/track/formdata',paramObj,{
            baseURL:'/'
          }).then((response) => {
              let errId = response.errId === undefined ? response.data.errId : response.errId;
              if (errId === 0) {
                this.AlertMsg({
                  type: 'success',
                  message: '反馈提交成功，请等待客服处理'
                })
                
                this.$emit('workOrderChange')
                this.clear()
                this._show = false;
                // if (this.container) {
                //   let workOrderList
                //   for (let i = 0; i < this.container.$children.length; i ++) {
                //     if (this.container.$children[i].name === 'workOrderList') {
                //       workOrderList = this.container.$children[i]
                //       workOrderList.searchTxt = ''
                //       workOrderList.$store.commit('SET_CURR_FLOW', '0')
                //       workOrderList.$store.commit('SET_CURR_TYPE', '0')
                //       workOrderList.$store.commit('SET_CURR_PAGE', 1)
                //       workOrderList.getList()
                //     }
                //   }
                // }
              } else {
                this.AlertMsg({
                  type: 'error',
                  message: response.data.error
                })
              }
            }, (response) => {})
           // this.adviceCancel()
        }
      })
    },
    clear(){
        this.advice = {
            type: '1',
            title: '',
            detail: '',
            email: '',
            mobile: ''
        }
        this.files = []
        this.$refs.adviceForm.resetFields()
    },
    adviceCancel () {
        this.clear()
        this._show && this.$emit('canceled') // 取消要执行的动作 进行统一处理
        this._show = false;
      // this.$parent.shortcut = ''
      // if(this.wo.adviceDialogType) {
      //   this.$store.commit('SET_ADVICE_DIALOG_TYPE', '')
      // }
    },
    uploadBefore (file) {  // 文件上传之前的操作
      if (file) {
        if (file.size && file.size > 1024 * 1024 * 2) {
          this.AlertMsg({
            type: 'warning',
            message: '上传文件不能大于2M！'
          })
          return false
        } else if (file.type && file.name && !this.fileType(file.name, this.fileTypes)) {
          this.AlertMsg({
            type: 'warning',
            message: '不支持该文件类型上传！'
          })
          return false
        } else if (file.name && !VALIDATE.validateFileName(file.name)) {
          this.AlertMsg({
            type: 'warning',
            message: '上传文件的文件名不合法！'
          })
          return false
        } else {
          var dd = new Date()
          this.uploadParams['name'] = file.name
          this.uploadParams['uploader'] = this.user.userId
          this.uploadParams['uploadTime'] = Date.parse(dd)
        }
      }
    },
    uploadSuccess (response, file) { //成功上传
      if (response.errId === 0) {
        if (this.uploadParams.name === file.name) {
          this.files = this.files.concat(file)
        }
      } else {
        this.AlertMsg({
          type: 'error',
          message: response.error || (file.name + '上传失败！')
        })
      }
    },
    uploadError (err, file) { // 上传报错
      this.AlertMsg({
        type: 'error',
        message: file.name + '上传失败！'
      })
    },
    delFile (file, index) { // 删除文件
      this.files.splice(index, 1)
    },
    // findContainer (component) {
      
    //   if (component.name === 'container') {
    //     this.container = component
    //   } else {
    //     this.findContainer(component.$parent)
    //   }
    // },
    checkOnCancel () {
      if(this.inputFile.files.length == 0) {
        this.loading = false
      }
      // document.body.onblur = null
      document.body.onfocus = null
    },
    // checkOnBlur () {
    //   this.loading = 'blur'
    // },
    charge () {
      document.body.onfocus = this.checkOnCancel
      // document.body.onblur = this.checkOnBlur
    }
  },
  mounted: function () {
    this.AlertMsg = this.alertMsg? this.alertMsg : this.Alert || function(params){alert(params.message)};
                                                                              
    if (this.$refs.uploadBox) {
      this.inputFile = this.$refs.uploadBox.getElementsByTagName('input')[0]
      this.inputFile.onclick = this.charge
    }
    // this.findContainer(this)
  }
}
</script>
<style lang="scss" scoped>
  @import '../styles/index.scss'
</style>