/**
 * [decelMotion description]
 * @description   缓动效果
 * @param     {[element]} node [滚动节点]
 * @param     {[Number]} target[终点距离最上方的距离，0为滚动到顶]
 * @param     {[Number]} speed [速度斜率，数值越大，速度越慢]
 * @param     {[Number]} minSpeed [最小速度]
 */
const option = {
	node:document.documentElement,
	target:0,
	speed:6,
	minSpeed:10
}
export default function decelMotion(opt){ //减速 speed越大越慢
	opt = Object.assign(option,opt);
	clearTimeout(decelMotion.timer);
	opt.target = opt.target > 0 ? opt.target : 0;
	window.addEventListener('mousewheel',eventFn)
    decelMotion.timer = setTimeout(motionFn,10)
    function motionFn() {
        let current = opt.node.scrollTop - opt.target;
        let distance =  Math.ceil(current/opt.speed);
        distance = distance > opt.minSpeed ? distance : current >= opt.minSpeed ? opt.minSpeed : current;
        current -= distance//做减速运动
        opt.node.scrollBy(0, -distance);
        if (current == 0) {
            clearTimeout(decelMotion.timer);
            window.removeEventListener('mousewheel',eventFn)
        }else{
        	decelMotion.timer = setTimeout(motionFn,10)
        }
       
    }
    
    function eventFn(){
		clearTimeout(decelMotion.timer);
		window.removeEventListener('mousewheel',eventFn)
	}

}
