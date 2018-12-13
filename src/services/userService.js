import Axios from 'axios'

export default {

  getUserList () {
    return Axios.get('/User')
  }
}
