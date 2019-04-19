<template>
    <div class="jsonschema-form">
        <div>
            <div class="jsonschema-defined">
                <codemirror ref="myCm"
                    :value="code" 
                    :options="cmOptions"
                    @ready="onCmReady"
                    @focus="onCmFocus"
                    @input="onCmCodeChange">
                </codemirror>
            </div>
            <div class="jsonschema-ui">
                jsonschema-ui
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'JsonschemaForm',
    data(){
        return {
            code: 'const a = 10',
            cmOptions: {
                // codemirror options
                tabSize: 4,
                mode: 'text/javascript',
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,
                // more codemirror options, 更多 codemirror 的高级配置...
            }
        }
    },
    methods:{
        onCmReady(){

        },
        onCmFocus(){

        },
        onCmCodeChange(){

        }
    }
}
</script>
<style lang="scss" scoped>
.jsonschema-form{
    >div{
        display: flex;
        .jsonschema-defined{
            width:350px;
            border: 1px solid #ddd;
        }
        .jsonschema-ui{
            width: -moz-calc(100% - 350px); /* Firefox */
            width: -webkit-calc(100% - 350px); /* WebKit */
            width: -o-calc(100% - 350px); /* Opera */
            width: calc(100% - 350px); /* Standard */
        }
    }
}
</style>
