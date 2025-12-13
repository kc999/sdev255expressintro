addEventListener("DOMContentLoaded", function(){
    this.document.querySelector("#registerBtn").addEventListener("click", addUser);
})

//Add the song to the database, it has to be an async function because we are calling data outside our server

async function addUser(){
    //Create a user object
    const user = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
        status: "offline"
    }
    const verifiedPassword = document.querySelector("#vpassword").value

    if (verifiedPassword != user.password)
    {
        document.querySelector("#error").innerHTML = "Passwords do not match. User not created"
    }
    else if (verifiedPassword == user.password)
    {

        const response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (response.ok)
        {
            const results = await response.json()
            alert("Registered username with name:  " + results.username)

            //reset the form
            document.querySelector("form").reset();
        }
        else
        {
            const uError = await response.json()
            document.querySelector("#error").innerHTML = uError.error
        }
     }
}