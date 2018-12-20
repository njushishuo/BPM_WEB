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
import PaperDetail from '@/pages/owner/paperDetail'
import PaperPreview from '@/pages/owner/paperPreview'
import TemplateList from '@/pages/owner/templateList'
import PaperList from '@/pages/owner/paperList'
import AddProject from '@/pages/owner/addProject'
import AddTemplate from '@/pages/owner/addTemplate'



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
          name:'UserList',
          component:UserList,
          meta:['数据管理','用户列表']
        },
        {
          path:'/projectList',
          name:'ProjectList',
          component:ProjectList,
          meta:['数据管理','项目列表']
        },
        {
          path:'/questionList',
          name:'QuestionList',
          component:QuestionList,
          meta:['数据管理','试题列表']
        },
        {
          path:'/addQuestion',
          name:'AddQuestion',
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
          name:'MyProjectList',
          component:MyProjectList,
          meta:['数据管理','项目管理']
        },
        {
          path:'/projectDetail/:project_id',
          name:'ProjectDetail',
          component:ProjectDetail,
          meta:['数据管理','项目详情']
        },
        {
          path:'/project/:project_id/templateList',
          name:'TemplateList',
          component:TemplateList,
          meta:['数据管理','模板管理']
        },
        {
          path:'/project/:project_id/paperList',
          name:'PaperList',
          component:PaperList,
          meta:['数据管理','试卷管理']
        },
        {
          path:'/paper/:paper_id',
          name:'PaperDetail',
          component:PaperDetail,
          meta:['数据管理','试卷详情']
        },
        {
          path:'/addProject',
          name:'AddProject',
          component:AddProject,
          meta:['添加数据','添加项目']
        },
        {
          path:'/project/:project_id/addTemplate',
          name:'AddTemplate',
          component:AddTemplate,
          meta:['添加数据','添加模板']
        },
        {
          path:'/template/:template_id/paperPreview',
          name:'PaperPreview',
          component:PaperPreview,
          meta:['添加数据','预览模板']
        }
      ]},


  ]
})
