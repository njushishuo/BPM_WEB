import Axios from 'axios'

export default {

  getTemplatesByProjectId(projectId){
    return Axios.get('/Template/?Template.recruit_id='+projectId)
  },


  getTemplateById(id){
    return Axios.get('/Template/'+id)
  },

  deleteTemplate(id){
    return Axios.delete('/Template/'+id)
  },

  addTemplate(template){
    return Axios.post('/Template',template)
  }
}
