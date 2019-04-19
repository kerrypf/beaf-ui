/**
* alert提示信息
**/
import '../styles/index.scss'
// import { Message } from 'element-ui'
// import Vue from 'Vue';
// import MessageConst from './index.js'
// let Message = MessageConst(Vue)

function messageCreate(Vue,Message){
	const errorText = {
	  400: '请求出错',
	  401: '未授权',
	  403: '禁止访问',
	  404: '服务器找不到给定的资源',
	  405: '方法不被允许',
	  406: '不可接受',
	  407: '要求代理身份验证',
	  408: '请求超时',
	  409: '冲突',
	  410: '已失效',
	  411: '需要内容长度头',
	  412: '前提条件失败',
	  413: '请求实体过长',
	  414: '请求网址过长',
	  415: '不支持的媒体类型',
	  416: '请求范围无法满足',
	  417: '预期结果失败',
	  500: '服务器出错',
	  501: '未实现',
	  502: '网关出错',
	  503: '服务不可用',
	  504: '网关超时',
	  505: 'HTTP版本不支持'
	  // 'Webhook timeout': '【技能名称】数据源响应超时，暂时不能为你提供服务',
	  // 'Webhook invalid': '【技能名称】数据源无效，暂不能提供服务',
	  // 'Semantic parsing failure': '语义解析失败',
	  // 'localhook timeout': '【技能名称】本地hook响应超时，暂时不能为你提供服务',
	  // 'Api can not be null': '数据源不可为空'
	}
	return function (paramObj) {
	  if (typeof paramObj === "number" && errorText[paramObj]) {
	    Message({
	      customClass: 'ai-message-error',
	      iconClass:  'iconfont icon-message-error icon-ai icon-ai-dui-error',
	      message: errorText[paramObj]
	    })
	  } else {
	    let customClass = 'ai-message-info'
	    let iconClass = 'iconfont icon-message-info icon-ai icon-ai-dui-info'
	    if (paramObj.type === 'success' || paramObj.type === 'error' || paramObj.type === 'warning') {
	      customClass = 'ai-message-' + paramObj.type
	      iconClass = 'iconfont icon-ai icon-message-' + paramObj.type +' icon-ai-dui-' + paramObj.type
	    }
	    const paramObjNew = {
	      customClass: customClass,
	      iconClass: iconClass,
	    }
	    Object.keys(paramObj).map(item => {
	      if (item !== 'customClass' && item !== 'iconClass') {
	        paramObjNew[item] = paramObj[item]
	      }
	    })
	    if(paramObj.message!= undefined){
	    	String(paramObj.message) && Message(paramObjNew)
	    }
	    
	  }
	}
}
// function isVue(vue){
// 	return ~vue.name.indexOf('Vue')
// }

export default function (Vue,message){
	// if(!isVue(Vue)){
	// 	throw new Error('Alert components error : arguments Vue is not correct')
	// 	return
	// }

	if(typeof message !== 'function'){
		return new Promise((resolve,reject)=>{
				require.ensure(['./index.js'],()=>{
					let MessageConst = require('./index.js').default
					let Message = MessageConst(Vue)
					resolve(messageCreate(Vue,Message))
				},'alert')
			})
	}
	return messageCreate(Vue,message)
}