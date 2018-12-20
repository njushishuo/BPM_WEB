<template>
  <div class="fillcontent">
    <el-table
      :data="this.showData"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        property="recruit_name"
        label="项目名">
      </el-table-column>
      <el-table-column
        property="recruit_desc"
        label="项目描述">
      </el-table-column>
      <el-table-column
        property="recruit_type"
        label="项目类型">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown trigger="click" @command="handleSelect">
            <el-button size="mini" type="primary" @click="handleClick(scope.$index)">
              编辑<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" id="editDrop">
              <el-dropdown-item command="project">项目</el-dropdown-item>
              <el-dropdown-item command="template">模板</el-dropdown-item>
              <el-dropdown-item command="paper">试卷</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
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
</template>

<script>
  import ProjectService from '../../services/projectService'
  import UtilService from '../../services/util'

  export default {
    name: 'myProjectList',
    data () {
      return {
        tableData: [],
        showData: [],
        limit: UtilService.limit,
        count: 0,
        currentPage: 1,
        clickIndex: 'project'
      }
    },
    created () {
      this.getProjects()
    },
    methods: {

      handleCurrentChange (val) {
        this.currentPage = val
        this.showData = []
        var start = (this.currentPage - 1) * this.limit
        var end = start + this.limit
        for (var i = start, j = 0; i < end && i < this.tableData.length; i++, j++) {
          this.showData[j] = this.tableData[i]
        }
      },

      getProjects () {
        ProjectService.getProjectListByUserId(this.$cookie.get('userId')).then((res) => {
          console.log(res)

          this.tableData = res.data.Recruit
          // console.log("tableData:/n");
          // console.log(this.tableData);
          this.count = this.tableData.length
          this.tableData.map((obj) => {
            obj.recruit_type = UtilService.recruit_type_map.get(obj.recruit_type)
          })
          for (var i = 0; i < this.limit && i < this.count; i++) {
            this.showData[i] = this.tableData[i]
          }
          // console.log("showData:/n");
          // console.log(this.showData);
        })
      },

      handleClick (index) {
        this.clickIndex = index
      },

      handleSelect (command) {
        console.log(command, this.clickIndex)
        var projectId = this.showData[this.clickIndex].id

        if (command == 'project') {
          this.$router.push({name: 'ProjectDetail', params: {project_id: projectId}})
        } else if (command == 'template') {
          this.$router.push({name: 'TemplateList', params: {project_id: projectId}})
        } else if (command == 'paper') {
          this.$router.push({name: 'PaperList', params: {project_id: projectId}})
        }
      },

      async handleDelete (index, row) {
        // console.log(row)
        // try{
        //   const res = await QuestionService.deleteQuestion(row.id);
        //   if (res.status == 200) {
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功'
        //     });
        //
        //     var i = index + (this.currentPage-1)*this.limit;
        //     this.tableData.splice(i, 1);
        //     this.showData.splice(index,1);
        //   }else{
        //     throw new Error(res.message)
        //   }
        // }catch(err){
        //   this.$message({
        //     type: 'error',
        //     message: err.message
        //   });
        //   console.log('删除失败')
      }
    }
  }
</script>

<style scoped>

  .el-button--mini {
    padding: 7px 10px;
    width: 60px;
  }
</style>
