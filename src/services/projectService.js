import Axios from 'axios'

export default {

  getProjectList () {
    return Axios.get('/Recruit')
  },

  getProjectListByUserId(userId){
    return Axios.get('/Recruit/?Recruit.owner_id='+userId)
  }
}
