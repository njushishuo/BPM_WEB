import Axios from 'axios'

function sortByScore (ob1, ob2) {
  return ob1.level > ob2.level
}

function countCrossLevelMatch (sonArray, questionLabels) {
  var questionLabelArray = []
  if (questionLabels.indexOf(';') == -1) {
    questionLabelArray[0] = parseInt(questionLabels)
  } else {
    var tempArray = questionLabels.split(';')
    tempArray.map((item) => {
      questionLabelArray.push(parseInt(item))
    })
  }

  var score = 0
  for (var i = 0; i < sonArray.length; i++) {
    for (var j = 0; j < questionLabelArray.length; j++) {
      if (sonArray[i] == questionLabelArray[j]) {
        score++
      }
    }
  }
  return score
}

export default {


  getPaperById(id){
    return Axios.get('/Paper/'+id)
  },

  getPapersByProjectId (projectId) {
    return Axios.get('/Paper/?Paper.recruit_id=' + projectId)
  },

  deletePaper(id){
    return Axios.delete('/Paper/'+id)
  },

  addPaper(paper){
    return Axios.post('/Paper', paper)
  },

  createdPaperBy (template, labelMap, questionMap, questionList, labelLevelMap) {
    var templateItems = []

    if (template.items.lastIndexOf(';') == -1) {
      templateItems[0] = template.items
    } else {
      templateItems = template.items.split(';')
    }

    // console.log(labelMap)
    // console.log(labelLevelMap)
    // console.log(questionMap)
    // console.log(questionList)

    var bestMatchScore = 5

    var paper = []
    for (var i = 0; i < templateItems.length; i++) {

      /**
       * process item
       * get labelId, count
       */
      var templateItem = templateItems[i]
      var index = templateItem.lastIndexOf(',')
      var labelIdString = templateItem.substring(0, index)
      var tempLabelId = parseInt(labelIdString)
      var tempLabel = labelMap.get(tempLabelId)
      var count = templateItem.substring(index + 1, templateItem.length)

      var tempList = []
      console.log('handle label:')
      console.log(tempLabel)
      for (var j = 0; j < questionList.length; j++) {
        // console.log(questionList[j].labels)
        var score = 0

        if (questionList[j].labels.indexOf(labelIdString) != -1) {
          score += tempLabel.level * bestMatchScore
        } else if (tempLabel.level == 1) {
          var relationScore = countCrossLevelMatch(labelLevelMap.get(tempLabelId), questionList[j].labels)
          score += relationScore
        }

        if(score>0){
          tempList.push({
            questionId: questionList[j].id,
            questionLabels: questionList[j].labels,
            score: score
          })
        }
      }

      // console.log(tempList)
      tempList.sort(sortByScore)
      console.log('sort questions:')
      console.log(tempList)

      var tempCnt = 0
      for (var k = 0; k < tempList.length; k++) {
        if (tempCnt >= count) {
          break
        }
        paper.push( questionMap.get(tempList[k].questionId) )
        tempCnt++
      }
      console.log('paper:')
      console.log(paper)
    }

    return paper

  },

}
