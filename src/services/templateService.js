import Axios from 'axios'

export default {

  getTemplatesByProjectId(projectId){
    return Axios.get('/Template/?Template.recruit_id='+projectId)
  },

  deleteTemplate(id){
    return Axios.delete('/Template/'+id)
  },
}
