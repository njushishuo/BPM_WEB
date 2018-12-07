<template>
  <div class="fillcontain">
    <my-header></my-header>
    <div class="table_container">
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          property="proName"
          label="项目名"
          width="220">
        </el-table-column>
        <el-table-column
          property="proDesc"
          label="项目描述"
          width="300">
        </el-table-column>
        <el-table-column
          property="proType"
          label="项目类型"
          width="220">
        </el-table-column>
        <el-table-column
          property="userName"
          label="项目发布人">
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="15"
          layout="total, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from "./myHeader";

  export default {
    name: 'projectList',
    components: {MyHeader},
    data(){
      return {
        tableData: [{
          proName: '购物App',
          proDesc: '一开基于安卓的购物app',
          proType: 'app开发',
          userName: '675342907',
        }, {
          proName: '企业内部信息管理平台',
          proDesc: '仅招募前端开发人员',
          proType: 'web开发',
          userName: '51182177',
        },{
          proName: '在线选课小程序',
          proDesc: '本产品是一个健身房在线选课小程序',
          proType: '微信小程序开发',
          userName: '4486025',
        }],
        currentRow: null,
        offset: 0,
        limit: 15,
        count: 0,
        currentPage: 1,
      }
    },
    created(){
      // this.initData();
    },
    methods: {
      async initData(){
        try{
          const countData = await getUserCount();
          if (countData.status == 1) {
            this.count = countData.count;
          }else{
            throw new Error('获取数据失败');
          }
          this.getUsers();
        }catch(err){
          console.log('获取数据失败', err);
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.offset = (val - 1)*this.limit;
        this.getUsers()
      },
      async getUsers(){
        const Users = await getUserList({offset: this.offset, limit: this.limit});
        this.tableData = [];
        Users.forEach(item => {
          const tableData = {};
          tableData.username = item.username;
          tableData.registe_time = item.registe_time;
          tableData.city = item.city;
          this.tableData.push(tableData);
        })
      }
    },
  }
</script>

<style scoped>

</style>
