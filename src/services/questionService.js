import Axios from 'axios'

export default {

  getLabelList(){
    return Axios.get('/Label')
  },

  getQuestionList () {
    return Axios.get('/Question')
  },

  deleteQuestion(id){
    return Axios.delete('/Question/'+id)
  },

  addQuestion(para){
    return Axios.post('/Question',para)
  }
}
