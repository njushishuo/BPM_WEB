<template>
  <div class="fillcontent">
    <el-row >

      <!--<el-button size="small" type="success" @click="savePaper()">保存</el-button>-->
      <!--<el-button size="small" type="primary" @click="cancel()">取消</el-button>-->

      <el-col :span="12" :offset="6">
            <el-card v-for="(question,index) in processedQuestionList" shadow="hover" style="margin: 10px"  >
              <el-form   inline >
                <el-form-item label="">
                  <span>{{(index+1)+'.' }}</span>
                </el-form-item>
                <el-form-item label="问题描述" >
                  <span>{{ question.quesDesc }}</span>
                </el-form-item>
                <div v-if=" question.quesType != '论述题' ">
                  <el-form-item label="问题选项" style="margin-left: 26px">
                    <div v-for="item in question.option"><input type="radio" disabled="true"/> <span>{{item}}</span></div>
                  </el-form-item>
                </div>
                <div v-if=" question.quesType == '论述题' " style="margin-left: 26px">
                  <el-form-item label="答">
                    <el-input  type="textarea"  style="min-width: 600px"></el-input>
                  </el-form-item>
                </div>
              </el-form>
            </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>

  import QuestionService from '../../services/questionService'
  import PaperService from '../../services/paperService'
  import LabelService from '../../services/labelService'

  export default {
    name: 'paperDetail',
    data () {
      return {
        labelMap: new Map(),

        questionList: [],
        processedQuestionList: [],
        paper: this.$route.params.paper

      }
    },
    created(){
      this.getQuestions();
    },
    methods: {
      async getQuestions () {
        var res = await PaperService.getPaperById(this.$route.params.paper_id);
        this.paper = res.data;
        // console.log(this.paper)
        if (this.labelMap.size == 0) {
          console.log('fetch labels - paper detail')
          var res = await LabelService.getLabelList()
          var tempData = res.data.Label
          tempData.map((obj) => {
            this.labelMap.set(obj.id, obj)
          })
        }
        this.questionList = [];
        this.processedQuestionList = [];
        res = await QuestionService.getQuestionList()
        tempData = res.data.Question
        var questionIdsString = this.paper.questions
        tempData.map((question) => {
          if (questionIdsString.indexOf(question.id + '') != -1) {
            this.questionList.push(question)
          }
        })
        // console.log(this.questionList)
        QuestionService.processQuestionList(this.questionList, this.processedQuestionList, this.labelMap)
        // console.log(this.processedQuestionList)
      },
    }
  }
</script>

<style scoped>

</style>
