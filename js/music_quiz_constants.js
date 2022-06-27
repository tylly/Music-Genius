let topAlbums = []
let topAlbumsGenre = []
const scoreDisplay = document.getElementById("score")
const timer = document.getElementById("timer")
const homeArray = Array.from(document.getElementsByClassName("home"))
const findOutArtist = homeArray[4]
const finOutGenre = homeArray[8]
const prompt = homeArray[2]
const startOver = document.getElementById("startOver")
const head = document.getElementById("head")
const input = document.getElementById("artist")
const inputGenre = document.getElementById("genre")
const questionContainer = document.getElementById("questionContainer")
const question = document.getElementById("question")
const gameArray = [question, questionContainer, scoreDisplay]
const genreImage = document.getElementById("genreImage")
const boxImgArray = Array.from(questionContainer.getElementsByClassName("boxImg"))
const butArray = Array.from(questionContainer.getElementsByClassName("boxBut"))
let firstOp
let secondOp
let thirdOp
let fourthOp
//Create the answer choices array, grouping together the selected album elements with buttons.
let answerChoices = [
  [firstOp, butArray[0]],
  [secondOp, butArray[1]],
  [thirdOp, butArray[2]],
  [fourthOp, butArray[3]],
]

let turn = 1
let actualScore = 0
let timeCount
let timerTrack = 0

const change = () => {
  if (timerTrack === 0) {
    timerTrack++
    onOff.style.background = "teal"
    onOff.textContent = "Timer: On"
  } else {
    timerTrack--
    onOff.textContent = "Timer: Off"
    onOff.style.background = "transparent"
  }
  if (timerTrack === 1) {
    timeChoice.style.display = "flex"
  } else {
    timeChoice.style.display = "none"
  }
}
const startTimer = () => {
  timeCount--
  timer.textContent = timeCount
}

onOff.onclick = change
