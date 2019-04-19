<template>
	<side-wrap :foldWidth='foldWidth'
			:unfoldWidth='unfoldWidth'
			:hoverSpread='hoverSpread'
			:transTime='transTime'
			:initialFold='initialFold'
	>
		<el-menu :default-active="activeSubMenu" ref="subMenuNav" @select="subMenuSelect">
          <template v-for="(item,index) in authCheckMenus">
            <el-menu-item :key="(index + 1).toString()" :index="item.path" v-if="item.path && !item.childs">
              <div v-if="item.parent"
                :class="{'menu-group': item.parent!==item.path, 'is-active-menu-group': $route.path && $route.path.indexOf(item.parent)>-1}">
                <svg class="icon" aria-hidden="true" v-if="item.icon">
                  <use :xlink:href="activeSubMenu === item.path || $route.path && $route.path.indexOf(item.parent)>-1 ? (item.icon + '-active') : item.icon"></use>
                </svg>
                <span :class="item.class"><span class="disc" v-if="item.disc">●</span>{{item.name}}</span>
              </div>
              <div v-else>
                <svg class="icon" aria-hidden="true" v-if="item.icon">
                  <use :xlink:href="activeSubMenu === item.path ? (item.icon + '-active') : item.icon"></use>
                </svg>
                <span :class="item.class">{{item.name}}</span>
              </div>
            </el-menu-item>
            <el-submenu :index="index.toString()" v-else-if="!item.path && item.childs">
              <template slot="title">
                <div>
                  <svg class="icon" aria-hidden="true" v-if="item.icon">
                    <use :xlink:href="activeSubMenu === index.toString() ? (item.icon + '-active') : item.icon"></use>
                  </svg>
                  <span :class="item.class">{{item.name}}</span>
                </div>
              </template>
              <el-menu-item :key="(index + 1).toString() + '-' + (idx + 1).toString()" :index="child.path" v-for="(child,idx) in item.childs">
                <div>
                	<svg class="icon" aria-hidden="true" v-if="child.icon">
	                  <use :xlink:href="activeSubMenu === child.path ? (child.icon + '-active') : child.icon"></use>
	                </svg>
                	<span :class="child.class">{{child.name}}</span>
               	</div>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
	</side-wrap>
</template>
<script >
	import sideWrap from './wrap.vue'
	export default{
		name:'AiSideNav',
		props:{
			foldWidth:{type:String,default:'59px'},//折叠时宽度
			unfoldWidth:{type:String,default:'179px'},//展开时宽度
			hoverSpread:{type:Boolean,default:true},//hover时展开
			transTime:{type:String,default:'.3s'},//展开过渡时间
			initialFold:{type:Boolean,default:false},//初始是否折叠
			authCheckMenus:{type:Array,required:true},
		},
		data(){
			return {
				activeSubMenu:'',
				// authCheckMenus:[{
				// 	// icon:"#icon-ziliaoguanli",
				// 	icon:'#icon-menu-skill',
				// 	name:"资料管理",
				// 	path:"/",
				// },{
				// 	icon:"#icon-caozuorizhi",
				// 	name:"操作动态",
				// 	path:"/Dynamic",
				// },{
				// 	icon:"#icon-apijianquan",
				// 	name:"API授权",
				// 	path:"/APIAuthorize/list",
				// }]
			}
		},
		computed:{
			menuList(){
				var list = [],arr=[].concat(this.authCheckMenus);
				while(arr.length){
					let item = arr.shift();
					item.childs && arr.push(...item.childs);
					item.path && list.push(item.path);
				}
				return list;				
			}
		},
		methods:{
			close(){
				this.activeSubMenu = ''
			},
			isHref(submenuKey){
				return /^((http:\/\/)|(https:\/\/))/.test(submenuKey)
			},
			subMenuSelect (submenuKey, submenuPath) {
		      	this.isHref(submenuKey) ? (window.location.assign(submenuKey)):this.$router.push(submenuKey) 
		    },
		    getActiveSubMenu(){
		    	if (this.$route.path && this.$route.path !== this.activeSubMenu) {
		        	this.setActiveSubMenu(this.$route.path)
			        if (this.$route.name && this.$route.name !== this.activeSubMenu) {
			          if (~this.$route.name.indexOf('-')) {
			            const arr = this.$route.name.split('-')
			            this.activeSubMenu = arr[0]
			          } else {
			          	this.setActiveSubMenu(this.$route.name)
			          }
			        }
		      	}
		    },
		    setActiveSubMenu(path){
		    	if(~this.menuList.indexOf(path)){
			       	this.activeSubMenu = path;
			    }
		    }
		},
		mounted(){
			this.getActiveSubMenu()
		},
		watch:{
			['$route.path'](val){
				this.getActiveSubMenu()
			},
		},
		components:{
			sideWrap
		}
	}
</script>
<style lang='scss'>
	@import '../styles/index.scss'
</style>