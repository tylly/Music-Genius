let topAlbums = []
let findOut = document.getElementById("findOut")
let input = document.getElementById("artist")
let url
let questionContainer = document.getElementById("questionContainer")
let prompt = document.getElementById('prompt')
let question = document.getElementById("question")
let boxOneImg = document.getElementById("boxOneImg")
let boxTwoImg = document.getElementById("boxTwoImg")
let boxThreeImg = document.getElementById("boxThreeImg")
let boxFourImg = document.getElementById("boxFourImg")
const butA = document.getElementById('boxButA')
const butB = document.getElementById('boxButB')
const butC = document.getElementById('boxButC')
const butD = document.getElementById('boxButD')
let correctResponse = 0


//b6d97def09e924303dab1c829302163b
//0475e4b7b017bd6c657020d0458d38ac

findOut.onclick = async (e) => {
  url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${input.value}&api_key=b6d97def09e924303dab1c829302163b&format=json`
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
  prompt.style.display = 'none'
  questionContainer.style.display = "flex"

  let firstRandomSelect = Math.floor(Math.random() * topAlbums.length)
  if (topAlbums[firstRandomSelect].image === false || '') {
    firstRandomSelect = Math.floor(Math.random() * topAlbums.length)
  }
  let firstOpName = topAlbums[firstRandomSelect].name
  let firstOpImg = topAlbums[firstRandomSelect].image[2]["#text"]
  let firstOp = {
    name: firstOpName,
    img: firstOpImg,
  }
  topAlbums.slice(firstRandomSelect, 1)

  let secondRandomSelect = Math.floor(Math.random() * topAlbums.length)
  if (topAlbums[secondRandomSelect].image === false || '') {
    secondRandomSelect = Math.floor(Math.random() * topAlbums.length)
  }
  let secondOpName = topAlbums[secondRandomSelect].name
  let secondOpImg = topAlbums[secondRandomSelect].image[2]["#text"]
  let secondOp = {
    name: secondOpName,
    img: secondOpImg,
  }
  topAlbums.slice(secondRandomSelect, 1)

  let thirdRandomSelect = Math.floor(Math.random() * topAlbums.length)
  if (topAlbums[thirdRandomSelect].image === false || '') {
    thirdRandomSelect = Math.floor(Math.random() * topAlbums.length)
  }
  let thirdOpName = topAlbums[thirdRandomSelect].name
  let thirdOpImg = topAlbums[thirdRandomSelect].image[2]["#text"]
  let thirdOp = {
    name: thirdOpName,
    img: thirdOpImg,
  }
  topAlbums.slice(thirdRandomSelect, 1)

  let fourthRandomSelect = Math.floor(Math.random() * topAlbums.length)
  if (topAlbums[fourthRandomSelect].image === false || '') {
    fourthRandomSelect = Math.floor(Math.random() * topAlbums.length)
  }
  let fourthOpName = topAlbums[fourthRandomSelect].name
  let fourthOpImg = topAlbums[fourthRandomSelect].image[2]["#text"]
  let fourthOp = {
    name: fourthOpName,
    img: fourthOpImg,
  }
  topAlbums.slice(fourthRandomSelect, 1)

  boxOneImg.setAttribute("src", firstOp.img)
  boxTwoImg.setAttribute("src", secondOp.img)
  boxThreeImg.setAttribute("src", thirdOp.img)
  boxFourImg.setAttribute("src", fourthOp.img)

  console.log(firstOp)
  console.log(secondOp)
  console.log(thirdOp)
  console.log(fourthOp)

  question.innerHTML = await `Which ${input.value} album is "${secondOp.name}"?`
}

const newQuestion = () => {}

// fetch(url)
// .then(res => {
//     res.json()
//     .then(data => {
//         topAlbums = data.topalbums
//     }
//     )

// })

// .catch(console.error)
