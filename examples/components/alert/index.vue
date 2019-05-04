<template>
    <div>
        <div class="content demo">
            <p class="content-title">使用方法</p>
            <div class="use-demo">
                <div class="case">
                    <el-button v-for="(item, i) in btnList" :key="i" @click="clickEvent(item)">{{item.name}}</el-button>
                </div>
                <div class="code">
                    <div class="highlight">
                        <codemirror ref="myCm"
                            :value="code">
                        </codemirror>
                    </div>
                </div>
            </div>
        </div>
        <div class="content options">
            <p class="content-title">Attributes</p>
            <AiTable :data="tableData"></AiTable>
        </div>
    </div>
</template>
<script>
import {basic} from './code.js'
export default {
    data(){
        return {
            code:basic,
            btnList:[{
                type: 'success',
                name: '成功'
            },{
                type: 'error',
                name: '错误'
            },{
                type: 'warning',
                name: '警告'
            },{
                type: 'info',
                name: '信息'
            }],
            tableData: [{
                prop: 'options',
                des: '提示框配置,icon为自定义图标',
                type: 'Object',
                options: `{
                    type: '',
                    message:'',
                    icon:''
                }
                type=info|warning|error|success`,
                default: 'type=info'
            },{
                prop: 'name',
                des: '图标fontclass名称',
                type: 'String',
                options: '-',
                default: '-'
            },{
                prop: 'color',
                des: '更改单色图标颜色',
                type: 'String',
                options: '-',
                default: '-'
            },{
                prop: 'bgColor',
                des: '图标背景颜色',
                type: 'String',
                options: '-',
                default: 'transparent'
            },{
                prop: 'size',
                des: '图标字体大小，单位px',
                type: 'String',
                options: '-',
                default: '14px'
            }]
        }
    },
    methods: {
        clickEvent(data){
            this.Alert({
                type: data.type,
                message: data.name
            })
        }
    }
}
</script>
