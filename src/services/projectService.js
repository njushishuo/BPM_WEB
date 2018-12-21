import Axios from 'axios'

export default {

  getProjectList () {
    return Axios.get('/Recruit')
  },

  getProjectListByUserId(userId){
    return Axios.get('/Recruit/?Recruit.owner_id='+userId)
  },

  getProjectById(id){
    return Axios.get('/Recruit/'+id)
  },

  addProject(para){
    return Axios.post('/Recruit',para)
  },

  deleteProjectById(id){
    return Axios.delete('/Recruit/'+id)
  },


}
