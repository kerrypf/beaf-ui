<template>
  <div>
    <el-dialog
      title="温馨提示"
      center
      :before-close="handleClose"
      :visible.sync="visibleJoinGroup"
      width="508px">
      <div>
        <div style="margin-bottom:27px;">
          您还未加入项目组，无法创建{{menuType}}。您可以<a :href="href" style="color:#2196f3" @click="handleClose">创建新项目组</a>。
        </div>
        <span slot="footer" class="dialog-footer">
          <div style="text-align: right;">
            <el-button type="text" @click="handleClose">取消</el-button>
          </div>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created(){
    this.href = `/console/account/index.html?stamp=${+new Date()}#/ProjectGroup/List?newGroup=1`
  },
  props: ['menuType', 'visibleJoinGroup'],
  data(){
    return {
      href: ''
    }
  },
  computed: {
    
  },
  methods: {
    handleClose(){
      this.$emit('handleClose')
    },
  }
}
</script>