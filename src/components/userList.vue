<template>
  <div class="fillcontain">
    <my-header></my-header>
    <div class="table_container">
      <el-table
        :data="this.showData"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          property="username"
          label="用户名"
          width="220">
        </el-table-column>
        <el-table-column
          property="nickname"
          label="用户昵称"
          width="220">
        </el-table-column>
        <el-table-column
          property="company"
          label="公司名称">
        </el-table-column>
        <el-table-column
          property="city"
          label="所在城市">
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change=""
          @current-change="this.handleCurrentChange"
          :current-page="this.currentPage"
          :page-size="this.limit"
          layout="total, prev, pager, next"
          :total="this.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from '@/components/myHeader'
  import UserService from '@/services/userService'
  import UtilService from '@/services/util'

  export default {
    name: 'userList',
    components: {
      MyHeader
    },

    data () {
      return {
        tableData: [],
        showData:[],
        limit: UtilService.limit,
        count: 0,
        currentPage: 1
      }
    },

    created () {
      this.getUserListFuc();
    },

    methods: {
      handleCurrentChange (val) {
        this.currentPage = val;
        this.showData = [];
        var start = (this.currentPage-1)*this.limit;
        var end = start + this.limit;
        for(var i=start,j=0; i< end && i< this.tableData.length ; i++,j++){
          this.showData[j] = this.tableData[i]
        }
      },

      getUserListFuc () {
          UserService.getUserList().then((res)=>{
          this.tableData = res.data.User;
           console.log("tableData:/n");
           console.log(this.tableData);
          this.count = this.tableData.length;


          for(var i = 0; i < this.limit && i< this.count; i++){
              this.showData[i] = this.tableData[i];
          }

          console.log("showData:/n");
          console.log(this.showData);
        });

      }
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .table_container {
    padding: 20px;
  }
</style>
