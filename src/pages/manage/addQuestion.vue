<template>
  <div>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">添加试题</header>
        <el-form :model="questionForm" :rules="questionRules" ref="foodForm" label-width="110px" class="form food_form">

          <el-form-item label="试题类型">
            <el-radio class="radio" v-model="questionForm.questionType" label="ESSAY">论述题</el-radio>
            <el-radio class="radio" v-model="questionForm.questionType" label="MULTIPLE_CHOICE">选择题</el-radio>
          </el-form-item>

          <el-form-item label="试题标签">
            <el-select v-model="questionForm.selectedLabels" multiple placeholder="请选择">
              <el-option
                v-for="item in labels"
                :key="item.id"
                :label="item.label_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="试题描述" prop="description">
            <el-input  type="textarea" v-model="questionForm.description"></el-input>
          </el-form-item>

          <el-row v-if="questionForm.questionType == 'ESSAY'">
            <el-form-item label="试题答案" prop="essayAnswer">
              <el-input v-model="questionForm.name"></el-input>
            </el-form-item>
          </el-row>

          <el-row v-else>

            <el-form-item label="试题选项" prop="choices">

              <el-input v-model="questionForm.choiceEdit"></el-input>
              <el-button type="" @click="addChoice" style="margin: 10px;">添加选项</el-button>
              <el-button type="" @click="deleteChoice" style="margin: 10px;">删除选项</el-button>
              <div v-for="item in questionForm.choices"><input type="radio"/> <span>{{item}}</span></div>

            </el-form-item>

            <el-form-item label="试题答案" prop="choiceAnswer">
              <el-select v-model="questionForm.choiceAnswer" placeholder="请选择">
                <el-option
                  v-for="item in questionForm.charChoices"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>

          </el-row>
          <el-form-item>
            <el-button type="primary" @click="addQuestion()">确认</el-button>
          </el-form-item>

        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>

  import QuestionService from '../../services/questionService'
  import LabelService from '../../services/labelService'
  import UtilService from '../../services/util'

  export default {
    name: 'addQuestion',
    data () {
      return {
        questionForm: {
          questionType: 'ESSAY',
          description: '',
          selectedLabels: [],
          name: '',
          choices: [],
          choiceAnswer: '',
          choiceEdit: '',
          charChoices: [],

        },
        questionRules: {
          description: [
            {required: true, message: '请输入试题描述', trigger: 'blur'},
          ],
        },

        labels: [],
      }
    },
    created () {
      this.getLabels()
    },

    methods: {

      async getLabels () {
        var res = await LabelService.getLabelList()
        this.labels = res.data.Label
      },

      addChoice () {
        this.questionForm.choices.push(this.questionForm.choiceEdit)
        var charCode = this.questionForm.choices.length - 1 + UtilService.charCodeOfA
        this.questionForm.charChoices.push(
          {key: this.questionForm.choices.length - 1, value: String.fromCharCode(charCode)})

        this.questionForm.choiceEdit = ''
      },

      deleteChoice () {
        var index = this.questionForm.choices.length - 1
        this.questionForm.choices.splice(index, 1)
        this.questionForm.charChoices.splice(index, 1)
      },

      addQuestion () {

        var labelsString = ''
        this.questionForm.selectedLabels.map(
          (item) => {
            labelsString += item + ';'
          }
        )
        labelsString = labelsString.substring(0,labelsString.length-1);

        if (this.questionForm.questionType == 'ESSAY') {
          var question = {
            question_type: 'ESSAY',
            question_desc: this.questionForm.description,
            answer: this.questionForm.name,
            labels: labelsString
          }
          QuestionService.addQuestion(question).then((res) => {
            console.log(res)
            if (res.status == 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.questionForm.description = '',
              this.questionForm.selectedLabels = [],
              this.questionForm.name = ''
            }
          })
        }else{

          var answerString = '';
          this.questionForm.choices.map((item)=>{
            answerString+=item+';'
          })
          answerString = answerString.substring(0,answerString.length-1);
          answerString += ';'+this.questionForm.choiceAnswer;

          var question = {
            question_type: 'MULTIPLE_CHOICE',
            question_desc: this.questionForm.description,
            answer: answerString,
            labels: labelsString
          }


          QuestionService.addQuestion(question).then((res) => {
            // console.log(res)
            if (res.status == 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.questionForm.description = '',
              this.questionForm.selectedLabels = [],
              this.questionForm.choices = [],
              this.questionForm.choiceAnswer = '',
              this.questionForm.choiceEdit = '',
              this.questionForm.charChoices = []
            }
          })
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  @import '../../style/mixin';

  .form {
    min-width: 400px;
    margin-bottom: 30px;

    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
      border-radius: 6px;
      transition: all 400ms;
    }
  }

  .food_form {
    border: 1px solid #eaeefb;
    padding: 10px 10px 0;
  }

  .form_header {
    text-align: center;
    margin-bottom: 10px;
  }

  .category_select {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  .add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
  }

  .showEdit {
    height: 185px;
  }

  .add_category {
    background: #f9fafc;
    padding: 10px 30px 0px 10px;
    border: 1px solid #eaeefb;
    border-top: none;
  }

  .add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;

    &:hover {
      background: #f9fafc;

      span, .edit_icon {
        color: #20a0ff;
      }
    }

    span {
      .sc(14px, #999);
      transition: all 400ms;
    }

    .edit_icon {
      color: #ccc;
      transition: all 400ms;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  .cell {
    text-align: center;
  }
</style>

