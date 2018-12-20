<template>
  <div class="fillcontent">
    <el-row >
      <el-col :span="12" :offset="6">
        <el-card v-for="(question,index) in processedQuestionList" shadow="hover" style="margin: 10px"  >
          <el-form inline >
            <el-form-item label="">
              <span>{{(index+1)+'.' }}</span>
            </el-form-item>
            <el-form-item label="问题描述" >
              <span>{{ question.quesDesc }}</span>
            </el-form-item>
            <br/>
            <el-form-item label="试题标签" style="margin-left: 26px" >
              <el-tag v-for="label in question.label" style="margin-right: 10px" type="primary">{{label}}</el-tag>
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

        <div align="center">
          <el-button  type="primary" style="margin-bottom: 20px;"  @click="cancelPaper()">取消</el-button>
          <el-button  type="success" style="margin-bottom: 20px;"  @click="confirmPaper()">保存</el-button>
        </div>

      </el-col>

    </el-row>


    <el-dialog title="确认试卷名称"
        :visible.sync="dialogVisible">
      <el-form inline >
        <el-form-item label="试卷名称" >
          <el-input  v-model="paperName" style="min-width: 500px"></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="savePaper">确认</el-button>
        </span>
    </el-dialog>


  </div>
</template>

<script>

  import QuestionService from '../../services/questionService'
  import PaperService from '../../services/paperService'
  import TemplateService from '../../services/templateService'
  import LabelService from '../../services/labelService'

  export default {
    name: 'paperPreview',
    data () {
      return {
        labelMap: new Map(),
        // parentId - sonIdArray Map
        labelLevelMap: new Map(),
        rawLabels: [],

        // id - questionObj Map
        questionMap: new Map(),
        rawQuestions: [],

        questionListToShow: [],
        processedQuestionList: [],

        targetTemplate:{},
        paperName:'',
        dialogVisible : false
      }
    },
    created(){
       this.createPaper();
    },
    methods: {
      async createPaper () {

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
        if (this.questionMap.size == 0) {
          var res = await QuestionService.getQuestionList()
          this.rawQuestions = res.data.Question
          this.rawQuestions.map((obj) => {
            this.questionMap.set(obj.id, obj)
          })
        }

        var id = this.$route.params.template_id;
        var res =await TemplateService.getTemplateById(id);
        this.targetTemplate = res.data

        // console.log("targetTemplate:")
        // console.log(targetTemplate)

        this.questionListToShow = PaperService.createdPaperBy(this.targetTemplate, this.labelMap, this.questionMap, this.rawQuestions, this.labelLevelMap)

        QuestionService.processQuestionList(this.questionListToShow, this.processedQuestionList, this.labelMap)

      },

      confirmPaper(){
        this.dialogVisible = true;
      },

      cancelPaper(){
        this.$router.go(-1);
      },

      savePaper(){

        var questionIdsString = '';
        for(var i=0; i< this.questionListToShow.length ; i++){
          questionIdsString+= this.questionListToShow[i].id+';';
        }
        questionIdsString = questionIdsString.substring(0,questionIdsString.length-1);

        var paper = {
          paper_name : this.paperName,
          questions: questionIdsString,
          recruit_id: this.targetTemplate.recruit_id
        }

        PaperService.addPaper(paper).then((res)=>{
          // console.log(res)
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.paperName= ''
          }
        })

        this.dialogVisible = false;

        this.$router.go(-1);

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
