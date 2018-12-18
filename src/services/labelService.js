import Axios from 'axios'

export default {

  getLabelList(){
    return Axios.get('/Label')
  }
}
