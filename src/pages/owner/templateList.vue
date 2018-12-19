<template>
  <el-row>
    <el-col :span="8" :offset="1" v-for="(template,index) in processedTemplates">

      <el-card class="box-card container">
        <div slot="header">
          <span class="label-text">{{template.name}}</span>
        </div>
        <div v-for="(item,index) in template.items"  class="text item">
          <el-row>
            <el-col>
              <span>{{ item.labels }}</span>
            </el-col>
            <el-col>
              <span>{{ item.count }}</span>
            </el-col>
          </el-row>
        </div>
        <el-button type="text primary" @click="createPaper(template.id)">导出试卷</el-button>
      </el-card>
    </el-col>
  </el-row>


</template>

<script>
  import TemplateService from '../../services/templateService'
  import LabelService from '../../services/labelService'

  export default {
    name: 'TemplateList',
    data () {
      return {
        labelMap: new Map(),
        rawTemplates:[],
        processedTemplates: [],
        count: 0,
      }
    },
    created () {
      this.getTemplates()
    }
    ,
    methods: {
      async getTemplates () {

        if (this.labelMap.size == 0) {
          var res = await LabelService.getLabelList()
          var tempData = res.data.Label
          tempData.map((obj) => {
            this.labelMap.set(obj.id + '', obj)
          })
        }
        // console.log("projectId:"+this.$route.params.project_id);
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
            var labelIdsString = templateItem.substring(0, index)
            var count = templateItem.substring(index + 1, templateItem.length)
            var processedItem = {
              labels: LabelService.getLabelNamesByTemplateLabels(labelIdsString, this.labelMap),
              count: parseInt(count)
            }
            processedItems.push(processedItem)
          })

          var processedTemplate = {
            id: obj.id,
            name: obj.template_name,
            items: processedItems,
            recruit_id: obj.recruit_id
          }

          // console.log(processedTemplate)
          this.processedTemplates.push(processedTemplate)
        })
      },

      createPaper(templateId){
        console.log(templateId);
      }
    }
  }
</script>

<style scoped>
  .label-text {
    font-size: 16px;
    color: #999;
  }

  .container{
    margin: 10px;
    min-height: 200px;
  }
</style>
