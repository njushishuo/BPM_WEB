import Axios from 'axios'

export default {

  getUserList () {
    return Axios.get('/User')
  },

  getUserByUsername( username){
    return Axios.get('/User/?User.username='+username)
  }
}
