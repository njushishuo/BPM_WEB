<template>
  <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-document"></i>数据管理</template>
      <el-menu-item index="myProjectList">我的项目</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
      <el-menu-item index="addProject">添加项目</el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title"><i class="el-icon-warning"></i>说明</template>
      <el-menu-item index="explain">说明</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '')
      }
    },
  }
</script>


<style lang="less" scoped>
  @import '../style/mixin';
</style>
