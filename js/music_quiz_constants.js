//These are two valid API keys for the LastFM API. I requested two in case I accidentally exceed their usuage limits outlined in their documentation
//b6d97def09e924303dab1c829302163b
//0475e4b7b017bd6c657020d0458d38ac

//Here we declare gobal variables and DOM selectors for use in all js files.
let topAlbums = []
let topAlbumsGenre = []
const timer = document.getElementById("timer")
let onOff = document.getElementById("onOff")
const findOut = document.getElementById("findOutArtist")
const finOutGenre = document.getElementById("findOutGenre")
const or = document.getElementById("or")
let prompt = document.getElementById("prompt")
let prompt2 = document.getElementById("prompt2")
let homeArray = [
    onOff,
    findOut,
    finOutGenre,
    prompt,
    prompt2,
    or
]
const startOver = document.getElementById("startOver")
let head = document.getElementById("head")
let input = document.getElementById("artist")
let inputGenre = document.getElementById("genre")
let url
let questionContainer = document.getElementById("questionContainer")
let question = document.getElementById("question")
let genreImage = document.getElementById("genreImage")
let boxOneImg = document.getElementById("boxOneImg")
let boxTwoImg = document.getElementById("boxTwoImg")
let boxThreeImg = document.getElementById("boxThreeImg")
let boxFourImg = document.getElementById("boxFourImg")
let boxImgArray = [
    boxOneImg,
    boxTwoImg,
    boxThreeImg,
    boxFourImg
]
let boxBut = document.querySelector(".boxBut")
let butA = document.getElementById("boxButA")
let butB = document.getElementById("boxButB")
let butC = document.getElementById("boxButC")
let butD = document.getElementById("boxButD")
let scoreDisplay = document.getElementById("score")
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
