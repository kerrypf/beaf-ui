/**
 * @description  获取元素距离页面的距离
 * @param       {[type]} element dom节点
 * @param      {[type]}  direction 方向  水平或垂直    
 */
export function getOffset(element,direction){
		let dir = direction=='left'? 'scrollLeft' : 'scrollTop';
	 	
        return element.getBoundingClientRect()[direction]+document.documentElement[dir];
}


/**
 * @description  获取圆心坐标
 * @param       {[type]} element dom节点
 */
export function getCircleCoord(element){
	let res = {};
	res.x = getOffset(element,'left') + element.offsetWidth/2;
	res.y = getOffset(element,'top') +	element.offsetHeight/2;
	return res;
}

