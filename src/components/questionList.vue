<template>
  <div class="fillcontain">
    <my-header></my-header>
    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="问题描述">
                <span>{{ props.row.quesDesc }}</span>
              </el-form-item>
              <div v-if=" props.row.quesType != '论述题' ">
                <el-form-item label="问题选项">
                  <div v-for="item in props.row.option"><input type="radio" /> <span>{{item}}</span> </div>
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
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from "./myHeader";

  export default {
    name: 'questionList',
    components: {MyHeader},
    data(){
      return {
        offset: 0,
        limit: 20,
        count: 0,
        tableData: [{
          quesDesc:'对二维数组正确定义的形式是:int a(2)(3);是否正确？',
          quesType:'多项选择',
          label:['C++','array'],
          option:['正确','错误'],
          answer:'B'
        }, {
          quesDesc:'若有说明: int a[][4]={0,0};则下面不正确的叙述是（）',
          quesType:'多项选择',
          label:['C++','array'],
          option:[
            '数组 a 的每个元素都可得到初值0',
            '二维数组 a 的第一维大小为1',
            '因为二维数组 a 中第二维大小的值除经初值个数的商为1,故数组 a 的行数为1',
            '有元素 a[0][0]和 a[0][1]可得到初值0,其余元素均得不到初值0'],
          answer:'D'
          },
          {
            quesDesc:'在Linux 系统中，在运行一个程序时，程序中未初始化的全局变量会被加载到以下哪个内存段中?',
            quesType:'多项选择',
            label:['linux'],
            option:[
              'BSS',
              'TEXT',
              'DATA',
              'STACK'],
            answer:'A'
          },
          {
            quesDesc:'请详细描述Http的请求过程?',
            quesType:'论述题',
            label:['network'],
            answer:'client 发出 request, server 发出response'
          }],
        currentPage: 1,
      }
    },
    created(){
      // this.initData();
    },
    methods: {
      async initData () {
        try {
          this.city = await cityGuess();
          const countData = await getResturantsCount();
          if (countData.status == 1) {
            this.count = countData.count;
          } else {
            throw new Error('获取数据失败');
          }
          this.getResturants();
        } catch (err) {
          console.log('获取数据失败', err);
        }
      }, async getResturants () {
        const {latitude, longitude} = this.city;
        const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
        this.tableData = [];
        restaurants.forEach(item => {
          const tableData = {};
          tableData.name = item.name;
          tableData.address = item.address;
          tableData.description = item.description;
          tableData.id = item.id;
          tableData.phone = item.phone;
          tableData.rating = item.rating;
          tableData.recent_order_num = item.recent_order_num;
          tableData.category = item.category;
          tableData.image_path = item.image_path;
          this.tableData.push(tableData);
        })
      }
    }

  }
</script>

<style scoped>

</style>
