<template>
  <div>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">添加项目</header>
        <el-form :model="projectForm" :rules="projectRules" ref="foodForm" label-width="110px" class="form food_form">

          <el-form-item label="项目类型">
            <el-radio class="radio" v-model="projectForm.projectType" label="WEB">WEB 开发</el-radio>
            <el-radio class="radio" v-model="projectForm.projectType" label="APP">APP 开发</el-radio>
            <el-radio class="radio" v-model="projectForm.projectType" label="WE_CHAT_APPLET">微信小程序</el-radio>
          </el-form-item>

          <el-form-item label="项目标签">
            <el-select v-model="projectForm.selectedLabels" multiple placeholder="请选择">
              <el-option
                v-for="item in labels"
                :key="item.id"
                :label="item.label_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目名称" prop="name">
            <el-input v-model="projectForm.name"></el-input>
          </el-form-item>

          <el-form-item label="项目描述" prop="description">
            <el-input type="textarea" v-model="projectForm.description"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addProject()">确认</el-button>
          </el-form-item>

        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>

  import ProjectService from '../../services/projectService';
  import LabelService from '../../services/labelService';

  export default {
    name: 'addProject',
    data () {
      return {
        projectForm: {
          projectType: 'WEB',
          name: '',
          description: '',
          selectedLabels: [],
        },
        projectRules: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入项目描述', trigger: 'blur'},
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

      addProject(){

        var labelsString = ''
        this.projectForm.selectedLabels.map(
          (item) => {
            labelsString += item + ';'
          }
        )
        labelsString = labelsString.substring(0,labelsString.length-1);

        var project = {
          recruit_name : this.projectForm.name,
          recruit_desc : this.projectForm.description,
          recruit_type : this.projectForm.projectType,
          owner_id: this.$cookie.get('userId'),
          owner_nickname: this.$cookie.get('nickname')
        }

        ProjectService.addProject(project).then((res)=>{
          // console.log(res)
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.projectForm.name= '',
            this.projectForm.description= '',
            this.projectForm.projectType= 'WEB',
            this.projectForm.selectedLabels= []
          }
        })
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
