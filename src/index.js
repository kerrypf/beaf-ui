import ELEMENT from 'element-ui'
import VueCodemirror from 'vue-codemirror'

// language
import 'codemirror/mode/vue/vue.js'

// active-line.js
import 'codemirror/addon/selection/active-line.js'
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/match-highlighter.js'
// theme css
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'

import "./assets/iconfont/iconfont.js";
import "./assets/reset/index.scss";

import _ from 'lodash'
// import UTIL from 'UTIL'
// console.log(UTIL, 'utilsutilsutilsutilsutils')

import ALERT from './components/alert/src/packaging.js'


import JsonschemaForm from './components/jsonschema-form/index.js'
import Icon from './components/icon/index.js'


const components = [
  JsonschemaForm,
  Icon
]

const vendors = [
  ELEMENT,
  // VueCodemirror
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  vendors.forEach(vendor => {
    Vue.use(vendor);
  });
  Vue.use(VueCodemirror, { 
    options: { 
      tabSize: 4,
      mode: 'text/x-vue',
      theme: 'cobalt',
      lineNumbers: true,
      line: true,
      readOnly: true
    }
  })
  Vue.prototype._=_
  Vue.prototype.Alert = ALERT
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.1',
  install,
  JsonschemaForm
}


