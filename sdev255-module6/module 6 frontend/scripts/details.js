addEventListener("DOMContentLoaded", async function(){
    //Grab the search params after the question mark
    const urlParam = new URLSearchParams(window.location.search)

    const songID = urlParam.get('id')
    console.log(songID)

    const response = await fetch("http://localhost:3000/api/songs/" + songID)
    const song = await response.json()
    console.log(song)

    let heading = ""
    heading += `${song.title}`
    this.document.querySelector("h1").innerHTML= heading

    let html = ""
    html+= `
    <p>Artist - ${song.artist} </p>
    <p>Popularity - ${song.popularity} </p>
    <p>Release Date - ${song.releaseDate} </p>
    `

    this.document.querySelector("div").innerHTML = html;
})