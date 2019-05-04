const Basic = () =>import('../basic/app.vue')
const JsonschemaForm = () =>import('../components/jsonschema-form/index.vue')
const Icon = () =>import('../components/icon/index.vue')
const Alert = () =>import('../components/alert/index.vue')


export default [{
    path: '/',
    name: 'home',
    redirect: {name: 'jsonschemaForm'}
},{
    path: '/icon',
    name: 'icon',
    component: Icon,
    meta:{
        title: 'Icon'
    }
},{
    path: '/alert',
    name: 'alert',
    component: Alert,
    meta:{
        title: 'Alert'
    }
},{
    path: '/jsonshema-form',
    name: 'jsonschemaForm',
    component: JsonschemaForm,
    meta:{
        title: 'JsonschemaForm'
    }
}]