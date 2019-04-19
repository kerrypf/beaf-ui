<template>
	<div class="AiSideNav" >
		<div class='side_nav_main' :style='mainStyle' 
			:class="{'is-fold':isFold}"
			@mouseenter='handle("enter")' 
			@mouseleave='handle("out")'>
			<slot></slot>
		</div>
      	<div class='toggle_icon' @click='toggle'>
      		<!-- <i :class='`iconfont icon-${foldToggle}`'></i> -->
      		<svg class="icon" aria-hidden="true">
              <use :class="'icon-'+ foldToggle" :xlink:href="'#icon-' + foldToggle"></use>
            </svg>
      	</div>
    </div>  
</template>
<script >
	import throttle from 'throttle-debounce/throttle'
	// import 'ASSETS/iconfont/iconfont.css'
	export default {
		props:{
			foldWidth:{type:String,default:'59px'},//折叠时宽度
			unfoldWidth:{type:String,default:'179px'},//展开时宽度
			hoverSpread:{type:Boolean,default:true},//hover时展开
			transTime:{type:String,default:'.3s'},//展开过渡时间
			initialFold:{type:Boolean,default:false}
		},
		data(){
			return{
				fold:true,
				width:'',
				handle:''
			}
		},
		computed:{
			mainStyle(){
				return {
					maxWidth:this.unfoldWidth,
					minWidth:this.foldWidth,
					transition:`width ${this.transTime}`,
					width:this.width,
				}
			},
			foldToggle(){
				return this.fold ? 'unfold' : 'fold';
			},
			isFold(){
				return this.width == this.foldWidth;
			}
		},
		methods:{
			setWidth(){
				this.width = this.fold ? this.foldWidth: this.unfoldWidth;
			},
			toggle(){
				this.fold = !this.fold;
				this.setWidth()
			},
			handleWidth(type){
				if(!this.fold) return;
				if(type === 'enter'){
					this.width = this.unfoldWidth;
				}else{
					this.width = this.foldWidth;
				}
			},
		},
		mounted(){
			this.fold = this.initialFold;
			this.setWidth()
			// this.handle = this.handleWidth
			this.handle = throttle(100,this.handleWidth)
		}
	}
</script>
<style lang='scss'>
	@import '../styles/wrap.scss'
</style>