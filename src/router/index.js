import Vue from 'vue'
import Router from 'vue-router'
import Login from '@pages/login'
import ManageSideBar from '@/components/sideBarManager'
import RecruitSideBar from '@/components/sideBarRecruit'
import UserList from '@/pages/userList'
import QuestionList from '@/pages/questionList'
import ProjectList from '@/pages/projectList'
import AddQuestion from '@/pages/addQuestion'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login },
    {
      path: '/manage',
      name: 'manage',
      component: ManageSideBar,
      children:[
        {
          path:'/userList',
          component:UserList,
          meta:['数据管理','用户列表']
        },
        {
          path:'/projectList',
          component:ProjectList,
          meta:['数据管理','项目列表']
        },
        {
          path:'/questionList',
          component:QuestionList,
          meta:['数据管理','试题列表']
        },
        {
          path:'/addQuestion',
          component:AddQuestion,
          meta:['添加数据','添加试题']
        }
      ]},
    {
      path: '/projectOwner',
      name: 'owner',
      component: RecruitSideBar,
      children:[
        {
          path:'/userList',
          component:UserList,
          meta:['数据管理','我的项目']
        },
        {
          path:'/projectList',
          component:ProjectList,
          meta:['数据管理','我的模板']
        },
        {
          path:'/questionList',
          component:QuestionList,
          meta:['数据管理','我的试卷']
        },
        {
          path:'/addQuestion',
          component:AddQuestion,
          meta:['添加数据','添加项目']
        }
      ]},


  ]
})
