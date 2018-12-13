import Axios from 'axios'

export default {

  getLabelList(){
    return Axios.get('/Label')
  },

  getQuestionList () {
    return Axios.get('/Question')
  },

  addQuestion(para){
    return Axios.post('/Question',para)
  }
}
