<template>
  <div>
    <el-row>
      <el-col :span="14" offset="4">
        <el-card class="box-card">
          <el-form   :model="projectForm" ref="foodForm" label-width="110px" class="form food_form">

            <el-form-item  label="项目类型:">
              <span>WEB 开发</span>
            </el-form-item>

            <el-form-item label="项目标签:">
              <el-select  v-model="projectForm.selectedLabels" multiple placeholder="请选择">
                <el-option
                  v-for="item in labels"
                  :key="item.id"
                  :label="item.label_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item  label="项目名称:" prop="name">
              <span>{{projectForm.name}}</span>
              <el-input disabled="true" v-model="projectForm.name"></el-input>
            </el-form-item>

            <el-form-item label="项目描述:" prop="description">
              <p>
                {{projectForm.description}}
              </p>
              <el-input disabled="true" type="textarea" v-model="projectForm.description"></el-input>
            </el-form-item>
          </el-form>



        </el-card>


      </el-col>
    </el-row>
  </div>


</template>

<script>
  export default {
    name: 'ProjectDetail',
    data () {
      return {
        projectForm: {
          projectType: 'WEB',
          name: '测试项目',
          description: '测试项目',
          selectedLabels: [],
        },
        labels: [],
      }
    }
  }
</script>

<style scoped>
  .box-card {
    width: 950px;
    border: 2px solid transparent;
    margin: 10px;
  }
</style>
