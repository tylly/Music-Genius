//Here, the user is electing to play the game with a genre. A fetch request is sent
//using LastFM's get top albums from a genre method, which is reflected in the link.
finOutGenre.onclick = async (e) => {
  if (inputGenre.value) {
    url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${inputGenre.value}&api_key=b6d97def09e924303dab1c829302163b&format=json`
    try {
      const res = await fetch(url)
      const data = await res.json()

      //if the timer is activated, it will show up when the game starts
      if (timerTrack === 1) {
        timeCount = timeChoice.value
        setInterval(startTimer, 1000)
        timer.style.display = "inline-block"
      }
      //this line sets the displayed time to start at what the user chose
      timer.textContent = timeCount

      //This filter method gets rid of any array elements that dont have image urls. This is less common with LastFM's get genre top albums fetch method,
      //but just in case, it will save headaches.
      topAlbumsGenre = data.albums.album.filter((hasImage) => {
        return hasImage.image[2]["#text"].startsWith("https")
      })

      onSuccessGenre()
    } catch (e) {
      console.error(e)
    }
  }
}
//Once the data is succesfully received and filtered, the game starts with the onSuccessGenre function
onSuccessGenre = () => {
  //hides home page buttons and prompts
  homeArray.forEach((i) => {
    i.style.display = "none"
  })
  //removes image boxes from answers
  boxImgArray.forEach((i) => {
    i.style.display = "none"
  })
  //display active game elements
  gameArray.forEach((i) => {
    i.style.display = "flex"
  })

  //This block ends the game after the user has had 5 turns or time runs out if playing with a timer, displaying their results and offering a start over option
  //It also returns out of the onSuccessGenre function so the unecessary code doesn't run
  const gameOver = () => {
    gameArray.forEach((i) => {
      i.style.display = "none"
    })
    timer.style.display = "none"
    prompt2.style.display = "block"
    genreImage.style.display = "none"
    startOver.style.display = "flex"
    startOver.onclick = () => {
      location.reload()
    }
    if (actualScore === 0) {
      prompt2.textContent = `WEAK! You answered ${actualScore} out of 5 correctly.`
    } else if (actualScore <= 3) {
      prompt2.textContent = `Meh, you aren't core. You answered ${actualScore} out of 5 correctly.`
    } else if (actualScore === 4) {
      prompt2.textContent = `Nice! You answered ${actualScore} out of 5 correctly.`
    } else {
      prompt2.textContent = `Perfect! You answered ${actualScore} out of 5 correctly.`
    }
    return
  }
  //if the timer is active, the player has their elected time to finish the game before the game over function runs
  if (timerTrack === 1) {
    setTimeout(gameOver, timeChoice.value * 1000)
  }
  //if the player answers all of the questions, the game over function runs
  if (turn === 6) {
    gameOver()
  }

  //Randomly choose 4 items out of the topAlbumsGenre array to eventually be used as answer choices in the global answerChoices array.
  //As indexes are chosen, they are spliced out of the array so these indexes can't be chosen more than once. Options that aren't
  //used as the correct answer are later pushed back into the topAlbums array so they can be used again.
  answerChoices.forEach((i) => {
    i[0] = topAlbumsGenre.splice(Math.floor(Math.random() * topAlbumsGenre.length),1)})

  //asign artist name choices to button text
  for (let i = 0; i < butArray.length; i++) {
    butArray[i].textContent = answerChoices[i][0][0].artist.name
  }

  //This block chooses on of the albums to display, and then asks the user which artist the album belongs to
  let correctIndex = Math.floor(Math.random() * answerChoices.length)
  question.textContent = `Whose album is this?`
  let correctImage = answerChoices[correctIndex][0][0].image[2]["#text"]
  genreImage.setAttribute("src", correctImage)

  //All 3 elements not used as the correct answer are pushed back into the topAlbumsGenre so they can be used in future questions.
  //Becuase they were spliced and are now arrays, the bracket notation pushes just the object and not the whole array
  for (let i = 0; i < answerChoices.length; i++) {
    if (answerChoices[i] !== answerChoices[correctIndex]) {
      topAlbumsGenre.push(answerChoices[i][0][0])
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
