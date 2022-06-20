let topAlbums = []
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
  url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${input.value}&api_key=b6d97def09e924303dab1c829302163b&format=json&limit=20`
  try {
    const res = await fetch(url)
    const data = await res.json()
    topAlbums = data.topalbums.album
    console.log(topAlbums)
    onSuccess()
  } catch (e) {
    console.error(e)
  }
}

const onSuccess = async () => {
  findOut.style.display = "none"
  //prompt.style.display = "none"
  questionContainer.style.display = "flex"
  scoreDisplay.style.display = "flex"

  if (turn === 6) {
    questionContainer.style.display = "none"
    question.style.display = "none"
    prompt.innerHTML = `All done! You answered ${actualScore} out of 5 correctly.`
    startOver.style.display = "flex"
    scoreDisplay.style.display = "none"
    startOver.onclick = () => {
      location.reload()
    }
  }

  let firstRandomSelect = Math.floor(Math.random() * topAlbums.length)
  let firstOp = {
    name: topAlbums[firstRandomSelect].name,
    img: topAlbums[firstRandomSelect].image[2]["#text"],
  }
  topAlbums.splice(firstRandomSelect, 1)

  let secondRandomSelect = Math.floor(Math.random() * topAlbums.length)
  let secondOp = {
    name: topAlbums[secondRandomSelect].name,
    img: topAlbums[secondRandomSelect].image[2]["#text"],
  }
  topAlbums.splice(secondRandomSelect, 1)

  let thirdRandomSelect = Math.floor(Math.random() * topAlbums.length)
  let thirdOp = {
    name: topAlbums[thirdRandomSelect].name,
    img: topAlbums[thirdRandomSelect].image[2]["#text"],
  }
  topAlbums.splice(thirdRandomSelect, 1)

  let fourthRandomSelect = Math.floor(Math.random() * topAlbums.length)
  let fourthOp = {
    name: topAlbums[fourthRandomSelect].name,
    img: topAlbums[fourthRandomSelect].image[2]["#text"],
  }
  topAlbums.splice(fourthRandomSelect, 1)

  boxOneImg.setAttribute("src", firstOp.img)
  boxTwoImg.setAttribute("src", secondOp.img)
  boxThreeImg.setAttribute("src", thirdOp.img)
  boxFourImg.setAttribute("src", fourthOp.img)
  console.log(topAlbums)

  let answerChoices = [
    [firstOp, butA],
    [secondOp, butB],
    [thirdOp, butC],
    [fourthOp, butD],
  ]

  let correctIndex = Math.floor(Math.random() * answerChoices.length)
  let incorrectIndex
  incorrectIndex !== correctIndex

  question.innerHTML = `Which ${input.value} album is "${answerChoices[correctIndex][0].name}"?`

  answerChoices[correctIndex][1].onclick = () => {
    actualScore++
    turn++
    scoreDisplay.innerHTML = `Question ${turn} Score ${actualScore}/5`
    onSuccess()
  }
  for (let i = 0; i < answerChoices.length; i++) {
    if (i !== correctIndex) {
      answerChoices[i][1].onclick = () => {
        turn++
        scoreDisplay.innerHTML = `Question ${turn} Score ${actualScore}/5`
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
