import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/components/manage'
import Home from '@/components/home'
import UserList from '@/components/userList'
import QuestionList from '@/components/questionList'
import ProjectList from '@/components/projectList'
import AddQuestion from '@/components/addQuestion'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sideBar',
      component: Manage,
      children:[
        {
          path:'',
          component:Home,
          meta:[],
        },
        {
          path:'/userList',
          component:UserList,
          mata:['数据管理','用户列表']
        },
        {
          path:'/projectList',
          component:ProjectList,
          mata:['数据管理','项目列表']
        },
        {
          path:'/questionList',
          component:QuestionList,
          mata:['数据管理','试题列表']
        },
        {
          path:'/addQuestion',
          component:AddQuestion,
          mata:['添加数据','添加试题']
        }
      ]
    }
  ]
})
