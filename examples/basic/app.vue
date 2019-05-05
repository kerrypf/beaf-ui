<template>
    <div class="basic-view">
        <div class="components-menu">
            <div v-for="(item, i) in menuList" :key="i">
                <p class="category">{{item.category}}</p>
                <div v-for="(menu, j) in item.list" :key="j" class="menu-item" :class="{active: curMenu.name === menu.name}"
                    @click="menuEvent(menu, i, j)">{{menu.name}}
                    <span class="menu-name">（{{menu.label}}）</span>
                </div>
            </div>
            
        </div>
        <div class="content-view">
            <div>
                <p class="menu-title">{{curMenu.name}}{{curMenu.label}}</p>
                <span class="sub-title">{{curMenu.description}}</span>
            </div>
            <div class="main">
                <router-view></router-view>
            </div>
            
        </div>
    </div>
    
</template>
<script>
export default {
    data () {
        return {
            categoryIndex: 0,
            menuList: [{
                category: 'Basic',
                list: [{
                    name: 'Icon',
                    path: 'icon',
                    label: '公共图标',
                    description:'项目常用公共图标库，这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法'
                },{
                    name: 'Alert',
                    path: 'alert',
                    label: '弹框提示',
                    description:'弹框提示，在页面头部弹框提示消息'
                },{
                    name: 'JsonschemaForm',
                    path: 'jsonshema-form',
                    label: '可视化表单',
                    description:'json数据可视化可编辑表单'
                }]
            }, {
                category: 'Service',
                list: [{
                    name: 'AdviceDialog',
                    path: 'advice-dialog',
                    label: '反馈问题弹框',
                    description:'DUI平台反馈问题弹框公共业务组件'
                },{
                    name: 'SideNav',
                    path: 'side-name',
                    label: '侧边栏导航',
                    description:'DUI平台左侧菜单公共业务组件'
                },{
                    name: 'RightFlotage',
                    path: 'right-flotage',
                    label: '常驻操作按钮',
                    description:'DUI平台页面常驻用户操作按钮（帮助、反馈）'
                },{
                    name: 'Vpermission',
                    path: 'v-permission',
                    label: '户权限指令',
                    description:'DUI平台用户权限指令'
                },{
                    name: 'TopNav',
                    path: 'top-nav',
                    label: '头部导航',
                    description:'DUI平台头部导航公共业务组件'
                },{
                    name: 'AiJsonSchema',
                    path: 'ai-jsonschema-form',
                    label: 'json可视化配置',
                    description:'json数据可视化可编辑表单'
                }]
            }]
        }
    },
    computed: {
        curMenu(){
            const title = this.$route.meta.title
            if (!title) return {}
            let tarMenu = {}
            this.menuList.forEach( item => {
                
                const tar = item.list.find( menu => {
                    return menu.name === title
                })
                if (tar) tarMenu = tar
            })
            return tarMenu||{}
        }
    },
    methods: {
        menuEvent(item, i,j){
            this.$router.push(item.path)
        }
    }
}
</script>
<style lang="scss" scoped>
.basic-view{
    display: flex;
    // padding: 10px 80px;
    height: 100%;
    >div{
        height: 100%;
        overflow-y: auto;
    }
    .components-menu{
        width: 450px;
        transition: width .3 ease-in;
        padding: 15px 0;
        padding-left: 80px;
        .category{
            font-size: 12px;
            color: #999;
            line-height: 26px;
            margin-top: 15px;
        }
        .menu-item{
            cursor: pointer;
            margin: 5px 0;
            padding: 10px;
            font-size: 14px;
            &.active{
               color:#409eff; 
            }
            &:hover{
                color:#409eff;
            }
            .menu-name{
                color: #999;
            }
        }
    }
    .content-view{
        width: -moz-calc(100% - 450px); /* Firefox */
        width: -webkit-calc(100% - 450px); /* WebKit */
        width: -o-calc(100% - 450px); /* Opera */
        width: calc(100% - 450px); /* Standard */
        // padding-left:30px;
        padding: 0 50px 0 30px;
        >div{
            margin: 20px 0;
        }
        .menu-title{
            font-size:28px;
            color:#1f2f3d;
        }
        .sub-title{
            font-size: 14px;
            color: #5e6d82;
            line-height: 30px;
        }
        
    }
}
</style>
