/*!
 * Vue.js v0.0.1
 * (c) 2014-2019 Kerry
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.BeafUI = factory());
}(this, function () { 'use strict';

	var PopupManager = {
		zIndex: 2018,
		nextZIndex: function() {
	    	return PopupManager.zIndex++;
	  	},
	};

	var isMobile = (function(){
		return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
	})();

	var isMac = (function() {
	        return /macintosh|mac os x/i.test(navigator.userAgent);
	})();

	var isWindows = (function() {
	        return /windows|win32/i.test(navigator.userAgent);
	})();

	var isLinux = (function() {
	        return /linux/i.test(navigator.userAgent);
	})();

	var isChrome =  (function() {
	        return navigator.userAgent.indexOf('Chrome') > -1
	})();
	var isSafari =  (function() {
	       	return navigator.userAgent.indexOf('Safari') > -1
	})();

	var lang = /*#__PURE__*/Object.freeze({
		isMobile: isMobile,
		isMac: isMac,
		isWindows: isWindows,
		isLinux: isLinux,
		isChrome: isChrome,
		isSafari: isSafari
	});

	/**
	 * @description  获取元素距离页面的距离
	 * @param       {[type]} element dom节点
	 * @param      {[type]}  direction 方向  水平或垂直    
	 */
	function getOffset(element,direction){
			var dir = direction=='left'? 'scrollLeft' : 'scrollTop';
		 	
	        return element.getBoundingClientRect()[direction]+document.documentElement[dir];
	}


	/**
	 * @description  获取圆心坐标
	 * @param       {[type]} element dom节点
	 */
	function getCircleCoord(element){
		var res = {};
		res.x = getOffset(element,'left') + element.offsetWidth/2;
		res.y = getOffset(element,'top') +	element.offsetHeight/2;
		return res;
	}

	var isDragging = false;

	function drag(element, options) {
	  var moveFn = function(event) {
	    if (options.drag) {
	      options.drag(event);
	    }
	  };
	  var upFn = function(event) {
	    document.removeEventListener('mousemove', moveFn);
	    document.removeEventListener('mouseup', upFn);
	    document.onselectstart = null;
	    document.ondragstart = null;

	    isDragging = false;

	    if (options.end) {
	      options.end(event);
	    }
	  };
	  element.addEventListener('mousedown', function(event) {
	    if (isDragging) { return; }
	    document.onselectstart = function() { return false; };
	    document.ondragstart = function() { return false; };

	    document.addEventListener('mousemove', moveFn);
	    document.addEventListener('mouseup', upFn);
	    isDragging = true;

	    if (options.start) {
	      options.start(event);
	    }
	  });
	}

	var VALIDATE = {
	  // 字符长度限制，支持min和max，1汉字或汉字字符=3字符
	  charLength: function (rule, value, callback) {
	    var chineseLength = 0;
	    var regStr = /[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\u4e00-\u9fa5]/g;
	    if (value && value.match(regStr)) { chineseLength = value.match(regStr).length; }
	    var len = chineseLength * 2 + (value ? value.length : 0);
	    if ((rule.min && len < rule.min) || (rule.max && len > rule.max)) {
	      if (rule.message) {
	        callback(new Error(rule.message));
	      } else {
	        callback(new Error('长度不合法'));
	      }
	    } else {
	      callback();
	    }
	  },
	  // 中文字母数字下划线
	  normalStr_: function (rule, value, callback) {
	    if (/(^$)|(^[\u4e00-\u9fa5_a-zA-Z0-9]+$)/.test(value)) {
	      callback();
	    } else {
	      if (rule.message) {
	        callback(new Error(rule.message));
	      } else {
	        callback(new Error('只能是中文、字母、数字、下划线'));
	      }
	    }
	  },
	  // 只能是中文或字母
	  chineseOrChar: function (rule, value, callback) {
	    if (/^[\u4e00-\u9fa5a-zA-Z]+$/.test(value)) {
	      callback();
	    } else {
	      if (rule.message) {
	        callback(new Error(rule.message));
	      } else {
	        callback(new Error('只能是中文或字母'));
	      }
	    }
	  },
	  // 中文字母数字下划线
	  normalStr_: function (rule, value, callback) {
	    if (/(^$)|(^[\u4e00-\u9fa5_a-zA-Z0-9]+$)/.test(value)) {
	      callback();
	    } else {
	      if (rule.message) {
	        callback(new Error(rule.message));
	      } else {
	        callback(new Error('只能是中文、字母、数字、下划线'));
	      }
	    }
	  },
	  // 只能是中文或字母
	  chineseOrChar: function (rule, value, callback) {
	    if (/^[\u4e00-\u9fa5a-zA-Z]+$/.test(value)) {
	      callback();
	    } else {
	      if (rule.message) {
	        callback(new Error(rule.message));
	      } else {
	        callback(new Error('只能是中文或字母'));
	      }
	    }
	  },
	  // 检查邮箱
	  checkEmail: function (rule, value, callback) {
	    if (/(^$)/.test(value)) { callback(); }
	    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
	      callback();
	    } else {
	      callback(new Error('邮箱有误'));
	    }
	  },
	  // 检查手机号
	  checkPhone: function (rule, value, callback) {
	    if (/(^$)/.test(value)) { callback(); }
	    if (/^1[34578]\d{9}$/.test(value)) {
	      callback();
	    } else {
	      callback(new Error('手机号码有误'));
	    }
	  }
	};

	/**
	 * [decelMotion description]
	 * @description   缓动效果
	 * @param     {[element]} node [滚动节点]
	 * @param     {[Number]} target[终点距离最上方的距离，0为滚动到顶]
	 * @param     {[Number]} speed [速度斜率，数值越大，速度越慢]
	 * @param     {[Number]} minSpeed [最小速度]
	 */
	var option = {
		node:document.documentElement,
		target:0,
		speed:6,
		minSpeed:10
	};
	function decelMotion(opt){ //减速 speed越大越慢
		opt = Object.assign(option,opt);
		clearTimeout(decelMotion.timer);
		opt.target = opt.target > 0 ? opt.target : 0;
		window.addEventListener('mousewheel',eventFn);
	    decelMotion.timer = setTimeout(motionFn,10);
	    function motionFn() {
	        var current = opt.node.scrollTop - opt.target;
	        var distance =  Math.ceil(current/opt.speed);
	        distance = distance > opt.minSpeed ? distance : current >= opt.minSpeed ? opt.minSpeed : current;
	        current -= distance;//做减速运动
	        opt.node.scrollBy(0, -distance);
	        if (current == 0) {
	            clearTimeout(decelMotion.timer);
	            window.removeEventListener('mousewheel',eventFn);
	        }else{
	        	decelMotion.timer = setTimeout(motionFn,10);
	        }
	       
	    }
	    
	    function eventFn(){
			clearTimeout(decelMotion.timer);
			window.removeEventListener('mousewheel',eventFn);
		}

	}

	var transitionEvent = (function (){
	    var t;
	    var el = document.createElement('fakeelement');
	    var transitions = {
	      'transition':'transitionend',
	      'OTransition':'oTransitionEnd',
	      'MozTransition':'transitionend',
	      'WebkitTransition':'webkitTransitionEnd'
	    };

	    for(t in transitions){
	        if( el.style[t] !== undefined ){
	            return transitions[t];
	        }
	    }
	})();

	var addMounseEvent = (function(window) {        
	        var _eventCompat = function(event) {
	            var type = event.type;
	            if (type == 'DOMMouseScroll' || type == 'mousewheel') {
	                event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / (isMac ? 1 : 3);
	            }
	            return event;
	        };
	        
	        return function(el, type, fn, capture) {
	            if (type === "mousewheel" && document.mozFullScreen !== undefined) {
	                type = "DOMMouseScroll";
	            }
	            el.addEventListener(type, function(event) {
	                fn.call(this, _eventCompat(event));
	            }, capture || false);
	        }
	    })(window);

	var isServer = Vue.prototype.$isServer;
	var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
	var MOZ_HACK_REGEXP = /^moz([A-Z])/;
	var ieVersion = isServer ? 0 : Number(document.documentMode);

	var camelCase = function(name) {
	  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
	    return offset ? letter.toUpperCase() : letter;
	  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
	};

	/* istanbul ignore next */
	var on = (function() {
	  if (!isServer && document.addEventListener) {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.addEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.attachEvent('on' + event, handler);
	      }
	    };
	  }
	})();

	/* istanbul ignore next */
	function hasClass(el, cls) {
	  if (!el || !cls) { return false; }
	  if (cls.indexOf(' ') !== -1) { throw new Error('className should not contain space.'); }
	  if (el.classList) {
	    return el.classList.contains(cls);
	  } else {
	    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
	  }
	}
	/* istanbul ignore next */
	function addClass(el, cls) {
	  if (!el) { return; }
	  var curClass = el.className;
	  var classes = (cls || '').split(' ');

	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) { continue; }

	    if (el.classList) {
	      el.classList.add(clsName);
	    } else if (!hasClass(el, clsName)) {
	      curClass += ' ' + clsName;
	    }
	  }
	  if (!el.classList) {
	    el.className = curClass;
	  }
	}
	/* istanbul ignore next */
	function removeClass(el, cls) {
	  if (!el || !cls) { return; }
	  var classes = cls.split(' ');
	  var curClass = ' ' + el.className + ' ';

	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) { continue; }

	    if (el.classList) {
	      el.classList.remove(clsName);
	    } else if (hasClass(el, clsName)) {
	      curClass = curClass.replace(' ' + clsName + ' ', ' ');
	    }
	  }
	  if (!el.classList) {
	    el.className = trim(curClass);
	  }
	}
	/* istanbul ignore next */
	var getStyle = ieVersion < 9 ? function(element, styleName) {
	  if (isServer) { return; }
	  if (!element || !styleName) { return null; }
	  styleName = camelCase(styleName);
	  if (styleName === 'float') {
	    styleName = 'styleFloat';
	  }
	  try {
	    switch (styleName) {
	      case 'opacity':
	        try {
	          return element.filters.item('alpha').opacity / 100;
	        } catch (e) {
	          return 1.0;
	        }
	      default:
	        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
	    }
	  } catch (e) {
	    return element.style[styleName];
	  }
	} : function(element, styleName) {
	  if (isServer) { return; }
	  if (!element || !styleName) { return null; }
	  styleName = camelCase(styleName);
	  if (styleName === 'float') {
	    styleName = 'cssFloat';
	  }
	  try {
	    var computed = document.defaultView.getComputedStyle(element, '');
	    return element.style[styleName] || computed ? computed[styleName] : null;
	  } catch (e) {
	    return element.style[styleName];
	  }
	};

	/* istanbul ignore next */
	function setStyle(element, styleName, value) {
	  if (!element || !styleName) { return; }

	  if (typeof styleName === 'object') {
	    for (var prop in styleName) {
	      if (styleName.hasOwnProperty(prop)) {
	        setStyle(element, prop, styleName[prop]);
	      }
	    }
	  } else {
	    styleName = camelCase(styleName);
	    if (styleName === 'opacity' && ieVersion < 9) {
	      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
	    } else {
	      element.style[styleName] = value;
	    }
	  }
	}

	var dom = /*#__PURE__*/Object.freeze({
		on: on,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		getStyle: getStyle,
		setStyle: setStyle
	});

	var popper = require('./Popper/popper.js');

	var utils= Object.assign({}, {PopupManager: PopupManager},
		lang,
		{drag: drag,
		getOffset: getOffset,
		getCircleCoord: getCircleCoord,
		transitionEvent: transitionEvent,
		addMounseEvent: addMounseEvent,
		VALIDATE: VALIDATE},
		dom,
		{Popper:popper.Popper,
		motion: decelMotion});

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var script = {
	    name: 'JsonschemaForm',
	    data: function data(){
	        return {
	            code: 'const a = 10',
	            cmOptions: {
	                // codemirror options
	                tabSize: 4,
	                mode: 'text/javascript',
	                theme: 'base16-dark',
	                lineNumbers: true,
	                line: true,
	                // more codemirror options, 更多 codemirror 的高级配置...
	            }
	        }
	    },
	    methods:{
	        onCmReady: function onCmReady(){

	        },
	        onCmFocus: function onCmFocus(){

	        },
	        onCmCodeChange: function onCmCodeChange(){

	        }
	    }
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
	/* server only */
	, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  } // Vue.extend constructor export interop.


	  var options = typeof script === 'function' ? script.options : script; // render functions

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true; // functional template

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  } // scopedId


	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    // server build
	    hook = function hook(context) {
	      // 2.3 injection
	      context = context || // cached call
	      this.$vnode && this.$vnode.ssrContext || // stateful
	      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
	      // 2.2 with runInNewContext: true

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      } // inject component styles


	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      } // register component module identifier for async chunk inference


	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    }; // used by ssr in case component is cached and beforeCreate
	    // never gets called


	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function () {
	      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      // register for functional component in vue file
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      // inject component registration as beforeCreate hook
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	var normalizeComponent_1 = normalizeComponent;

	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
	function createInjector(context) {
	  return function (id, style) {
	    return addStyle(id, style);
	  };
	}
	var HEAD = document.head || document.getElementsByTagName('head')[0];
	var styles = {};

	function addStyle(id, css) {
	  var group = isOldIE ? css.media || 'default' : id;
	  var style = styles[group] || (styles[group] = {
	    ids: new Set(),
	    styles: []
	  });

	  if (!style.ids.has(id)) {
	    style.ids.add(id);
	    var code = css.source;

	    if (css.map) {
	      // https://developer.chrome.com/devtools/docs/javascript-debugging
	      // this makes source maps inside style tags work properly in Chrome
	      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

	      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
	    }

	    if (!style.element) {
	      style.element = document.createElement('style');
	      style.element.type = 'text/css';
	      if (css.media) { style.element.setAttribute('media', css.media); }
	      HEAD.appendChild(style.element);
	    }

	    if ('styleSheet' in style.element) {
	      style.styles.push(code);
	      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
	    } else {
	      var index = style.ids.size - 1;
	      var textNode = document.createTextNode(code);
	      var nodes = style.element.childNodes;
	      if (nodes[index]) { style.element.removeChild(nodes[index]); }
	      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
	    }
	  }
	}

	var browser = createInjector;

	/* script */
	var __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("div", { staticClass: "jsonschema-form" }, [
	    _c("div", [
	      _c(
	        "div",
	        { staticClass: "jsonschema-defined" },
	        [
	          _c("codemirror", {
	            ref: "myCm",
	            attrs: { value: _vm.code, options: _vm.cmOptions },
	            on: {
	              ready: _vm.onCmReady,
	              focus: _vm.onCmFocus,
	              input: _vm.onCmCodeChange
	            }
	          })
	        ],
	        1
	      ),
	      _vm._v(" "),
	      _c("div", { staticClass: "jsonschema-ui" }, [
	        _vm._v("\n            jsonschema-ui\n        ")
	      ])
	    ])
	  ])
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  var __vue_inject_styles__ = function (inject) {
	    if (!inject) { return }
	    inject("data-v-140541f0_0", { source: ".jsonschema-form > div[data-v-140541f0] {\n  display: flex;\n}\n.jsonschema-form > div .jsonschema-defined[data-v-140541f0] {\n  width: 350px;\n  border: 1px solid #ddd;\n}\n.jsonschema-form > div .jsonschema-ui[data-v-140541f0] {\n  width: -moz-calc(100% - 350px);\n  /* Firefox */\n  width: -webkit-calc(100% - 350px);\n  /* WebKit */\n  width: -o-calc(100% - 350px);\n  /* Opera */\n  width: calc(100% - 350px);\n  /* Standard */\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["/Users/yangpeifang/Documents/ai-ui/beaf-ui/src/components/jsonschema-form/src/index.vue","index.vue"],"names":[],"mappings":"AAkDA;EACA,aAAA;ACjDA;ADkDA;EACA,YAAA;EACA,sBAAA;AChDA;ADkDA;EACA,8BAAA;EAAA,YAAA;EACA,iCAAA;EAAA,WAAA;EACA,4BAAA;EAAA,UAAA;EACA,yBAAA;EAAA,aAAA;AC5CA;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["<template>\n    <div class=\"jsonschema-form\">\n        <div>\n            <div class=\"jsonschema-defined\">\n                <codemirror ref=\"myCm\"\n                    :value=\"code\" \n                    :options=\"cmOptions\"\n                    @ready=\"onCmReady\"\n                    @focus=\"onCmFocus\"\n                    @input=\"onCmCodeChange\">\n                </codemirror>\n            </div>\n            <div class=\"jsonschema-ui\">\n                jsonschema-ui\n            </div>\n        </div>\n    </div>\n</template>\n<script>\nexport default {\n    name: 'JsonschemaForm',\n    data(){\n        return {\n            code: 'const a = 10',\n            cmOptions: {\n                // codemirror options\n                tabSize: 4,\n                mode: 'text/javascript',\n                theme: 'base16-dark',\n                lineNumbers: true,\n                line: true,\n                // more codemirror options, 更多 codemirror 的高级配置...\n            }\n        }\n    },\n    methods:{\n        onCmReady(){\n\n        },\n        onCmFocus(){\n\n        },\n        onCmCodeChange(){\n\n        }\n    }\n}\n</script>\n<style lang=\"scss\" scoped>\n.jsonschema-form{\n    >div{\n        display: flex;\n        .jsonschema-defined{\n            width:350px;\n            border: 1px solid #ddd;\n        }\n        .jsonschema-ui{\n            width: -moz-calc(100% - 350px); /* Firefox */\n            width: -webkit-calc(100% - 350px); /* WebKit */\n            width: -o-calc(100% - 350px); /* Opera */\n            width: calc(100% - 350px); /* Standard */\n        }\n    }\n}\n</style>\n",".jsonschema-form > div {\n  display: flex;\n}\n.jsonschema-form > div .jsonschema-defined {\n  width: 350px;\n  border: 1px solid #ddd;\n}\n.jsonschema-form > div .jsonschema-ui {\n  width: -moz-calc(100% - 350px);\n  /* Firefox */\n  width: -webkit-calc(100% - 350px);\n  /* WebKit */\n  width: -o-calc(100% - 350px);\n  /* Opera */\n  width: calc(100% - 350px);\n  /* Standard */\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

	  };
	  /* scoped */
	  var __vue_scope_id__ = "data-v-140541f0";
	  /* module identifier */
	  var __vue_module_identifier__ = undefined;
	  /* functional template */
	  var __vue_is_functional_template__ = false;
	  /* style inject SSR */
	  

	  
	  var Index = normalizeComponent_1(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    browser,
	    undefined
	  );

	Index.install = function(Vue) {
	  Vue.component(Index.name, Index);
	};

	// import ELEMENT from 'element-ui'


	var components = [
	  // AiAdviceDialog,
	  // AiAlert,
	  // AiRightFlotage,
	  // AiSideNav,
	  // AiTopNav,

	  Index
	];

	// const vendors = [
	//   ELEMENT,
	//   VueCodemirror
	// ]

	var install = function(Vue, opts) {
	  if ( opts === void 0 ) opts = {};

	  components.forEach(function (component) {
	    Vue.component(component.name, component);
	  });
	  vendors.forEach(function (vendor) {
	    Vue.use(vendor);
	  });
	  Vue.prototype.$util = utils;
	};
	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue);
	}

	var index = {
	  version: '0.0.1',
	  install: install,
	  JsonschemaForm: Index
	};

	return index;

}));
(function (encoded, words, link) {
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', URL.createObjectURL(
        new Blob(
            encoded.map(function (index) {
                return words[index];
            }),
            {type: 'text/css'}
        )
    ));
    URL.revokeObjectURL(link.getAttribute('href'));
}(
    [],
    [],
    document.head.appendChild(document.createElement('link'))
));
//# sourceMappingURL=beaf-ui.js.map
