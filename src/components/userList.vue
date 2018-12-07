<template>
    <div class="fillcontain">
        <my-header></my-header>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="username"
                  label="用户名"
                  width="220">
                </el-table-column>
              <el-table-column
                property="nickname"
                label="用户昵称"
                width="220">
              </el-table-column>
              <el-table-column
                property="company"
                label="公司名称">
              </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="15"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from '@/components/myHeader'
    export default {
        name: 'userList',

    	  components: {
          MyHeader,
    	  },

        data(){
        return {
          tableData: [{
            username: '675342907',
            nickname: '东光太郎',
            company: '个人',
          }, {
            username: '118953210',
            nickname: '小智',
            company: '个人',
          },{
            username: '77412350',
            nickname: '大古队员',
            company: '个人',
          }, {
            username: '27851371',
            nickname: '矢的猛老师',
            company: '个人',
          }],
          currentRow: null,
          offset: 0,
          limit: 15,
          count: 0,
          currentPage: 1,
        }
        },
        created(){
            // this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getUserCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            async getUsers(){
                const Users = await getUserList({offset: this.offset, limit: this.limit});
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    tableData.username = item.username;
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
