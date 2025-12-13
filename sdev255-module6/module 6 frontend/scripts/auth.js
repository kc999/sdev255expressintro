class Auth{
    constructor()
    {
        document.querySelector("body").style.display = "none"
        const auth = localStorage.getItem("auth")
        this.validateAuth(auth)
    }

    validateAuth(auth){
        if (auth !=  1)
        {
            window.location.replace("/login.html")
        }
        else
        {
            document.querySelector("body").style.display = "block"
        }
    }

    async logOut(){

        //Get the user id and let the database know the user is now offline
        const currentUser = localStorage.getItem('uname')

        if (currentUser)
        {
            try{
                await fetch("http://localhost:3000/api/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username: currentUser})

                    
                })
                localStorage.removeItem("auth")
                localStorage.removeItem("token")
                localStorage.removeItem("uname")


            window.location.replace("/login.html")
            }
            catch (error)
                {
                    console.log("Failed to update status", error)
                }
        }
        
    }
}