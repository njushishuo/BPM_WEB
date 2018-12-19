import Axios from 'axios'

export default {

  getPapersByProjectId(projectId){
    return Axios.get('/Paper/?Paper.recruit_id='+projectId)
  },

  createdPaperBy(template, labelMap , questionMap){


  }
}
