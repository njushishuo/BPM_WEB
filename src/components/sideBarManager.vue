<template>
  <el-menu @select="handleSelect" style="min-height: 100%;" theme="dark">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-document"></i>数据管理</template>
      <el-menu-item  index="userList" >用户列表</el-menu-item>
      <el-menu-item index="projectList" >项目列表</el-menu-item>
      <el-menu-item index="questionList" >试题列表</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
      <el-menu-item index="addQuestion">添加试题</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-warning"></i>说明</template>
      <el-menu-item index="explain">说明</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {

    methods:{
      handleSelect (index) {
        console.log('当前选中了index: ' + index)
        if (index === 'userList') {
          this.$router.push({name: 'UserList'})
        }
        if (index === 'projectList') {
          this.$router.push({name: 'ProjectList'})
        }
        if (index === 'questionList') {
          this.$router.push({name: 'QuestionList'})
        }

        if (index === 'addQuestion'){
          this.$router.push({name: 'AddQuestion'})
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  @import '../style/mixin';
  .manage_page{

  }
</style>

