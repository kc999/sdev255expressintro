addEventListener("DOMContentLoaded", async function(){
    document.querySelector("#UpdateBtn").addEventListener("click", updateSong)
    const urlParam = new URLSearchParams(window.location.search)
    const songID = urlParam.get('id')
    const response = await this.fetch("http://localhost:3000/api/songs/" + songID)
    if (response.ok)
    {
        let song = await response.json()
        document.querySelector("#songID").value = song._id
        document.querySelector("#title").value = song.title
        document.querySelector("#artist").value = song.artist
        document.querySelector("#released").value = song.releaseDate.substring(0,10)
        document.querySelector("#popularity").value = song.popularity
        document.querySelector("#genre").value = song.genre
    }

    async function updateSong(){
        //Create song object from  form field
        const songID = document.querySelector("#songID").value
        const song = {
            _id: document.querySelector("#songID").value,
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#released").value,
        popularity: document.querySelector("#popularity").value,
        genre: document.querySelector("#genre").value ? 
        document.querySelector("#genre").value.split(",") : []
        }
        const response = await fetch("http://localhost:3000/api/songs/" + songID,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(song)
        })
        if (response.ok){
            alert("Updated Song")
        }
        else
        {
            document.querySelector("error").innerHTML = "Cannot update song"
        }
    }
})