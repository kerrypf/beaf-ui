<template>
<div>

  <!-- logo -->
  <div id="TopNav" ref="topnav" >
    <a class="logo float_left" href="/">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-duilogo"></use>
      </svg>
      <svg class="icon beta-icon" aria-hidden="true">
        <use xlink:href="#icon-beta"></use>
      </svg>
    </a>
    <!-- 个人或者团队owner -->
    <span class="version float_left" 
      v-on:click="menuClick('commerce')">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#icon-version-type-' + version"></use>
      </svg>
    </span>
    <!-- menu -->
    <div class="home float_left">
      <ul class="home-menu">
        <li class="home-menu-item float_left" 
          v-for="(item,idx) in homeMenu" 
          v-bind:key="idx">
          <a @click="menuClick(item)"
            v-bind:class="
              user.menu === item.menu 
              && route.path 
              && route.path.indexOf('search') === -1 
                ? 'active' : ''">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <!-- <transition name="liner_scale"> -->
    <transition name="el-fade-in-linear">
      <div class="menu-r float_right" 
        v-show="searching && searchShow"
        style="width:calc(100% - 600px);position:absolute;right:0;top:0;">
        <div class="search_box">
          <search 
            ref="search"
            v-bind:show.sync="searching"
            v-bind:route="route"
            v-bind:jump="jump"></search>
        </div>
      </div>
    </transition>
  
    <transition name="el-fade-in-linear">
      <div class="menu-r float_right" 
         v-if="!searching">
        <div class="btn-icon" v-if="searchShow">
          <svg class="icon icon-search" aria-hidden="true" 
            v-on:click="searching = true">
            <use xlink:href="#icon-search"></use>
          </svg>
        </div>
        <div class="btn-icon">
          <i class="iconfont icon-gongdan"
            v-on:click="jump('workOrder')" 
            v-on:mouseover="(e)=>{handleIconMouseOver(e, 'wo')}"
            v-on:mouseleave="handleIconMouseLeave('wo')"
            v-bind:class="{'icon': true, 'active': popoverWo}"></i>
        </div>
        <div class="btn-icon">
          <i class="iconfont icon-bangzhu"
            v-on:click="jump('help','/ct_skill')"
            v-on:mouseover="(e)=>{handleIconMouseOver(e, 'help')}"
            v-on:mouseleave="handleIconMouseLeave('help')"
            v-bind:class="{'icon': true, 'active': popoverHelp}"></i>
        </div>
        <div class="btn-icon">
          <i class='iconfont icon-message'
            v-on:click="jump('message')" 
            v-on:mouseover="(e)=>{handleIconMouseOver(e, 'msg')}"
            v-on:mouseleave="handleIconMouseLeave('msg')"
            v-bind:class="{'icon': true, 'active': popoverMsg}">
          </i>
          <span v-on:click="jump('message')"
            v-on:mouseover="(e)=>{handleIconMouseOver(e, 'msg')}"
            v-on:mouseleave="handleIconMouseLeave('msg')">
            <el-badge class="ai-badge" 
              v-if='unreadNum'
              v-bind:value="unreadNum" 
              v-bind:max="99"></el-badge>
          </span>
        </div>
        <!-- 个人或者团队owner -->
        <div class="btn-icon">
          <el-tooltip 
            content="财务中心" 
            effect="dark" 
            placement="bottom">
            <i class="icon iconfont icon-capital" 
              v-on:click="menuClick('capital')"></i>
          </el-tooltip>
        </div>
        <div class="account flex float_right" ref="userBtn">
          <div v-bind:class="{
            'btn-account': true, 
            'active': popoverUser}" 
            v-on:click="jump('account')"
            v-on:mouseover="(e)=>{handleIconMouseOver(e, 'user')}"
            v-on:mouseleave="handleIconMouseLeave('user')">
            <img v-if="user.headimg"
              class="img-user-head float_left" 
              src="../../assets/icon_head_portrait.png" 
              alt="头像"/>
            <svg v-else 
              class="icon icon-user-head float_left" 
              aria-hidden="true">
              <use xlink:href="#icon-morentouxiang"></use>
            </svg>
            <p class='user_nickName'>
              <span class="text" 
                v-bind:title="
                (user.personInfo && user.personInfo.name) || user.email || user.mobile">
                {{(user.personInfo && user.personInfo.name) || user.email || user.mobile}}
              </span>
            </p>
            
          </div>
          <div v-if="user.identityType != 0"
            v-bind:class="{
                'btn-renzheng': true, 
                'active': user.verified==3 || user.verified==1}"
            v-on:click="jump('account','#/AutoAuth', false, true)">
            <i class="icon icon-renzheng iconfont" 
              style="font-size:46px;"></i>
            <i class="web-font">{{user.verified==3||user.verified==1?'已认证':'未认证'}}</i>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div class="dui-popover popover-wo" 
        style="width: 120px" 
        v-show="popoverWo"
        v-bind:style="{
          'top':popoverTop+'px', 
          'right': popoverWoRight+'px'}"
        v-on:mouseover="popoverWo = true"
        v-on:mouseleave="popoverWo = false">
        <div class="dui-popover-content" 
          style="text-align: center;line-height: 30px;">
          <div>
            <a class="underline" href="javascript:void(0);" 
              v-on:click="adviceDialog = true">反馈问题</a></div>
          <div>
            <a class="underline" href="javascript:void(0);"  
              v-on:click="jump('workOrder')">反馈列表</a></div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div class="dui-popover popover-help" style="width: 120px" 
        v-show="popoverHelp"
        v-bind:style="{
          'top':popoverTop+'px', 
          'right': popoverHelpRight+'px'}"
        v-on:mouseover="popoverHelp = true"
        v-on:mouseleave="popoverHelp = false">
        <div class="dui-popover-content" 
          style="text-align: center;line-height: 30px;">
          <div><a class="underline" target="_blank"
            v-on:click="jump('help','/ct_skill',true)">帮助文档</a></div>
          <div><a class="underline" target="_blank"
            v-on:click="jump('help','/videos',true)">教学视频</a></div>
          <div><a class="underline" target="_blank"
            v-on:click="jump('help','/ct_faq',true)">常见问题</a></div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div class="dui-popover popover-msg" 
        v-if="unreadNum"
        v-show="popoverMsg" 
        v-bind:style="{'top': popoverTop + 'px'}"
        v-on:mouseover="popoverMsg = true"
        v-on:mouseleave="popoverMsg = false">
        <div class="dui-popover-header">消息通知
          <el-button class="ai-btn--text"
            v-if="user.identityType != 0"
            v-on:click="jump('message','#/subscribe')">消息订阅
          </el-button>
        </div>
        <div class="dui-popover-content">
          <transition-group name="el-fade-in">
            <div class="list-item" 
              v-if="item"
              v-for="(item, index) in unreadList"
              v-bind:key="index.toString()"
              v-on:mouseover="hover = item.messageId"
              v-on:mouseleave="hover = ''">
              <svg class="icon" aria-hidden="true" 
                v-show="hover === item.messageId" 
                v-on:click="handleMsgMark(item)">
                <use xlink:href="#icon-shibai"></use>
              </svg>
              <div class="msg-box" 
                v-on:click="viewMessage(item)">
                <p class="msg-title ellipsis">{{item.title}}
                  <span class="msg-tip float_right" v-show="hover !== item.messageId">
                    {{item.createTime ? item.createTime.substring(5) : ''}}
                  </span>
                </p>
                <p class="msg-tip" 
                  v-if="item.sender">发送人： {{item.sender}}</p>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="dui-popover-footer">
          <el-button class="ai-btn--text" v-on:click="jump('message')">查看更多消息</el-button>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div class="dui-popover popover-user" 
        v-show="popoverUser"
        v-bind:style="{'top': popoverTop + 'px'}"
        v-on:mouseover="popoverUser = true"
        v-on:mouseleave="popoverUser = false">
        <div class="dui-popover-content">
          <div class="head-info">
            <span class="head-icon">
              <svg class="icon icon-user-head" aria-hidden="true">
                <use xlink:href="#icon-morentouxiang"></use>
              </svg>
            </span>
            <div style="min-height: 35px;">
              <p>{{user.company&&user.company.shortName}}</p>
              <p v-if="user.email">{{user.email}}</p>
              <p v-else-if="user.mobile">{{user.mobile}}</p>
            </div>
            <div class="version-info">
              <label style="color: #666;">当前版本：</label>
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-version-' + version"></use>
              </svg>
              <span style="color: #333;">{{account.info.version_name}}</span>
            </div>
          </div>
          <el-button class="btn-upgrade" type="warning"
            v-if="account.info.version_name
                  &&account.info.version_name.indexOf('Free') > -1"
            v-on:click="menuClick('commerce')" >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shengji"></use>
            </svg>升级Pro版
          </el-button>
        </div>
        <div class="dui-popover-content" 
          style="border-top: 1px solid  #e5e5e5;">
          <div class="uinfo" 
            v-on:click="jump('account')">
            <i class="icon icon-jibenziliao iconfont"></i>
            基本资料
          </div>
          <div class="uinfo" 
            v-on:click="jump('account','#/AutoAuth', false, true)">
            <i class="icon icon-shimingrenzheng iconfont"></i>
            实名认证
          </div>
          <div class="uinfo" 
            v-if="user.identityType !== 2" 
            v-on:click="jump('account','#/ProjectGroup/List', false)">
            <i class="icon icon-xiangmuzu iconfont"></i>
            项目组
          </div>
          <div class="uinfo"  
            v-if="user.identityType === 2"
            v-on:click="dialogBeCompany=true">
            <i class="icon icon-chengweiqiyekaifazhe iconfont"></i>
            成为团队开发者
          </div>
          <div class="uinfo" 
            v-if="user.identityType === 1" 
            v-on:click="jump('account','#/ProjectGroup/MemberList')">
            <i class="icon icon-chengyuanguanli iconfont"></i>
            <el-badge class="member_management"
              v-if="unAuditNum" 
              v-bind:value="unAuditNum" 
              v-bind:max="99">成员管理</el-badge
            ><template v-else>成员管理</template>
          </div>
          <div class="uinfo" 
            v-if="user.identityType === 1" 
            v-on:click="dialogTransferCompany=true">
            <i class="icon icon-zhuanrangqiye iconfont"></i>
            移交团队
          </div>
          <div class="uinfo" 
            v-if="user.identityType === 0" 
            v-on:click="dialogLeaveCompany=true">
            <i class="icon icon-tuichuqiye iconfont"></i>
            退出团队
          </div>
        </div>
        <div class="dui-popover-footer">
          <button class="ai-btn--text" v-on:click="logout">退出登录</button>
        </div>
      </div>
    </transition>
  </div>
  

  <!-- 成为团队开发者方式 -->
  <chooseWay 
    v-on:handleClose="handleClose"
    v-bind:dialogBeCompany="dialogBeCompany" ></chooseWay>

  <!-- 移交团队 -->
  <TransferCompanyDialog 
    v-if="user.identityType === 1"
    v-on:handleClose="handleClose" 
    v-bind:dialogTransferCompany="dialogTransferCompany" 
    v-bind:AJAX="AJAX" 
    v-bind:AlertMsg="AlertMsg"
    v-bind:user="user"></TransferCompanyDialog>

  <!-- 退出团队 -->
  <LeaveCompanyDialog 
    v-on:handleClose="handleClose" 
    v-bind:dialogLeaveCompany="dialogLeaveCompany" 
    v-bind:AJAX="AJAX" 
    v-bind:user="user" 
    v-bind:AlertMsg="AlertMsg"></LeaveCompanyDialog>
  
  <!--创建加入团队提示-->
  <JoinGroupTipDialog
    v-on:handleClose="closeDaligGroup" 
    v-bind:visibleJoinGroup="visibleJoinGroup"
    v-bind:menuType="menuType">
  </JoinGroupTipDialog>
  <!--消息框-->
  <ai-message v-bind:show.sync="aimessage.show"></ai-message>
  <join-other-group 
    v-bind:AJAX='AJAX'
    :AlertMsg='AlertMsg' ></join-other-group>
