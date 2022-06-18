let topAlbums
//b6d97def09e924303dab1c829302163b
//0475e4b7b017bd6c657020d0458d38ac

document.addEventListener("DOMContentLoaded", async e => {
    url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=halsey&api_key=b6d97def09e924303dab1c829302163b&format=json"
    try {
    const res = await fetch(url)
    const data = await res.json()
    topAlbums = data.topalbums
    console.log(topAlbums)
    onSuccess()
    }
    catch(e){
        console.error(e)
    }
})
console.log(topAlbums)


const onSuccess = () => {
    console.log('suh dude')
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