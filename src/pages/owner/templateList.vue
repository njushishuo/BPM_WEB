<template>
  <div class="fillcontent">
    <el-table :data="showData" style="width: 100%" :row-style="{ height: '60px'}" >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div v-for="item in props.row.items">
              <el-form-item label="试题标签" style="margin-left: 20px; margin-right: 20px">
                <el-tag  type="primary">{{item.label}}</el-tag>
              </el-form-item>
              <el-form-item label="试题数目">
                <span style="font-weight: bold">{{item.count}}</span>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="模板名称" prop="name"></el-table-column>
      <el-table-column label="项目名称" prop="projectName"></el-table-column>
      <el-table-column label="项目类型" prop="projectType"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click="addTemplate()">添加</el-button>
          <el-button type="danger" size="mini" @click="deleteTemplate(scope.$index , scope.row)">删除</el-button>
          <el-button type="success" size="mini" @click="createPaper(scope.$index)">导出试卷</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination">
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
  import TemplateService from '../../services/templateService'
  import ProjectService from '../../services/projectService'
  import LabelService from '../../services/labelService'
  import UtilService from '../../services/util'

  export default {
    name: 'TemplateList',
    data () {
      return {

        project: {},
        projectType: '',
        tableData: [],
        showData: [],
        count: 0,
        limit: UtilService.limit,
        currentPage: 1,

        // id - labelObj Map
        labelMap: new Map(),
        rawTemplates: [],

      }
    },
    created () {
      this.getTemplates()
    }
    ,
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
      async getTemplates () {

        if (this.labelMap.size == 0) {
          var res = await LabelService.getLabelList()
          var tempData = res.data.Label
          // console.log("get labels")
          // console.log(tempData)
          tempData.map((obj) => {
            if (obj.parent_id == '0') {
              obj.level = 1
            } else {
              obj.level = 2
            }
            this.labelMap.set(obj.id, obj)
          })
        }
        // console.log("projectId:"+this.$route.params.project_id);

        res = await ProjectService.getProjectById(this.$route.params.project_id)
        this.project = res.data
        this.projectType = UtilService.recruit_type_map.get(this.project.recruit_type)
        // console.log(this.project.recruit_name)

        res = await TemplateService.getTemplatesByProjectId(this.$route.params.project_id)
        // console.log(res)
        tempData = res.data.Template
        // console.log('Templates:/n')
        // console.log(tempData)
        this.count = tempData.length
        this.rawTemplates = tempData

        tempData.map((obj) => {
          var templateItems = []
          if (obj.items.lastIndexOf(';') == -1) {
            templateItems[0] = obj.items
          } else {
            templateItems = obj.items.split(';')
          }
          var processedItems = []
          var index = 0
          templateItems.map((templateItem) => {
            index = templateItem.lastIndexOf(',')
            var labelIdString = templateItem.substring(0, index)
            var count = templateItem.substring(index + 1, templateItem.length)
            var processedItem = {
              label: this.labelMap.get(parseInt(labelIdString)).label_name,
              count: parseInt(count)
            }
            processedItems.push(processedItem)
          })

          var labelNames = []
          processedItems.map((item) => {
            labelNames.push(item.label)
          })

          var processedTemplate = {
            id: obj.id,
            name: obj.template_name,
            items: processedItems,
            recruit_id: obj.recruit_id,
            labelNames: labelNames,
            projectName: this.project.recruit_name,
            projectType: this.projectType,
          }

          // console.log(processedTemplate)
          this.tableData.push(processedTemplate)

          for (var i = 0; i < this.limit && i < this.count; i++) {
            this.showData[i] = this.tableData[i]
          }

        })
      },

      async createPaper (index) {
        var i = index + (this.currentPage - 1) * this.limit
        var templateId = this.rawTemplates[i].id
        this.$router.push({name:'PaperPreview' , params:{template_id:templateId}});
      },

      addTemplate () {
        this.$router.push({name:'AddTemplate' , params: { project_id: this.project.id }});
      },

      async deleteTemplate (index, row) {
        try {
          const res = await TemplateService.deleteTemplate(row.id)
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })

            var i = index + (this.currentPage - 1) * this.limit
            this.tableData.splice(i, 1)
            this.rawTemplates.splice(i, 1)
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
  .label-text {
    font-size: 16px;
    color: #999;
  }

  .container {
    margin: 10px;
    min-height: 200px;
  }

  .questionItem {
    margin: 10px;
    font-size: 16px;
  }

  .dialog {
    width: 100%;
  }

  .el-button--mini {
    padding: 7px 10px;
  }
</style>
