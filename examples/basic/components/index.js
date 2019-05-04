import table from './table.vue'


const components = [
    table
]

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        if (component.name) {
            Vue.component(component.name, component);
        }else{
            console.warn(table,'未定义组件名称name');
            
        }
      
    });
}
  

export default {
    install: install
}