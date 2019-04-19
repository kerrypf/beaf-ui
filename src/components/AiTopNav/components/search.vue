<template>
	<div class="search_wrapper">
		<svg class="icon search_icon" aria-hidden="true" @click="searchDoc">
      		<use xlink:href="#icon-search"></use>
    	</svg>
    	<div class="search_main" >
    		<input maxlength="30" id="search" type="text" name="" growing-track="true" value="" placeholder="输入产品、技能、创建者、文档、API关键词" v-model.trim="searchTxt" v-on:keydown="searchKeyDown" 
    		:class="{showSearchType:showSearchType}">
      		<ai-search-tip :searchTxt="searchTxt" :route='route' v-on:chose="search" ref="searchTip"></ai-search-tip>
      		
    	</div>
      	
      	<i class='el-icon-close' @click='close'></i>
    </div>
</template>
<script type="text/javascript">
import AiSearchTip from 'ai-components/AiSearchTip/v0.1.0/src/index.vue'
	export default{
		props:['route','jump','show'],
		data(){
			return {
				searchTxt: '',
				showSearchType: false
			}
		},
		methods:{
			searchDoc () {
		      this.$refs.searchTip.startSearch()
		    },
		    searchKeyDown (e) {
		      var _res = this.$refs.searchTip.switchlist(e)
		      if (_res === 'del_type') {
		        this.showSearchType = false
		      }
		    },
		    search (searchRT) {
		      if (this.searchTxt === '') return
		      this.showSearchType = true
		      this.jump('index','#/search/' + this.searchTxt + '/' + searchRT)
		    },
		    close(){
		    	this.$emit('update:show',false)
				this.searchTxt = ''
				this.showSearchType = false
				this.$refs.searchTip.tempType = ''
		    }
		},
		components:{
			AiSearchTip
		}
	}
</script>
<style lang='scss' scoped>
	.search_wrapper {
	  	height: 100%;
	  	width:100%;
	  	min-width:400px;
	  	box-sizing: border-box;
	 	padding:0 30px;
	 	position:relative;
	  	.search_icon {
	  		position:absolute;
	  		left:0;
	  		width:21px;
	  		height:22px;
	  		line-height: 40px;
	  		cursor:pointer;
	  		top:50%;
			margin-top:-11px;
			color:#959595;
			fill: currentColor;
			&:hover{
				color:#0097fa;
			}
	  	}
	  	.el-icon-close{
	  		font-size:22px;
	  		position:absolute;
	  		right:0;
	  		top:0;
	  		line-height: 40px;
	  		cursor:pointer;
	  		color:#959595;
	  		&:hover{
	  			color:#0097fa;
	  		}
	  	}
	  	.search_main{
	  		position: relative;
	  		height:100%;
	  		width:100%;
	  		#search{
	  			width:calc(100% - 20px);
	  			height:100%;
	  			border:none;
	  			padding:0 10px;
	  			-webkit-appearance: none;
	  			outline:0;
	  			font-size:14px;
	  			border-bottom:1px solid #ccc;
	  			&:focus{
	  				border-color:#0097fa;
	  			}
	  			&.showSearchType{
	  				text-indent:80px;
	  			}
	  		}
	  	}
	  	#icon-search > path{
			fill:inherit;
		}
	}
</style>
<style lang='scss'>
	.search_wrapper {
		.select-item{
			line-height: 28px;
			top:50%;
			margin-top:-14px;
		}
		.searchTip{
			top:100%;
			width:100%;
		}
	}
</style>