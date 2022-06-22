//Relisting the API keys for ease of access
//b6d97def09e924303dab1c829302163b
//0475e4b7b017bd6c657020d0458d38ac

//Here, the user is electing to play the game with a Genre.
finOutGenre.onclick = async (e) => {
  url = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${inputGenre.value}&api_key=b6d97def09e924303dab1c829302163b&format=json`
  try {
    const res = await fetch(url)
    const data = await res.json()

    //This filter method gets rid of any array elements that dont have image urls. This is less common with LastFM's get genre top albums fetch method,
    //but just in case, it will save headaches.
    topAlbumsGenre = data.albums.album.filter((hasImage) => {
      return hasImage.image[2]["#text"].startsWith("https")
    })
    console.log(topAlbumsGenre)

    onSuccessGenre()
  } catch (e) {
    console.error(e)
  }
}

onSuccessGenre = () => {
  //Here, we get rid of the original prompts and display the question container. Note difference between what is displayed/not displayed
  //here and with the Onsuccess function in app.js
  findOut.style.display = "none"
  finOutGenre.style.display = "none"
  prompt.style.display = "none"
  prompt2.style.display = "none"
  or.style.display = "none"
  questionContainer.style.display = "flex"
  question.style.display = "flex"
  boxOneImg.style.display = "none"
  boxTwoImg.style.display = "none"
  boxThreeImg.style.display = "none"
  boxFourImg.style.display = "none"
  scoreDisplay.style.display = "flex"

  //This block ends the game after the user has had 5 turns, displaying their results and offering a start over option
  //It also returns out of the onSuccess function so the unecessary code doesn't run
  if (turn === 6) {
    questionContainer.style.display = "none"
    question.style.display = "none"
    if (actualScore === 0) {
      prompt2.textContent = `WEAK! You answered ${actualScore} out of 5 correctly.`
    } else if (actualScore <= 3) {
      prompt2.textContent = `Meh, you aren't core. You answered ${actualScore} out of 5 correctly.`
    } else if (actualScore === 4) {
      prompt2.textContent = `Nice! You answered ${actualScore} out of 5 correctly.`
    } else {
      prompt2.textContent = `Perfect! You answered ${actualScore} out of 5 correctly.`
    }
    prompt2.style.display = "block"
    genreImage.style.display = "none"
    startOver.style.display = "flex"
    scoreDisplay.style.display = "none"
    startOver.onclick = () => {
      location.reload()
    }
    return
  }

  //These next blocks randomly choose 4 items out of the topAlbums array to eventually be used as answer choices.
  //As indexes are chosen, they are spliced out of the array so these indexes can't be chosen more than once. Options that aren't
  //used as the correct answer are later pushed back into the topAlbums array so they can be used again. I could have just assigned
  //the Op variables the spliced elements directly, but the syntax gets hard to follow later in the code with this method. Using the randomSelect
  //variables makes the code more readable
  let firstRandomSelect = Math.floor(Math.random() * topAlbumsGenre.length)
  let firstOp = topAlbumsGenre[firstRandomSelect]
  topAlbumsGenre.splice(firstRandomSelect, 1)
  console.log(firstOp)

  let secondRandomSelect = Math.floor(Math.random() * topAlbumsGenre.length)
  let secondOp = topAlbumsGenre[secondRandomSelect]
  topAlbumsGenre.splice(secondRandomSelect, 1)

  let thirdRandomSelect = Math.floor(Math.random() * topAlbumsGenre.length)
  let thirdOp = topAlbumsGenre[thirdRandomSelect]
  topAlbumsGenre.splice(thirdRandomSelect, 1)

  let fourthRandomSelect = Math.floor(Math.random() * topAlbumsGenre.length)
  let fourthOp = topAlbumsGenre[fourthRandomSelect]
  topAlbumsGenre.splice(fourthRandomSelect, 1)

  //Buttons are assigned with artist names from the randomly selected answer choices
  butA.textContent = firstOp.artist.name
  butB.textContent = secondOp.artist.name
  butC.textContent = thirdOp.artist.name
  butD.textContent = fourthOp.artist.name

  //All of the answer choices are put into an array and grouped with buttons
  let answerChoices = [
    [firstOp, butA],
    [secondOp, butB],
    [thirdOp, butC],
    [fourthOp, butD],
  ]

  //This block chooses on of the albums to display, and then asks the user which artist the album belongs to
  let correctIndex = Math.floor(Math.random() * answerChoices.length)
  question.textContent = `Whose album is this?`
  let correctImage = answerChoices[correctIndex][0].image[2]["#text"]
  genreImage.setAttribute("src", correctImage)

  console.log(correctImage)

  //All 3 elements not used as the correct answer are pushed back into the topAlbums so they can be used in future questions
  for (let i = 0; i < answerChoices.length; i++) {
    if (answerChoices[i] !== answerChoices[correctIndex]) {
      topAlbumsGenre.push(answerChoices[i][0])
    }
  }

  //If the button corresponding to the correct answer is clicked, the players score is incremented, the turn is incremented, score is updated
  //and onSuccessGenre runs again
  answerChoices[correctIndex][1].onclick = () => {
    actualScore++
    turn++
    scoreDisplay.textContent = `Question ${turn} Score ${actualScore}/5`
    onSuccessGenre()
  }

  //If a button corresponding to an incorrect answer is clicked, the turn is incremented, the score is updated and onSuccessGenre runs again
  for (let i = 0; i < answerChoices.length; i++) {
    if (i !== correctIndex) {
      answerChoices[i][1].onclick = () => {
        turn++
        scoreDisplay.textContent = `Question ${turn} Score ${actualScore}/5`
        onSuccessGenre()
      }
    }
  }
}
