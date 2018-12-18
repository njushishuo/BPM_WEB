<template>
  <div class="fillcontent">
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
          property="recruit_name"
          label="项目名"
          width="220">
        </el-table-column>
        <el-table-column
          property="recruit_desc"
          label="项目描述"
          width="300">
        </el-table-column>
        <el-table-column
          property="recruit_type"
          label="项目类型"
          width="220">
        </el-table-column>
        <el-table-column
          property="owner_nickname"
          label="项目发布人">
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change=""
          @current-change="this.handleCurrentChange"
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
  import ProjectService from '../../services/projectService';
  import UtilService from '../../services/util';

  export default {
    name: 'projectList',
    data(){
      return {
        tableData: [],
        showData:[],
        limit: UtilService.limit,
        count: 0,
        currentPage: 1
      }
    },
    created(){
       this.getProjects();
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

      getProjects(){
        ProjectService.getProjectList().then((res)=>{
          this.tableData = res.data.Recruit;
          // console.log("tableData:/n");
          // console.log(this.tableData);
          this.count = this.tableData.length;
          this.tableData.map((obj)=>{
            obj.recruit_type = UtilService.recruit_type_map.get(obj.recruit_type);
          })
          for(var i = 0; i < this.limit && i< this.count; i++){
            this.showData[i] = this.tableData[i];
          }
          // console.log("showData:/n");
          // console.log(this.showData);
        });
      }
    },
  }
</script>

<style scoped>

</style>
