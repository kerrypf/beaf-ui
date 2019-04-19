export default {
	methods:{
		// 获取未读消息数量，显示最新5条未读消息
		getUnreadMessageNum(){
			this.AJAX.get(`/console/api/v1.0/messages/unreadNum`,{baseURL:'/'}).then((response) => {
			  if (response.data.errId === 0) {
			  	this.GET_UNREAD_MESSAGES_NUM(response.data.num)
			    if (response.data.num) {
			      const messages = response.data.result.messages
			      const filter = messages.filter(item => !item.notifyStatus)
			      const unNotifyList = filter.length ? filter.slice(0, 5) : []
			      const diff = this.getDiffentMsg(messages, this.unreadList)
			      diff.length && diff.map((item) => {
			        if (item.messageId) {
			        	this.getMessageContent({
				            messageId: item.messageId,
				            index: item.index,
				            notify: unNotifyList.filter(msg => msg.messageId === item.messageId).length
				        })
			        } else {
			        	this.GET_MESSAGE_CONTENT({
				            messageCont: '',
				            index: item.index
				        })
			        }
			      })
			      unNotifyList.length && unNotifyList.map(item => {
			        const filter = diff.filter(msg => msg.messageId === item.messageId)
			        if (!filter.length) {
			        	this.getMessageContent({
				            messageId: item.messageId,
				            index: null,
				            notify: true
				        })
			        }
			      })
			    }
			  } else {
			    if (this.unreadList.length) {
			      this.INIT_UNREADLIST()
			    }
			  }
			}, (response) => {})
		},
		// 获取指定消息的内容
		getMessageContent({
			messageId,
			index,
			notify
			}) {
			this.AJAX.get(`/console/api/v1.0/messages/content/${messageId}`,{
				baseURL:'/'
			}).then((response) => {
			  if (response.data.errId === 0) {
			    const messageCont = response.data.result
			    if (index !== null) {
			    	this.GET_MESSAGE_CONTENT({
				        messageCont: messageCont,
				        index: index
				    })
			    }
			    if (notify) {
			      	this.Notify({
				        customClass: 'ai-notify--msg',
				        message: messageCont.title,
				        onClick: () => {

				          // window.location = '/console/message/index.html#/' + messageCont.messageId
				          this.setMessageReaded({ messageIds: [messageCont.messageId] })
				          window.location = this.getMenu('menu','message').href+'#/' + messageCont.messageId
				        },
				        offset: 50
				    })
			    }
			  } else {
			    this.AlertMsg({
			      type: 'error',
			      message: response.data.error
			    })
			  }
			}, (response) => {})
		},
		// 将消息标记为已读
		setMessageReaded({ messageIds }) {
			this.AJAX.put(`/console/api/v1.0/messages/mark`, {
			  messageIds: messageIds
			},{baseURL:'/'}).then((response) => {
			  if (response.data.errId === 0) {
			    this.INIT_UNREADLIST(messageIds)
			    this.getUnreadMessageNum();
			    this.$emit('messageReaded',messageIds)
			    this.AlertMsg({
			      type: 'success',
			      message: '标记为已读成功！'
			    })
			  } else {
			    this.AlertMsg({
			      type: 'error',
			      message: response.data.error
			    })
			  }
			}, (response) => {})
		},
		getDiffentMsg (messages, unreadList) {
			let result = []
			for (let i = 0; i < 5; i++) {
			  if (unreadList[i] && messages[i].messageId === unreadList[i].messageId) {
			    continue
			  } else if (unreadList[i] === '' && messages[i] === undefined) {
			    continue
			  } else {
			    result.push({
			      index: i,
			      messageId: messages[i] ? messages[i].messageId : ''
			    })
			  }
			}
			return result
		},
		beginIntervalRun() { 
			clearTimeout(this.timer);
			this.getUnreadMessageNum(); //轮询调接口查询未读消息数量
			// this.getUnAuditNum() // 轮询未审核申请数量
			this.timer = setTimeout(()=>{
							this.beginIntervalRun()
						},this.unreadInterval)
			
		},
		beginIntervalCheck(){
			clearTimeout(this.timer2);
			this.getUnAuditNum() // 轮询未审核申请数量
			this.timer2 = setTimeout(()=>{
							this.beginIntervalCheck()
						},this.unreadInterval)
		},
		getUnAuditNum(){
			this.AJAX.get('/permission/invitation/applicationInfo?userId='+this.user.userId,{baseURL:'/'})
	    		.then((res)=>{
	    			let resData = res.code === undefined ? res.data : res;
	    			if(resData.code == '0'){
	    				let {number, info} = resData.data
	    				this.unAuditNum = number

	    				number 
	    					&& this.$emit('change','invite',{
	    						unAuditNum:number,
	    						unAuditList:info,
	    					})
	    			}
	    		})
		},
	  	'GET_UNREAD_MESSAGES_NUM' (unreadNum) {
      		this.unreadNum = unreadNum
    	},
	    'INIT_UNREADLIST' ( messageIds) {
	      if (messageIds) {
	        this.unreadList.map((item, index) => {
	          if (messageIds.indexOf(item.messageId) > -1) {
	            this.unreadList[index] = ''
	          }
	        })
	      } else {
	        this.unreadList = ['', '', '', '', '']
	      }
	    },
	    'GET_MESSAGE_CONTENT' ({ messageCont, index }) {
	      let unreadListNew = []
	      if (this.unreadList.length) {
	        this.unreadList.map((item, i) => {
	          if (i === index) {
	            unreadListNew.push(messageCont)
	          } else {
	            unreadListNew.push(item)
	          }
	        })
	      }
	      this.unreadList = unreadListNew
	    }
	},
	data(){
		return {
			defaultPageSize: 20, // 默认每页消息数目
			unreadInterval: 10000, // 轮询未读消息间隔
			newestMsgIdList: [],
			unreadNum: 0,
    		unreadList: ['', '', '', '', ''],
    		timer:null,//轮询定时器
    		unAuditNum: 0,
    		unAuditList:[],
    		timer2:'',
		}
	},
	created(){
		// this.$emit('change','invite',{a:'aaa'})
	}
}