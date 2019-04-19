import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)

// *** 实例化VueRouter
let router = new VueRouter({
    routes,
    hashbang: true,
    history: false,
    transitionOnLoad: true,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
    
export default  router