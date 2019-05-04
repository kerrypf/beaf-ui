<template>
    <el-table
        :data="data"
        style="width: 100%">
        <el-table-column
            prop="prop"
            label="参数"
            width="120">
        </el-table-column>
        <el-table-column
            prop="des"
            label="说明">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            width="100">
        </el-table-column>
        <el-table-column
            prop="options"
            label="可选值">
        </el-table-column>
        <el-table-column
            prop="default"
            label="默认值"
            width="120">
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    name: 'AiTable',
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data () {
        return {

        }
    }
}
</script>