//These are two valid API keys for the LastFM API. I requested two in case I accidentally exceed their usuage limits outlined in their documentation
//b6d97def09e924303dab1c829302163b
//0475e4b7b017bd6c657020d0458d38ac

//Here we declare gobal variables and DOM selectors for use in all js files.
let topAlbums = []
let topAlbumsGenre = []
const scoreDisplay = document.getElementById("score")
const timer = document.getElementById("timer")
const onOff = document.getElementById("onOff")
const findOut = document.getElementById("findOutArtist")
const finOutGenre = document.getElementById("findOutGenre")
const or = document.getElementById("or")
const prompt = document.getElementById("prompt")
const prompt2 = document.getElementById("prompt2")
const homeArray = [onOff, findOut, finOutGenre, prompt, prompt2, or]
const startOver = document.getElementById("startOver")
const head = document.getElementById("head")
const input = document.getElementById("artist")
const inputGenre = document.getElementById("genre")
const questionContainer = document.getElementById("questionContainer")
const question = document.getElementById("question")
const genreImage = document.getElementById("genreImage")
const boxOneImg = document.getElementById("boxOneImg")
const boxTwoImg = document.getElementById("boxTwoImg")
const boxThreeImg = document.getElementById("boxThreeImg")
const boxFourImg = document.getElementById("boxFourImg")
const boxImgArray = [boxOneImg, boxTwoImg, boxThreeImg, boxFourImg]
const boxBut = document.querySelector(".boxBut")
const butA = document.getElementById("boxButA")
const butB = document.getElementById("boxButB")
const butC = document.getElementById("boxButC")
const butD = document.getElementById("boxButD")
const butArray = [butA, butB, butC, butD]

let turn = 1
let actualScore = 0
let timeCount = 16
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
}

onOff.onclick = change
