<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align='start'>
      <img src="@/assets/img/avatar_user.jpg" class="avatar">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="userInfo">主页</el-dropdown-item>
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  export default {
    name: 'myHeader',
    methods: {
      handleCommand (command) {
        if (command == 'userInfo') {
          this.$router.push('/userInfo')
        } else if (command == 'logout') {
          this.$message({
            type: 'success',
            message: '退出成功'
          })
          this.$router.push('/')
        }
      },
    }
  }
</script>


<style lang="less">
  @import '../style/mixin';

  .header_container {
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }

  .avatar {
    .wh(36px, 36px);
    border-radius: 50%;
    margin-right: 37px;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
