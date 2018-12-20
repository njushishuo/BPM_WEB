<template>
  <div class="fillcontent">
    <el-table
      :data="this.showData"
      highlight-current-row
      style="width: 100%" :row-style="{ height: '60px'}" >
      <el-table-column
        type="index"
      >
      </el-table-column>
      <el-table-column
        label="试卷名称"
        prop="paper_name">
      </el-table-column>
      <el-table-column
        label="项目名称"
        prop="projectName">
      </el-table-column>
      <el-table-column
        label="项目类型"
        prop="projectType">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showPaperDetail(scope.$index)">查看</el-button>
          <el-button type="danger" size="mini" @click="deletePaper(scope.$index , scope.row)">删除</el-button>
        </template>
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
</template>

<script>
  import ProjectService from '../../services/projectService'
  import PaperService from '../../services/paperService'
  import UtilService from '../../services/util'

  export default {
    name: 'PaperList',
    data () {
      return {
        project: {},
        projectType: '',
        tableData: [],
        showData: [],
        limit: UtilService.limit,
        count: 0,
        currentPage: 1
      }
    },
    created () {
      this.getPaperListFuc()
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

      async getPaperListFuc () {
        var projectId = this.$route.params.project_id
        var tempData = await ProjectService.getProjectById(projectId)
        this.project = tempData.data
        this.projectType = UtilService.recruit_type_map.get(this.project.recruit_type)
        // console.log(this.project.recruit_name)

        PaperService.getPapersByProjectId(projectId).then((res) => {
          this.tableData = res.data.Paper
          this.tableData.map((obj) => {
            obj.projectName = this.project.recruit_name
            obj.projectType = this.projectType
          })
          // console.log("tableData:/n");
          // console.log(this.tableData);
          this.count = this.tableData.length
          for (var i = 0; i < this.limit && i < this.count; i++) {
            this.showData[i] = this.tableData[i]
          }
          // console.log("showData:/n");
          // console.log(this.showData);
        })
      },

      showPaperDetail (index) {
        var paper = this.showData[index]
        this.$router.push({name: 'PaperDetail', params: {paper_id: paper.id}})
      },

      async deletePaper (index, row) {
        try {
          const res = await PaperService.deletePaper(row.id)
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })

            var i = index + (this.currentPage - 1) * this.limit
            this.tableData.splice(i, 1)
            this.showData.splice(index, 1)
            this.count--
          } else {
            throw new Error(res.message)
          }
        } catch (err) {
          this.$message({
            type: 'error',
            message: err.message
          })
          console.log('删除失败')
        }
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
