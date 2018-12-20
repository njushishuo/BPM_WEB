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

    var bestMatchScore = 5

    var paper = []
    for (var i = 0; i < templateItems.length; i++) {
      var templateItem = templateItems[i]
      var index = templateItem.lastIndexOf(',')
      var labelIdString = templateItem.substring(0, index)
      // console.log("tempLabel:"+labelIdString)
      var tempLabelId = parseInt(labelIdString)
      var count = templateItem.substring(index + 1, templateItem.length)
      var tempList = []
      for (var j = 0; j < questionList.length; j++) {
        // console.log(questionList[j].labels)
        var score = 0
        var tempLabel = labelMap.get(tempLabelId)

        if (tempLabel.level == 2 && questionList[j].labels.indexOf(labelIdString) != -1) {
          score += tempLabel.level * bestMatchScore
        } else if (tempLabel.level == 1) {
          score += countCrossLevelMatch(labelLevelMap.get(tempLabelId), questionList[j].labels)
        }

        tempList.push({
          questionId: questionList[j].id,
          questionLabels: questionList[j].labels,
          score: score
        })
      }
      // console.log(tempList)
      tempList.sort(sortByScore)
      // console.log(tempList)

      var tempCnt = 0
      for (var k = 0; k < tempList.length; k++) {
        if (tempCnt >= count) {
          break
        }
        if (tempList[k].score >= 1) {
          paper.push(questionMap.get(tempList[k].questionId))
          tempCnt++
        }
      }
    }

    console.log(paper)
    return paper

  },

}
