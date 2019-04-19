<template>
    <div id="AiMessage" 
        class="el-message ai-message-warning ai-auto-height" 
        v-if="innerShow"
        style="z-index:2000;transition:0.3s;"
        v-bind:style="{'top':`${top}px`}">
        <i class="iconfont icon-message-warning"></i>
        <p class="el-message__content">您加入团队的申请还在审核中，暂时无法访问控制台。审核结果会以邮件的形式发送到您的邮箱。您可以去首页或者帮助文档，了解更多DUI平台的内容。</p>
    </div>    
</template>
<script type="text/javascript">
    export default {
        props:{
            show:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                top:-200
            }
        },
        computed:{
            innerShow:{
                get(){
                    return this.show
                },
                set(){
                    this.$emit('update:show', false)
                }
            }
        },
        methods:{
            convert(){
                setTimeout(()=>{
                    this.top = 36
                })
                setTimeout(()=>{
                    this.top = -200
                },5000)
                setTimeout(()=>{
                    this.innerShow = false
                    location.href = 'http://' + location.host
                },6000)
            }
        },
        watch:{
            innerShow(){
                this.convert()
            }
        }
    }
</script>
<style>
    #AiMessage p{
        line-height: 20px;
    }
    div.el-message{box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);padding:0;top:36px;height:50px;border:none;min-width:250px;max-width:1200px;border:1px solid #e7e7e7;background:#fff;border-radius:0}div.el-message p{margin:0;padding:0 20px;color:#8391a5;font-size:14px;line-height:50px}div.el-message .iconfont{padding:0 10px;height:50px;line-height:50px;color:#fff;font-size:30px}div.el-message .el-message__closeBtn{top:16px;right:10px}div.el-message.ai-message-info{border-color:#5fb9f9}div.el-message.ai-message-info .iconfont{background-color:#48aaf0}div.el-message.ai-message-warning{border-color:#ffb700}div.el-message.ai-message-warning .iconfont{background-color:#ffb700}div.el-message.ai-message-success{border-color:#37d0a1}div.el-message.ai-message-success .iconfont{background-color:#00c286}div.el-message.ai-message-error{border-color:#ff8080}div.el-message.ai-message-error .iconfont{background-color:#fd6e6e}
</style>
