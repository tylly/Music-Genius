//Here the user is electing to play the game with artists. The functionality for the Genre game is in app2.js. A fetch request is sent
//using LastFM's get top albums from an artist method, which is reflected in the link.
findOutArtist.onclick = async (e) => {
  url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${input.value}&api_key=b6d97def09e924303dab1c829302163b&format=json&limit=30`
  try {
    const res = await fetch(url)
    const data = await res.json()
    //if the timer is activated, it will display when the game starts
    if (timerTrack === 1) {
      timeCount = timeChoice.value
      setInterval(startTimer, 1000)
      timer.style.display = "inline-block"
    }
    //this line sets the displayed time to start at what the user chose
    timer.textContent = timeCount
    //This filter method gets rid of any array elements that dont have image urls.
    let almostTopAlbums = data.topalbums.album.filter((hasImage) => {
      return hasImage.image[2]["#text"].startsWith("https")
    })

    //This filter attempts gets rid of multiple versions of the same album.
    //For example, Tha Carter III and Tha Carter III (super ultra mega extended remastered deluxe explicit)
    //I further mitigated this by limiting the search results, as they are ordered by popularity
    //This is a hard coded solution, there must be a better way with a nested for loop
    topAlbums = almostTopAlbums.filter((noRepeat) => {
      if (noRepeat.name.includes("(")) {
        return false
      } else {
        return true
      }
    })
    onSuccess()
  } catch (e) {
    console.error(e)
  }
}

//Once the data is succesfully received and filtered, the game starts with the onSuccess function
const onSuccess = () => {
  //hides home page buttons and prompts
  homeArray.forEach((i) => {
    i.style.display = "none"
  })
  //displays active game elements
  gameArray.forEach((i) => {
    i.style.display = "flex"
  })

  //This block ends the game after the user has had 5 turns or time runs out, displaying their results and offering a start over option
  //It also returns out of the onSuccess function so the unecessary code doesn't run
  const gameOver = () => {
    gameArray.forEach((i) => {
      i.style.display = "none"
    })
    timer.style.display = "none"
    prompt.style.display = "block"
    startOver.style.display = "flex"
    startOver.onclick = () => {
      location.reload()
    }
    if (actualScore === 0) {
      prompt.textContent = `WEAK! You answered ${actualScore} out of 5 correctly.`
    } else if (actualScore <= 3) {
      prompt.textContent = `Meh, you aren't core. You answered ${actualScore} out of 5 correctly.`
    } else if (actualScore === 4) {
      prompt.textContent = `Nice! You answered ${actualScore} out of 5 correctly.`
    } else {
      prompt.textContent = `Do you manage ${input.value}? You answered ${actualScore} out of 5 correctly.`
    }
    return
  }
  //if the timer is active, the player has their elected time to finish the game before the game over function runs
  //This is seperate from the displayed time
  if (timerTrack === 1) {
    setTimeout(gameOver, timeChoice.value * 1000)
  }
  //if the player answers all of the questions, the game over function runs
  if (turn === 6) {
    gameOver()
  }

  //Randomly splice 4 items out of the topAlbums array to eventually be used as answer choices in the global answerChoices array.
  //They are spliced out of the array one by one so they can't be chosen more than once. Options that aren't
  //used as the correct answer are later pushed back into the topAlbums array as objects so they can be used again.
  answerChoices.forEach((i) => {
    i[0] = topAlbums.splice(Math.floor(Math.random() * topAlbums.length), 1)})

  //images from the answer choices are displayed in the box images. Splice returns elements in an array, so the bracket notation is needed.
  for (let i = 0; i < boxImgArray.length; i++) {
    boxImgArray[i].setAttribute("src", answerChoices[i][0][0].image[2]["#text"])
  }

  //One of the answer choices is chosen as the correct one, and the name of the correct album is interpolated into the question
  let correctIndex = Math.floor(Math.random() * answerChoices.length)
  question.textContent = `Which ${input.value} album is "${answerChoices[correctIndex][0][0].name}"?`

  //All 3 elements not used as the correct answer are pushed back into the topAlbums so they can be used in future questions.
  //Becuase they were spliced and are now arrays, the bracket notation pushes just the object and not the whole array
  for (let i = 0; i < answerChoices.length; i++) {
    if (answerChoices[i] !== answerChoices[correctIndex]) {
      topAlbums.push(answerChoices[i][0][0])
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
