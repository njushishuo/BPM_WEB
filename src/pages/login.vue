<template>
  <el-row style=" text-align: center; top:30%" >
    <el-col :span="5" :offset="9">
      <el-card class="box-card" >
        <div slot="header" class="manage_tip">
          <p>Smart HR</p>
        </div>
          <section class="form_contianer" v-show="showLogin">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm()" class="submit_btn">登陆</el-button>
              </el-form-item>
            </el-form>
          </section>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

  import UserService from '../services/userService'
  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        },
        showLogin: true,
        options: [{
          value: 'admin',
          label: '管理员'
        }, {
          value: 'user',
          label: '发布员'
        }],

        user:{}

      }
    },

    methods: {
      async submitForm () {
        var res = await UserService.getUserByUsername(this.loginForm.username);
        var users = res.data.User;
        console.log(users)
        if(users != null && users.length == 1){
          this.user = users[0];
          this.$cookie.set('userId',this.user.id)
          this.$cookie.set('username',this.user.username)
          this.$cookie.set('nickname',this.user.nickname)
          this.$cookie.set('company',this.user.company)
          this.$cookie.set('city',this.user.city)
          // console.log('user login:')
          // console.log(this.user)
          /**
           *  user type : admin / owner
           */
          if (this.loginForm.username == 'admin') {
            this.$router.push('userList')
            this.$cookie.set('userType','admin')
          } else {
            this.$router.push('owner')
            this.$cookie.set('userType','owner')
          }
          this.loginForm.username = '';
          this.loginForm.password = '';
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';

  .login_page {
    background-color: #324057;
  }

  .manage_tip {
    width: 100%;

    p {
      font-size: 34px;
    }
  }

  .form_contianer {
    border-radius: 5px;
    background-color: #fff;

    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }


  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }

  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
