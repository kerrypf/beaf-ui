import Vue from 'vue'
import store from '../store'
import router from '../router'
import App from './app.vue'
import components from './components'

import 'element-ui/lib/theme-chalk/index.css'
import '../global.scss'

import aifeUI from 'aife-ui'

Vue.use(aifeUI)
Vue.use(components)
new Vue({
    el:'#app',
    store:store,
    router:router,
    render: h => h(App)
})