const Basic = () =>import('../basic/app.vue')

const Vpermission = () =>import('../components/directive/v-permission.vue')


const JsonschemaForm = () =>import('../components/jsonschema-form/index.vue')
const Icon = () =>import('../components/icon/index.vue')
const Alert = () =>import('../components/alert/index.vue')
const AdviceDialog = () =>import('../components/advice-dialog/index.vue')
const SideNav = () =>import('../components/side-nav/index.vue')
const RightFlotage = () =>import('../components/right-flotage/index.vue')
const TopNav = () =>import('../components/top-nav/index.vue')
const AiJsonSchema = () =>import('../components/ai-jsonshema-form/index.vue')


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
},{
    path: '/advice-dialog',
    name: 'adviceDialog',
    component: AdviceDialog,
    meta:{
        title: 'AdviceDialog'
    }
},{
    path: '/side-nav',
    name: 'sideNav',
    component: SideNav,
    meta:{
        title: 'SideNav'
    }
},{
    path: '/right-flotage',
    name: 'rightFlotage',
    component: RightFlotage,
    meta:{
        title: 'RightFlotage'
    }
},{
    path: '/top-nav',
    name: 'topNav',
    component: TopNav,
    meta:{
        title: 'TopNav'
    }
},{
    path: '/ai-jsonschema-form',
    name: 'aiJsonschemaForm',
    component: AiJsonSchema,
    meta:{
        title: 'AiJsonSchema'
    }
},{
    path: '/v-permission',
    name: 'Vpermission',
    component: Vpermission,
    meta:{
        title: 'Vpermission'
    }
}]