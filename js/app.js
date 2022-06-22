//Here we declare gobal variables and DOM selectors for use in all js files.
let topAlbums = []
let topAlbumsGenre = []
const findOut = document.getElementById("findOutArtist")
const finOutGenre = document.getElementById("findOutGenre")
const startOver = document.getElementById("startOver")
let head = document.getElementById("head")
let input = document.getElementById("artist")
let inputGenre = document.getElementById("genre")
let url
let questionContainer = document.getElementById("questionContainer")
let prompt = document.getElementById("prompt")
let prompt2 = document.getElementById("prompt2")
const or = document.getElementById("or")
let question = document.getElementById("question")
let genreImage = document.getElementById("genreImage")
let boxOneImg = document.getElementById("boxOneImg")
let boxTwoImg = document.getElementById("boxTwoImg")
let boxThreeImg = document.getElementById("boxThreeImg")
let boxFourImg = document.getElementById("boxFourImg")
let boxBut = document.getElementsByClassName("boxBut")
let butA = document.getElementById("boxButA")
let butB = document.getElementById("boxButB")
let butC = document.getElementById("boxButC")
let butD = document.getElementById("boxButD")
let scoreDisplay = document.getElementById("score")
let turn = 1
let actualScore = 0

//These are two valid API keys for the LastFM API. I requested two in case I accidentally exceed their usuage limits outlined in their documentation
//b6d97def09e924303dab1c829302163b
//0475e4b7b017bd6c657020d0458d38ac

//Here, the user is electing to play the game with artists. The functionality for the Genre game is in app2.js
findOut.onclick = async (e) => {
  url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${input.value}&api_key=b6d97def09e924303dab1c829302163b&format=json&limit=50`
  try {
    const res = await fetch(url)
    const data = await res.json()
    
    //This filter method gets rid of any array elements that dont have image urls.
    topAlbums = data.topalbums.album.filter((hasImage) => {
      return hasImage.image[2]["#text"].startsWith("https")
    })
    //Once the data is succesfully received, the game starts with the onSuccess function
    onSuccess()
  } catch (e) {
    console.error(e)
  }
}

const onSuccess = () => {
  //Here, we get rid of the original prompts and display the question container
  findOut.style.display = "none"
  finOutGenre.style.display = "none"
  prompt.style.display = "none"
  prompt2.style.display = "none"
  or.style.display = "none"
  questionContainer.style.display = "flex"
  question.style.display = "flex"
  scoreDisplay.style.display = "flex"

  //This block ends the game after the user has had 5 turns, displaying their results and offering a start over option
  //It also returns out of the onSuccess function so the unecessary code doesn't run
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
    return
  }

  //These next blocks randomly choose 4 items out of the topAlbums array to eventually be used as answer choices.
  //As they are chosen, they are spliced out of the array so they can't be chosen more than once. Options that aren't
  //used as the correct answer are later pushed back into the topAlbums array so they can be used again. I could have just assigned
  //the Op variables the spliced elements directly, but the syntax gets hard to follow later in the code with this method. Using the randomSelect
  //variables makes the code more readable

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

  //Here, the images from the answer choices are displayed in the container
  boxOneImg.setAttribute("src", firstOp.image[2]["#text"])
  boxTwoImg.setAttribute("src", secondOp.image[2]["#text"])
  boxThreeImg.setAttribute("src", thirdOp.image[2]["#text"])
  boxFourImg.setAttribute("src", fourthOp.image[2]["#text"])


  //Create the answer choices array, grouping together the selected topAlbums indexes with buttons
  let answerChoices = [
    [firstOp, butA],
    [secondOp, butB],
    [thirdOp, butC],
    [fourthOp, butD],
  ]

  //One of the answer choices is chosen as the correct one, and the name of the correct album is interpolated into the question
  let correctIndex = Math.floor(Math.random() * answerChoices.length)
  question.textContent = `Which ${input.value} album is "${answerChoices[correctIndex][0].name}"?`

  //All 3 elements not used as the correct answer are pushed back into the topAlbums so they can be used in future questions
  for (let i = 0; i < answerChoices.length; i++) {
    if (answerChoices[i] !== answerChoices[correctIndex]) {
      topAlbums.push(answerChoices[i][0])
    }
  }

  //If the button corresponding to the correct answer is clicked, the players score is incremented, the turn is incremented, score is updated
  //and onSuccess runs again
  answerChoices[correctIndex][1].onclick = () => {
    actualScore++
    turn++
    scoreDisplay.textContent = `Question ${turn} Score ${actualScore}/5`
    onSuccess()
  }
//If a button corresponding to an incorrect answer is clicked, the turn is incremented, the score is updated and onSuccess runs again
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

