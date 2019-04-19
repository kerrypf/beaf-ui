import Vue from 'vue'
import store from '../store'
import router from '../router'
import App from './app.vue'

import beafUI from 'beaf-ui'
Vue.use(beafUI)
new Vue({
    el:'#app',
    store:store,
    router:router,
    render: h => h(App)
})