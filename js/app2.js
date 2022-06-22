//b6d97def09e924303dab1c829302163b
//0475e4b7b017bd6c657020d0458d38ac
let topAlbumsGenre = []

finOutGenre.onclick = async (e) => {
  url = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${inputGenre.value}&api_key=b6d97def09e924303dab1c829302163b&format=json`
  try {
    const res = await fetch(url)
    const data = await res.json()

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
  findOut.style.display = "none"
  finOutGenre.style.display = "none"
  prompt.style.display = "none"
  prompt2.style.display = "none"
  or.style.display = "none"
  questionContainer.style.display = "flex"
  boxOneImg.style.display = "none"
  boxTwoImg.style.display = "none"
  boxThreeImg.style.display = "none"
  boxFourImg.style.display = "none"
  scoreDisplay.style.display = "flex"

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

  butA.textContent = firstOp.artist.name
  butB.textContent = secondOp.artist.name
  butC.textContent = thirdOp.artist.name
  butD.textContent = fourthOp.artist.name

  let answerChoices = [
    [firstOp, butA],
    [secondOp, butB],
    [thirdOp, butC],
    [fourthOp, butD],
  ]

  let correctIndex = Math.floor(Math.random() * answerChoices.length)
  question.textContent = `Whose album is this??`

}
