import Axios from 'axios'
import LabelService from './labelService'
import UtilService from './util'

export default {
  getQuestionList () {
    return Axios.get('/Question')
  },

  deleteQuestion(id){
    return Axios.delete('/Question/'+id)
  },

  addQuestion(para){
    return Axios.post('/Question',para)
  },


  processQuestionList(rawList , resultList ,labelMap) {
    rawList.map((obj) => {
      var question_type = UtilService.question_type_map.get(obj.question_type)
      var labelNames = LabelService.getLabelNamesByQuestionLabels(obj.labels, labelMap)
      if (obj.question_type == 'ESSAY') {
        resultList.push({
          id: obj.id,
          quesDesc: obj.question_desc,
          quesType: question_type,
          label: labelNames,
          answer: obj.answer
        })
      }
      if (obj.question_type == 'MULTIPLE_CHOICE') {
        var options = obj.answer.split(';')
        var charCode = UtilService.charCodeOfA + parseInt(options[options.length - 1])
        var answer = String.fromCharCode(charCode)
        options.splice(options.length - 1, 1)
        resultList.push({
          id: obj.id,
          quesDesc: obj.question_desc,
          quesType: question_type,
          label: labelNames,
          option: options,
          answer: answer
        })
      }
    })
  },
}
