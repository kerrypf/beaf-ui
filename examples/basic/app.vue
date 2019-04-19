<template>
    <div class="basic-view">
        <div class="components-menu">
            <div v-for="(item, i) in menuList" :key="i" @click="menuEvent(item)">{{item.name}}</div>
        </div>
        <div class="content-view">
            <router-view></router-view>
        </div>
    </div>
    
</template>
<script>
export default {
    data () {
        return {
            menuList: [{
                name: 'JsonschemaForm',
                path: 'jsonschemaForm'
            }]
        }
    },
    methods: {
        menuEvent(item){
            this.$router.push(item.path)
        }
    }
}
</script>
<style lang="scss" scoped>
.basic-view{
    display: flex;
    .components-menu{
        width: 180px;
        transition: all .3 ease-in;
    }
    .content-view{
        width: -moz-calc(100% - 180px); /* Firefox */
        width: -webkit-calc(100% - 180px); /* WebKit */
        width: -o-calc(100% - 180px); /* Opera */
        width: calc(100% - 180px); /* Standard */
    }
}
</style>
