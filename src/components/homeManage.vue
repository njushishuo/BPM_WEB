<template>
  <div class="manage_page fillcontent">

    <el-row style="height: 100%;">

      <el-col :span="3" style="min-height: 100%; background-color: #324057;">
        <SideBarManager></SideBarManager>
      </el-col>
      <el-col :span="21" style="height: 100%;overflow: auto;">
        <MyHeader></MyHeader>
        <keep-alive>
          <router-view :key="$route.fullPath"></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import MyHeader from '@/components/myHeader'
  import SideBarManager from '@/components/sideBarManager'
  export default {
    components: {SideBarManager, MyHeader}
  }

</script>