</div>
</template>
<script>
import mixins from '../mixins'
import throttle from 'throttle-debounce/throttle'
import chooseWay from '../dialog/chooseWay.vue'
import TransferCompanyDialog from '../dialog/transferCompany.vue'
import LeaveCompanyDialog from '../dialog/leaveCompany.vue'
import JoinGroupTipDialog from '../dialog/joinGroupTip.vue'
import search from '../components/search.vue'
import AiMessage from '../components/ai-message.vue'
import joinOtherGroup from '../dialog/joinOtherGroup.vue'
const showMenu = ['index','product','skill','resource','download']
const homeMenu = [
  { menu: 'index', name: '总览', href: '/console/home/index.html' },
  { menu: 'product', name: '产品', href: '/console/product/index.html' },
  { menu: 'skill', name: '技能', href: '/console/skill/index.html' },
  { menu: 'resource',name: '资源', href: '/console/resource/index.html'},
  { menu: 'download',name: '下载', href: '/download/sdkDownload' },
  { menu: 'commerce',name:'商业化',href:'/console/boss/index.html'},
  { menu: 'account', name:'账户中心',href:'/console/account/index.html'},
  { menu: 'capital', name:'财务中心',href:'/console/capital/index.html'},
  { menu: 'workOrder', name:'反馈列表', href:'/console/feedback/index.html'},
  { menu: 'help', name:'帮助中心',href:'/docs'},
  { menu: 'message', name:'消息中心', href:'/console/message/index.html'}
]

