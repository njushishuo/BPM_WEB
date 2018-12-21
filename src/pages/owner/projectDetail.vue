<template>
  <div>
    <el-row style="margin-top: 20px;">
      <el-col :span="12" :offset="6">
        <el-card class="box-card">
          <el-form  label-width="110px" class="form food_form">
            <el-form-item label="项目类型">
              <el-radio class="radio" v-model="this.project.recruit_type" label="WEB">WEB 开发</el-radio>
              <el-radio class="radio" v-model="this.project.recruit_type" label="APP">APP 开发</el-radio>
              <el-radio class="radio" v-model="this.project.recruit_type" label="WE_CHAT_APPLET">微信小程序</el-radio>
            </el-form-item>
            <el-form-item label="项目名称:">
              <el-input v-model="this.project.recruit_name" ></el-input>
            </el-form-item>
            <el-form-item label="项目描述:">
              <el-input v-model="this.project.recruit_desc" ></el-input>
            </el-form-item>

            <div align="center">
              <el-button type="primary" @click="">确认</el-button>
            </div>

          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>


</template>

<script>
  import ProjectService from '../../services/projectService'
  import UtilService from '../../services/util'

  export default {
    name: 'ProjectDetail',
    data() {
      return {
        project: {},
      }
    },
    created() {
      this.getProject();
    },

    methods: {
      async getProject() {
        var id = this.$route.params.project_id;
        var res = await ProjectService.getProjectById(id)
        this.project = res.data
        console.log(this.project);
      }


    }
  }
</script>

<style scoped>
  .box-card {
    border: 2px solid transparent;
    margin: 10px;
  }
</style>
