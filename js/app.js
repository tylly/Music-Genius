let topAlbums = []
let getTracklist = []
const findOut = document.getElementById("findOut")
const startOver = document.getElementById("startOver")
let head = document.getElementById("head")
let input = document.getElementById("artist")
let url
let questionContainer = document.getElementById("questionContainer")
let prompt = document.getElementById("prompt")
let question = document.getElementById("question")
let boxOneImg = document.getElementById("boxOneImg")
let boxTwoImg = document.getElementById("boxTwoImg")
let boxThreeImg = document.getElementById("boxThreeImg")
let boxFourImg = document.getElementById("boxFourImg")
const butA = document.getElementById("boxButA")
const butB = document.getElementById("boxButB")
const butC = document.getElementById("boxButC")
const butD = document.getElementById("boxButD")
let scoreDisplay = document.getElementById("score")
let turn = 1
let actualScore = 0
let correctResponse = []

//b6d97def09e924303dab1c829302163b
//0475e4b7b017bd6c657020d0458d38ac

findOut.onclick = async (e) => {
  url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${input.value}&api_key=b6d97def09e924303dab1c829302163b&format=json&limit=50`
  try {
    const res = await fetch(url)
    const data = await res.json()
    topAlbums = data.topalbums.album
    for (let i = 0; i < topAlbums.length; i++) {
      if (topAlbums[i].image[2]["#text"] === false || undefined || null || "") {
        topAlbums.splice(i, 1)
      }
    }
    console.log(topAlbums)

    onSuccess()
  } catch (e) {
    console.error(e)
  }
}

const onSuccess = () => {
  findOut.style.display = "none"
  prompt.style.display = "none"
  questionContainer.style.display = "flex"
  scoreDisplay.style.display = "flex"

  if (turn === 6) {
    questionContainer.style.display = "none"
    question.style.display = "none"
    if (actualScore === 0) {
      prompt.textContent = `WEAK! You answered ${actualScore} out of 5 correctly.`
    } else if (actualScore <= 3) {
      prompt.textContent = `Meh, you aren't core. You answered ${actualScore} out of 5 correctly.`
    } else if (actualScore === 4) {
      prompt.textContent = `Nice! You answered ${actualScore} out of 5 correctly.`
    } else {
      prompt.textContent = `Do you manage ${input.value}? You answered ${actualScore} out of 5 correctly.`
    }
    prompt.style.display = "block"
    startOver.style.display = "flex"
    scoreDisplay.style.display = "none"
    startOver.onclick = () => {
      location.reload()
    }
  }

  let firstRandomSelect = Math.floor(Math.random() * topAlbums.length)
  let firstOp = topAlbums[firstRandomSelect]
  topAlbums.splice(firstRandomSelect, 1)

  let secondRandomSelect = Math.floor(Math.random() * topAlbums.length)
  let secondOp = topAlbums[secondRandomSelect]
  topAlbums.splice(secondRandomSelect, 1)

  let thirdRandomSelect = Math.floor(Math.random() * topAlbums.length)
  let thirdOp = topAlbums[thirdRandomSelect]
  topAlbums.splice(thirdRandomSelect, 1)

  let fourthRandomSelect = Math.floor(Math.random() * topAlbums.length)
  let fourthOp = topAlbums[fourthRandomSelect]
  topAlbums.splice(fourthRandomSelect, 1)

  boxOneImg.setAttribute("src", firstOp.image[2]["#text"])
  boxTwoImg.setAttribute("src", secondOp.image[2]["#text"])
  boxThreeImg.setAttribute("src", thirdOp.image[2]["#text"])
  boxFourImg.setAttribute("src", fourthOp.image[2]["#text"])

  let answerChoices = [
    [firstOp, butA],
    [secondOp, butB],
    [thirdOp, butC],
    [fourthOp, butD],
  ]

  let correctIndex = Math.floor(Math.random() * answerChoices.length)
  question.textContent = `Which ${input.value} album is "${answerChoices[correctIndex][0].name}"?`

  for (let i = 0; i < answerChoices.length; i++) {
    if (answerChoices[i] !== answerChoices[correctIndex]) {
      topAlbums.push(answerChoices[i][0])
    }
  }
  console.log(topAlbums)

  answerChoices[correctIndex][1].onclick = () => {
    actualScore++
    turn++
    scoreDisplay.textContent = `Question ${turn} Score ${actualScore}/5`
    onSuccess()
  }

  for (let i = 0; i < answerChoices.length; i++) {
    if (i !== correctIndex) {
      answerChoices[i][1].onclick = () => {
        turn++
        scoreDisplay.textContent = `Question ${turn} Score ${actualScore}/5`
        onSuccess()
      }
    }
  }
}

// fetch(url)
// .then(res => {
//     res.json()
//     .then(data => {
//         topAlbums = data.topalbums
//     }
//     )

// })

// .catch(console.error)
