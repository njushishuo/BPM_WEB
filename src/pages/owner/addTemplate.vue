<template>
  <div>
    <el-row style="margin-top: 20px;">
      <el-col :span="12" :offset="6">
        <el-card>
          <div slot="header">
            <header class="form_header">添加模板</header>
          </div>
          <div>
            <el-form :model="templateForm" :rules="templateRules" ref="foodForm" label-width="110px"
                     class="form food_form">
              <el-form-item label="模板名称">
                <el-input v-model="templateForm.name"></el-input>
              </el-form-item>
              <el-form-item label="试题标签">
                <el-select v-model="templateForm.editLabel" placeholder="请选择">
                  <el-option
                    v-for="item in labels"
                    :key="item.id"
                    :label="item.label_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="试题数量">
                <el-input-number v-model="templateForm.editCount" :min="1" :max="5"></el-input-number>
              </el-form-item>

              <el-form-item>
                <el-button type="" @click="this.addItem" style="margin: 10px;">添加选项</el-button>
                <el-button type="" @click="this.deleteItem" style="margin: 10px;">删除选项</el-button>
              </el-form-item>


              <el-form-item>
                <el-table :data="templateForm.items" highlight-current-row style="width: 100%; ">
                  <el-table-column type="index">
                  </el-table-column>
                  <el-table-column property="labelName" label="标签">
                  </el-table-column>
                  <el-table-column property="count" label="数目"></el-table-column>
                </el-table>
              </el-form-item>


              <div align="center" style="margin-top: 30px">
                <el-button type="primary" @click="cancelTemplate">取消</el-button>
                <el-button type="primary" @click="addTemplate">确认</el-button>
              </div>

            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TemplateService from '../../services/templateService'
  import LabelService from '../../services/labelService'

  export default {
    name: 'addTemplate',
    data () {
      return {
        templateForm: {
          name: '',
          editLabel: 1544614143626,
          editCount: 1,
          items: [],
          itemCnt: 0
        },
        templateRules: {
          name: [
            {required: true, message: '请输入模板名称', trigger: 'blur'},
          ],
        },

        labelMap: new Map(),
        labels: [],
      }
    },
    created () {
      this.getLabels()
    },

    methods: {

      async getLabels () {
        if (this.labelMap.size == 0) {
          var res = await LabelService.getLabelList()
          this.labels = res.data.Label

          this.labels.map((obj) => {
            this.labelMap.set(obj.id, obj)
          })
        }
      },

      addTemplate () {

        var itemsString = ''
        for (var i = 0; i < this.templateForm.items.length; i++) {
          var item = this.templateForm.items[i].labelId + ',' + this.templateForm.items[i].count
          itemsString += (item + ';')
        }
        itemsString = itemsString.substring(0, itemsString.length - 1)

        var template = {
          template_name: this.templateForm.name,
          items: itemsString,
          recruit_id: this.$route.params.project_id,
        }
        console.log(template)

        TemplateService.addTemplate(template).then((res) => {
          // console.log(res)
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.templateForm.name = '',
            this.templateForm.editLabel = 1544614143626,
            this.templateForm.editCount = 1,
            this.templateForm.items = [],
            this.templateForm.itemCnt = 0
          }
        })
      },

      cancelTemplate(){

        this.$router.go(-1);

      },

      addItem () {
        var item = {
          labelId: this.templateForm.editLabel,
          labelName: this.labelMap.get(this.templateForm.editLabel).label_name,
          count: this.templateForm.editCount
        }
        this.templateForm.items.push(item)
        this.templateForm.itemCnt++
      },

      deleteItem () {
        var index = this.templateForm.itemCnt - 1
        this.templateForm.items.splice(index, 1)
        this.templateForm.itemCnt--
      }

    }


  }
</script>


<style lang="less" scoped>
  @import '../../style/mixin';


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


