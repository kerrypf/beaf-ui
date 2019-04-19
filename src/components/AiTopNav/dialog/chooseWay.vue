<template>
    <div>
      <svg style="position:absolute;width:0px;height:0px;overflow:hidden;">
          <symbol id="icon-chuangjianxintuandui" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FAFAFA"></path><path d="M839.547138 625.950403a193.988909 193.988909 0 0 0-63.752223-52.180391 130.183112 130.183112 0 0 0 45.162289-97.985561c0-69.109553-54.75191-125.897248-124.129329-131.254578a159.701999 159.701999 0 0 1 2.089358 19.072094 114.003976 114.003976 0 0 1 103.128597 112.182484 112.503924 112.503924 0 0 1-67.127341 101.789265c72.163231 20.679293 125.147222 84.806529 125.147222 161.630637a162.916396 162.916396 0 0 1-9.321754 52.341111h-78.16344a242.365596 242.365596 0 0 1-5.785916 19.018521h97.342681l4.446583-12.536152a183.702836 183.702836 0 0 0 10.71466-58.34132 181.559904 181.559904 0 0 0-39.751387-113.73611z" fill="#BFBFBF"></path><path d="M580.091661 512.589306a156.701894 156.701894 0 0 0 93.699696-142.076384c0-86.842315-72.377524-157.184054-161.630637-157.184053S350.315789 283.563461 350.315789 370.512922a156.541174 156.541174 0 0 0 93.646124 142.076384c-100.503505 28.768861-174.327509 118.12912-174.327509 225.007848a227.043633 227.043633 0 0 0 13.071885 73.073977h458.855289a226.936486 226.936486 0 0 0 12.589725-72.913257c0-107.039448-73.60971-196.399707-174.059642-225.168568z" fill="#BFBFBF"></path><path d="M225.918594 404.478393a93.75327 93.75327 0 1 0 93.75327 94.021136 93.75327 93.75327 0 0 0-93.75327-94.021136z m59.30564 105.539395h-47.519515v47.412368h-23.465104V510.017788H166.612954v-23.518677h47.626661v-47.573088h23.465104v47.573088h47.519515z" fill="#14CAB4"></path></symbol>
          <symbol id="icon-jiaruyiyoutuandui" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FAFAFA"></path><path d="M812.76049 626.003976a194.524642 194.524642 0 0 0-63.752224-52.180391 130.558125 130.558125 0 0 0 45.16229-98.039134c0-69.05598-54.75191-125.843675-124.12933-131.201004a148.34446 148.34446 0 0 1 2.035786 19.072093 113.950403 113.950403 0 0 1 103.18217 112.128911 112.503924 112.503924 0 0 1-67.127341 101.789265c72.109658 20.786439 125.307942 84.967249 125.307941 161.791357a162.862823 162.862823 0 0 1-9.321753 52.287538h-78.324161c-1.660772 6.428796-3.589411 12.750445-5.785916 19.01852h97.342681l4.446584-12.482578a183.756409 183.756409 0 0 0 10.714659-58.394894v-0.267866a181.774197 181.774197 0 0 0-39.751386-113.521817z" fill="#BFBFBF"></path><path d="M553.251439 512.589306a156.594747 156.594747 0 0 0 93.538976-142.076384c0-86.788741-72.377524-157.184054-161.630637-157.184053S323.529141 283.617035 323.529141 370.512922a156.541174 156.541174 0 0 0 93.646123 142.076384c-100.503505 28.768861-174.327509 117.861254-174.327508 225.007848a226.722193 226.722193 0 0 0 12.857591 72.859684h458.855289a226.882913 226.882913 0 0 0 13.018311-72.859684c0-106.878728-73.824003-196.238987-174.327508-225.007848z" fill="#BFBFBF"></path><path d="M207.864393 404.853406a93.75327 93.75327 0 1 0 93.753269 93.75327 93.699697 93.699697 0 0 0-93.753269-93.75327z m59.466359 66.966621l-70.984618 73.44899a4.071571 4.071571 0 0 1-5.785916 0l-41.894319-43.501517a4.39301 4.39301 0 0 1 0-6.053782l13.232605-13.821911a4.125144 4.125144 0 0 1 5.839489 0l25.715183 26.786649 54.484043-56.573402a4.125144 4.125144 0 0 1 5.839489 0h0.267867l13.125457 13.768337a4.23229 4.23229 0 0 1 0.16072 5.946636z" fill="#FFBF00"></path></symbol>
      </svg>
      
    
    <el-dialog
        class='chooseway_wrapper'
        :visible.sync="dialogBeCompany"
        width="580px"
        :before-close="handleClose">
        <p class='chooseway_title' slot='title'>成为团队开发者</p>
        <section class='chooseway_main'>
          <div class='chooseway_main_item l' @click='jump("new")'>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-chuangjianxintuandui"></use>
              </svg>
              <p class='chooseway_main_item_title'>创建新团队</p>
              <p class='chooseway_main_item_tips'>（团队或组织）</p>
          </div>
          <div class='chooseway_main_item r' @click='jump("old")'>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiaruyiyoutuandui"></use>
              </svg>
              <p class='chooseway_main_item_title'>加入已存在的团队</p>
              <p class='chooseway_main_item_tips'>（团队或组织）</p>
          </div>
        </section>  
      
    </el-dialog>
    </div>
</template>

<script>
// import loginout from '../util/loginout.js'
import { VALIDATE } from 'ai-components/utils'

export default {
    props:['dialogBeCompany'],
    methods:{
      handleClose(){
        this.$emit('handleClose')
      },
      jump(type){
        const origin = location.protocol+'//'+location.host
        let query = '?redirectUrl=' + encodeURIComponent(origin+location.pathname+location.hash);
        let jump_url = '';
        switch(type){
            case 'old':
                jump_url = origin + '/console/account/index.html' +query+'#/ProjectGroup/JoinGroup/step1'
                break;
            case 'new':
                jump_url = origin + '/console/account/index.html' +query+'#/ProjectGroup/CreateGroup/step1'
                break;
            default:
                break;
        }
        this.link(jump_url)
      },
      link(url){
        if(url){
            location.href = url;
        }
        this.handleClose()
      }
    }
  
}
</script>

<style lang="scss" scoped>
.l{
    float: left;
}
.r{
    float: right;
}
.chooseway_wrapper{
    text-align: center;
    .chooseway_title{
        font-size:18px;
        color:#333;
        line-height: 1;
        padding-top:19px;
    }
    .chooseway_main{
        padding:0 75px 40px;
        overflow: hidden;
        .chooseway_main_item{
            &:hover{
                border-color:#2196f3;
            }
            cursor:pointer;
            width:160px;
            height:170px;
            border:1px solid #e5e5e5;
            .icon{
                width:64px;
                height:64px;
                margin:20px 0 10px;
            }
            .chooseway_main_item_title{
                font-size:16px;
                color:#333;
                padding-bottom:7px;
            }
            .chooseway_main_item_tips{
                color:#666;
                font-size:12px;
            }
        }
    }


}

</style>
