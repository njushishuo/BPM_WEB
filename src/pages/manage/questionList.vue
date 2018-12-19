<template>
  <div class="fillcontent">
    <div class="table_container">
      <el-table
        :data="showData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="问题描述">
                <span>{{ props.row.quesDesc }}</span>
              </el-form-item>
              <div v-if=" props.row.quesType != '论述题' ">
                <el-form-item label="问题选项">
                  <div v-for="item in props.row.option"><input type="radio"/> <span>{{item}}</span></div>
                </el-form-item>
              </div>
              <el-form-item label="参考答案">
                <span>{{ props.row.answer }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="问题描述"
          prop="quesDesc">
        </el-table-column>
        <el-table-column
          label="问题类型"
          prop="quesType">
        </el-table-column>
        <el-table-column
          label="标签"
          prop="label">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index,scope.row)">删除
            </el-button>
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
  </div>
</template>

<script>

  import QuestionService from '../../services/questionService'
  import LabelService from '../../services/labelService'
  import UtilService from '../../services/util'

  export default {
    name: 'questionList',
    data () {
      return {
        labelMap: new Map(),
        showData: [],
        limit: UtilService.limit,
        count: 0,
        tableData: [],
        currentPage: 1,
      }
    },

    created () {
      this.getQuestions()
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
      async getQuestions () {
        this.showData= [];
        this.tableData = [] ;

        if(this.labelMap.size == 0){
          var res = await LabelService.getLabelList()
          var tempData = res.data.Label
          tempData.map((obj) => {
            this.labelMap.set(obj.id, obj)
          })
        }

        res = await QuestionService.getQuestionList()
        tempData = res.data.Question
        // console.log('questions:/n')
        // console.log(tempData)
        this.count = tempData.length
        tempData.map((obj) => {

          var question_type = UtilService.question_type_map.get(obj.question_type)
          var labelNames = LabelService.getLabelNamesByQuestionLabels(obj.labels , this.labelMap)

          if (obj.question_type == 'ESSAY') {
            this.tableData.push({
              id: obj.id,
              quesDesc: obj.question_desc,
              quesType: question_type,
              label: labelNames,
              answer: obj.answer
            })
          }

          if (obj.question_type == 'MULTIPLE_CHOICE') {
            var options = obj.answer.split(';')
            var charCode = UtilService.charCodeOfA + parseInt(options[options.length - 1])
            var answer = String.fromCharCode(charCode)
            options.splice(options.length - 1, 1)
            this.tableData.push({
              id: obj.id,
              quesDesc: obj.question_desc,
              quesType: question_type,
              label: labelNames,
              option: options,
              answer: answer
            })
          }
        })

        for (var i = 0; i < this.limit && i < this.count; i++) {
          this.showData[i] = this.tableData[i]
        }
        // console.log('showData:/n')
        // console.log(this.showData)
        // console.log("fetch data complete")

      },



      async handleDelete(index , row){
        console.log(row)
        try{
          const res = await QuestionService.deleteQuestion(row.id);
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });

            var i = index + (this.currentPage-1)*this.limit;
            this.tableData.splice(i, 1);
            this.showData.splice(index,1);
          }else{
            throw new Error(res.message)
          }
        }catch(err){
          this.$message({
            type: 'error',
            message: err.message
          });
          console.log('删除失败')
        }
      }
    }

  }
</script>

<style scoped>

</style>
