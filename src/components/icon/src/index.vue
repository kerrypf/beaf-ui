<template>
    <span :style="{color: color, backgroundColor: bgColor,fontSize:size}">
        <i v-if="css" class="icon iconfont" :class="name"></i>
        <svg class="icon iconfont" aria-hidden="true" v-else>
            <use :xlink:href="`#${name}`"></use>
        </svg>
    </span>
</template>
<script>
export default {
    name: 'Icon',
    props: {
        css: {
            type: Boolean
        },
        name: {
            type: String
        },
        color: {
            type: String
        },
        bgColor: {
            type: String,
            default: 'transparent'
        },
        size: {
            type: String,
            default: '14px'
        }
    },
    data (){
        return {
            
        }
    }
}
</script>