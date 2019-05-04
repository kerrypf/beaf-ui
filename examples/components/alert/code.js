const basic = `<template>
    <el-button @click="clickEvent(successInfo)">成功</el-button>
    <el-button @click="clickEvent(errorInfo)">失败</el-button>
</template>
<script>
export default {
    methods: {
        clickEvent(data){
            this.Alert({
                type: data.type,
                message: data.name
            })
        }
    }
}
</script>`

export {
    basic 
}