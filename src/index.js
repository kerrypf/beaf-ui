// import ELEMENT from 'element-ui'
// import VueCodemirror from 'vue-codemirror'

// import 'codemirror/lib/codemirror.css'
// import "./assets/iconfont/iconfont.css";

import utils from './utils/index.js'

// import AiAdviceDialog from './components/AiAdviceDialog/index.js'
// import AiAlert from './components/AiAlert/index.js'
// import AiRightFlotage from './components/AiRightFlotage/index.js'
// import AiSideNav from './components/AiSideNav/index.js'
// import AiTopNav from './components/AiTopNav/index.js'

import JsonschemaForm from './components/jsonschema-form/index.js'


const components = [
  // AiAdviceDialog,
  // AiAlert,
  // AiRightFlotage,
  // AiSideNav,
  // AiTopNav,

  JsonschemaForm
]

// const vendors = [
//   ELEMENT,
//   VueCodemirror
// ]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  vendors.forEach(vendor => {
    Vue.use(vendor);
  });
  Vue.prototype.$util = utils
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.3',
  install,
  JsonschemaForm
}


