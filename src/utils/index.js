import PopupManager from './popup.js'
import * as vdom from './vdom.js'
// import * as lang from './lang.js'
// import {
// 	getOffset,
// 	getCircleCoord
// }from './getOffset.js'
// import drag from './drag.js'
// import VALIDATE from './validate.js'
// import motion from './motion.js'

// import storage from './storage.js'
// import {
// 	transitionEvent,
// 	addMounseEvent,
// } from './polyfillProps.js'
// import * as dom from './dom.js'
// let popper = require('./Popper/popper.js')

const utils= {
	PopupManager,
	// ...lang,
	// drag,
	// getOffset,
	// getCircleCoord,
	// transitionEvent,
	// addMounseEvent,
	// VALIDATE,
	// // ...dom,
	// Popper:popper.Popper,
	// motion,
	...vdom
	// storage
}
export default utils