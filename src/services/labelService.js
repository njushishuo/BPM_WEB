import Axios from 'axios'

export default {

  getLabelList(){
    return Axios.get('/Label')
  },


  getLabelNamesByQuestionLabels (ids,labelMap) {
    var labelIds = []
    var labelNames = []
    if (ids.lastIndexOf(';') != -1) {
      labelIds = ids.split(';')
    } else {
      labelIds[0] = ids
    }

    labelIds.map((obj) => {
      labelNames.push(labelMap.get(obj).label_name)
    })

    return labelNames
  },


  getLabelNamesByTemplateLabels (ids,labelMap) {
    var labelIds = []
    var labelNames = []
    if (ids.lastIndexOf(',') != -1) {
      labelIds = ids.split(',')
    } else {
      labelIds[0] = ids
    }

    labelIds.map((obj) => {
      labelNames.push(labelMap.get(obj).label_name)
    })

    return labelNames
  }
}
