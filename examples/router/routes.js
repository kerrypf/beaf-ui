const Basic = () =>import('../basic/app.vue')
const JsonschemaForm = () =>import('../jsonschema-form/index.vue')


export default [{
    path: '/',
    name: 'home',
    redirect: {name: 'jsonschemaForm'}
},{
    path: '/jsonshema-form',
    name: 'jsonschemaForm',
    component: JsonschemaForm,
    
}]