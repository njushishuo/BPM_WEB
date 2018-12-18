import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import HomeManager from '@/components/homeManage'
import HomeRecruit from '@/components/homeRecruit'
import UserList from '@/pages/manage/userList'
import QuestionList from '@/pages/manage/questionList'
import AddQuestion from '@/pages/manage/addQuestion'
import ProjectList from '@/pages/manage/projectList'

import MyProjectList from '@/pages/owner/myProjectList'
import ProjectDetail from '@/pages/owner/projectDetail'
import AddProject from '@/pages/owner/addProject'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login },

    {
      path: '/manager',
      name: 'homeManager',
      component: HomeManager,
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
      path: '/owner',
      name: 'owner',
      component: HomeRecruit,
      children:[
        {
          path:'/myProjectList',
          component:MyProjectList,
          meta:['数据管理','我的项目']
        },
        {
          path:'/projectDetail/:project_id',
          name:'ProjectDetail',
          component:ProjectDetail,
          meta:['数据管理','项目详情']
        },
        {
          path:'/addProject',
          component:AddProject,
          meta:['添加数据','添加项目']
        }
      ]},


  ]
})
