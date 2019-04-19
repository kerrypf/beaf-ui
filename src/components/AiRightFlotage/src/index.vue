<template>
	<div class="shortcut-box AiRightFlotage">
	    <transition name="el-fade-in-linear">
	      <div class="dui-popover" v-show="shortcut=='bangzhu'" style="right: 50px;">
	        <div class="question-box">
	          <i class="el-icon-close" @click="setShortCut"></i>
	          <ul>
	            <li class='question-list' v-for='item in hrefList'>
	            	<a :href="item.url" target="_blank">{{item.describe}}</a>	
	            </li>
	          </ul>
	        </div>
	      </div>
	    </transition>
	    <div class="bangzhu-fankui">
	      <div :class="{'shortcut-list': true, 'active': shortcut==='bangzhu'}" @click.stop="shortcut='bangzhu'">
	        <!-- <svg class="icon icon-ai" aria-hidden="true">
	          <use xlink:href="#icon-shortcut-bangzhu #icon-ai-shortcut-bangzhu"></use>
	        </svg> -->
	        <i class="icon iconfont icon-ai icon-ai-shortcut-bangzhu icon-shortcut-bangzhu"></i>
	        <span @click="shortcut = 'bangzhu'" id="btn-bangzhu">帮助</span>
	      </div>
	      <div :class="{'shortcut-line': true, 'active': shortcut}"></div>
	      <div :class="{'shortcut-list': true, 'active': shortcut==='fankui'}" @click.stop="shortcut='fankui'">
	        <!-- <svg class="icon icon-ai" aria-hidden="true">
	          <use xlink:href="#icon-shortcut-fankui #icon-ai-shortcut-fankui"></use>
	        </svg> -->
	        <i class="icon iconfont icon-ai icon-ai-shortcut-fankui icon-shortcut-fankui"></i>
	        <span @click="handleAdvice">反馈</span>
	      </div>
	    </div>
	    <transition name="scroll-top-fade">
	      <div class="scrolltop" v-show="showScrollTopBtn" @click="scrollTop" :class="{'pevNone':pevNone}">
	        <!-- <svg class="icon icon-ai" aria-hidden="true">
	          <use xlink:href="#icon-scrolltop #icon-ai-scrolltop"></use>
	        </svg> -->
	        <i class="icon iconfont icon-ai icon-ai-scrolltop icon-scrolltop"></i>
	      </div>
	    </transition>
	</div>
</template>
<script >
	// import decelMotion from '../../utils/motion.js';
	import throttle from 'throttle-debounce/throttle'
	const hostArr = location.host.split('.')
	const primaryDomain = hostArr.slice(hostArr.length-2).join('.')
	const prodHost = `https://www.${primaryDomain}`
	const hrefObj = [
		{url:prodHost+'/docs/ct_skill', describe:'如何创建技能？'},
		{url:prodHost+'/docs/ct_prouctsetup', describe:'如何创建产品？'},
		{url:prodHost+'/docs/ct_faq', describe:'常见问题'}
	]
	export default{
		name:'AiRightFlotage',
		props:{
			scrollBody:{default:()=>document.documentElement},
			threshold:{type:Number},
			// hrefList:{default:()=>{return hrefObj}},
		},
		data(){
			return{
				shortcut:'',
				showScrollTopBtn:false,
				threshold_num:0,
				coefficient:0,
				pevNone:false,
				scrollListener:'',
				hrefList:hrefObj,
			}
		},
		methods:{
			setShortCut(prop){
				this.shortcut = prop;
			},
			handleAdvice(){
				this.$emit('showAdviceDialog')
			},
			scrollTop(){
      			this.$util.motion({
      				node:this.scrollBody,
      				target:0
      			})
			},
			handleClick(e){
				if(!this.$el.querySelector('.dui-popover').contains(e.target)){
					this.shortcut = '';
				}
			},
			handleScroll(){
				;(throttle(200,()=>{
					clearTimeout(this.handleScroll.timer) 
					this.pevNone = true	;
					this.handleScroll.timer = setTimeout(()=>{
						this.pevNone = false;
					},30)

					this.showScrollTopBtn = this.scrollBody.scrollTop >= this.threshold_num;
				}))()
				
			},
			render(){
				let sbody = this.scrollBody;
				if(sbody && sbody.nodeType === 1){
					this.scrollListener = sbody==document.documentElement ? window : sbody;
					this.threshold_num = this.threshold ? this.threshold : sbody.clientHeight / 2;
					document.addEventListener('click',this.handleClick)
					this.scrollListener.addEventListener('scroll',this.handleScroll)
				}
				
			}
		},
		watch:{
			scrollBody(){
				this.render()
			}
		},
		mounted(){
			this.render();
		},
		beforeDestroy(){
			document.removeEventListener('click',this.handleClick);
			this.scrollListener.removeEventListener('scroll',this.handleScroll)
		}
	}
</script>
<style lang='scss'>
	@import '../styles/index.scss'
</style>