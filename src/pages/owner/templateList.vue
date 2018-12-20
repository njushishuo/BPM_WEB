<template>
  <div>
    <el-table :data="showData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div v-for="item in props.row.items">
              <el-form-item label="试题标签" style="margin-left: 20px; margin-right: 20px">
                <el-tag>{{item.label}}</el-tag>
              </el-form-item>
              <el-form-item label="试题数目">
                  <span>{{item.count}}</span>
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
          <el-button type="primary" size="mini" @click="addTemplate(scope.$index)">添加</el-button>
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


    <el-dialog title="试卷预览" :visible.sync="dialogVisible" class="dialog">
      <el-row v-for="(question,index) in processedPaper" style="margin-bottom: 20px">
        <el-col>
          <el-card>
            <div slot="header">
              <span>{{question.quesType}}</span>
            </div>
            <div>
              <div class="questionItem">
                <span>{{question.quesDesc}}</span>
              </div>

              <div class="questionItem" v-if=" question.quesType != '论述题' ">
                <div class="questionItem" v-for="item in question.option"><input type="radio"/> <span>{{item}}</span>
                </div>
              </div>

              <div class="questionItem" v-if=" question.quesType == '论述题' ">
                <el-input type="textarea"/>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
  </div>

</template>

<script>
  import TemplateService from '../../services/templateService'
  import ProjectService from '../../services/projectService'
  import QuestionService from '../../services/questionService'
  import PaperService from '../../services/paperService'
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
        // parentId - sonIdArray Map
        labelLevelMap: new Map(),
        // id - questionObj Map
        questionMap: new Map(),
        rawQuestions: [],
        rawTemplates: [],
        rawLabels: [],
        rawPaper: [],
        processedPaper: [],
        dialogVisible: false
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
          this.rawLabels = tempData
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

      async createPaper (index, row) {
        // console.log(index);

        if (this.questionMap.size == 0) {
          var res = await QuestionService.getQuestionList()
          this.questionList = res.data.Question
          this.questionList.map((obj) => {
            this.questionMap.set(obj.id, obj)
          })
        }
        if (this.labelLevelMap.size == 0) {
          for (var i = 0; i < this.rawLabels.length; i++) {
            if (this.rawLabels[i].parent_id == '0') {
              this.labelLevelMap.set(this.rawLabels[i].id, [])
            }
          }
          for (var i = 0; i < this.rawLabels.length; i++) {
            if (this.rawLabels[i].parent_id != '0') {
              this.labelLevelMap.get(parseInt(this.rawLabels[i].parent_id)).push(this.rawLabels[i].id)
            }
          }
        }

        var i = index + (this.currentPage - 1) * this.limit
        this.rawPaper = PaperService.createdPaperBy(this.rawTemplates[i], this.labelMap, this.questionMap, this.questionList, this.labelLevelMap)
        this.processedPaper = []
        QuestionService.processQuestionList(this.rawPaper, this.processedPaper, this.labelMap)
        this.dialogVisible = true
      },

      addTemplate (index) {

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