// console.log({mixins})
export default {
  name:'AiTopNav',
  mixins:mixins,
  props: {
    searchShow:{default:false},
    user:{default:()=>{},required: true,},
    account:{default:{},required: true,},
    company:{default:{},required: true,},
    route:{default:{},required: true,},
    wo:{default:{},required: true,},
    menuList:{default:()=>[]},
    requestMethod:{},
    alertMsg:{type:Function},
    notify:{type:Function}
  },
  data () {
    return {
      aimessage:{
        show:false
      },
      // 成员管理邀请数量
      unAuditNum:0,
      unreadNum:'',
      menu_list:[],
      popoverMsg: false,
      popoverUser: false,
      popoverHelp: false,
      popoverWo: false,
      showTooltip: '',
      popoverTop: 59,
      popoverWoRight: 15,
      popoverHelpRight: 15,
      hover: '',
      containerHeight:'',
      dialogBeCompany: false,
      dialogTransferCompany: false,
      dialogLeaveCompany: false,
      AlertMsg: {},
      searching:false,
      // searchTxt: '',
      // showSearchType: false,
      visibleJoinGroup: false,
      menuType: ''
    }
  },

  components: {
    // AiSearchTip,
    chooseWay,
    search,
    TransferCompanyDialog,
    LeaveCompanyDialog,
    JoinGroupTipDialog,
    AiMessage,
    joinOtherGroup
  },
  watch: {
    unreadNum(){
      const list = this.unreadList.filter((item) => item !== '')
      if (!list.length) {
        this.popoverMsg = false
      }
    },
    ['user.userId']:{       
      handler(val){
          val && (this.user.identityType === 1) && this.beginIntervalCheck()
          val && this.loginCheck()
      },
      immediate:true
    },
    'route' (val) {
      this.$refs.search.searchTxt = this.route.params && this.route.params.stxt
      this.$refs.search.showSearchType = this.route.params && this.route.params.rt
      if(this.$refs.search.searchTxt && this.$refs.search.showSearchType){
        this.searching = true
      }
    },
    AJAX:{
      handler:function(){
        this.AJAX.interceptors &&
        this.AJAX.interceptors.request &&
        (typeof this.AJAX.interceptors.request.use == 'function') &&
        this.AJAX.interceptors.request.use(function(config){
          delete config.headers.common.Authorization
          return config
        }, error => {
          //请求错误时做些事
          return Promise.reject(error)
        })
      },
      immediate:true
    }
  },
  computed: {
    AJAX(){
      return this.requestMethod ? this.requestMethod : this.$http;
    },
    homeMenu(){
      return this.menu_list.filter((item)=>{
        return ~showMenu.indexOf(item.menu)
      })
    },
    version () {
      let version = ''
      if (this.account.info.version_name) {
        const versionName = this.account.info.version_name
        if (versionName.indexOf('Pro') > -1) version = 'pro'
        if (versionName.indexOf('Free') > -1) version = 'free'
      }
      return version
    },
    adviceDialog: {
      get () {
        return this.wo.adviceDialog
      },
      set (val) {
        this.$emit('adviceDialogChange',val)
      }
    }  
  },
  
  methods: {
    auditChange(){
      this.$emit('change','audit')
    },
    menuClick(item) {
      if(typeof item === 'string') {
        item = this.getMenu("menu", item)
      }
      // 团队成员没有进入商业化和财务中心的权限
      if (this.user.identityType === 0 && (item.menu === 'commerce' || item.menu === 'capital')){
        this.AlertMsg({
          type: 'warning',
          message: '你没有该权限'
        })
        return 
      }
      // 团队账户没有项目组
      if (this.user.identityType !== 2 && this.user.groupList&&this.user.groupList.length===0) {
        if (item.menu=== 'product'||item.menu=== 'skill'||item.menu=== 'commerce') {
          this.visibleJoinGroup = true
          if(item.menu === 'product') {this.menuType="产品"}
          if(item.menu === 'skill') {this.menuType="技能"}
          if(item.menu === 'commerce') {this.menuType="订单"}
          return
        }
      }
      this.jump(item.menu)
    },
    closeDaligGroup () {
      this.visibleJoinGroup = false
    },
    getMenu(key,val){
      return this.menu_list.find(m => m[key] == val) || {}
    }, 
    jump(menuName,suffix='',newBlank, isRefresh){
      const _refresh = isRefresh ? '?'+(+new Date()) : ''
      let href = this.getMenu('menu',menuName).href + _refresh + suffix;
      newBlank && window.open(href);
      !newBlank && (window.location.href = href);
    },
    handleIconMouseOver (e, key) {
      this.showTooltip = key
      const userBtnWidth = this.$refs.userBtn.clientWidth
      if (key === 'wo') {
        this.popoverWo = true
        // 135
        this.popoverWoRight = userBtnWidth + 135

      } else if (key === 'help') {
        this.popoverHelp = true
        // 85
        this.popoverHelpRight = userBtnWidth + 85
      } else if (key === 'msg') {
        this.popoverMsg = true
      } else if (key === 'user') {
        this.popoverUser = true
      }
    },
    handleIconMouseLeave (key) {
      this.showTooltip = ''
      if (key === 'wo') {
        this.popoverWo = false
      } else if (key === 'help') {
        this.popoverHelp = false
      } else if (key === 'msg') {
        this.popoverMsg = false
      } else if (key === 'user') {
        this.popoverUser = false
      }
    },
    handleMsgMark (msg) { // 标记消息为已读
      if (msg && this.user.userId) {
        this.setMessageReaded({
          messageIds: [msg.messageId]
        })
      }
    },
    viewMessage (message) { //点击消息详情
      this.setMessageReaded({
        messageIds: [message.messageId],
      })
      this.jump('message','#/'+message.messageId)
    },
    logout (command) {
      this.loginout()
    },
    handleResize () {
      const topnav = this.$refs.topnav
      if (topnav) {
        var h = topnav.clientHeight
        this.popoverTop = h + 3;
        if(this.containerHeight!= h) this.$emit('heightChange',h);
        this.containerHeight = h;
      }
    },
    mergeMenu(arr1,arr2,key){
      return  arr1.map((item)=>{
                  let index = null;
                  let bSwitch = arr2.some((i,ind)=>{
                      if(i[key] == item[key]){
                        index = ind;
                        return true
                      }
                      return false
                  })
                  return bSwitch ? arr2[index] : item;
              })
    },
    handleClose(){
      this.dialogBeCompany = false
      this.dialogTransferCompany = false
      this.dialogLeaveCompany = false
    },
    messages_sync(){
      this.AJAX.get(`/console/api/v1.0/messages/sync`,{baseURL:'/'})
    },
  },
  mounted: function () {
    this.AlertMsg =  this.alertMsg ? this.alertMsg : this.Alert || function(params){alert(params.message)};
    this.Notify = this.notify ? this.notify : this.$notify.info;

    this.menu_list = this.mergeMenu(homeMenu,this.menuList,'menu');
    this.throttledResizeHandler = throttle(200, this.handleResize)
    this.throttledMouseoverHandler = throttle(200, this.handleMouseover)
    window.addEventListener('resize', this.throttledResizeHandler)
    this.$nextTick(()=>{
      this.handleResize()
      this.beginIntervalRun()
    })
    this.messages_sync()

  },
 
  beforeDestroy: function () {
    window.removeEventListener('resize', this.throttledResizeHandler)
  }
}
</script>
<style lang="scss" scoped>
  @import '../styles/index.scss';
  @import '../styles/common.scss';
  @import '../styles/transition.scss';
</style>
<style lang='scss'>
  @import '../styles/reset.scss';
</style>