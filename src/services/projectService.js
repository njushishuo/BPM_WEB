import Axios from 'axios'

export default {

  getProjectList () {
    return Axios.get('/Recruit')
  }
}
