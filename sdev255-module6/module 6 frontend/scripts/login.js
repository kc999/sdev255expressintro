let token
window.onload=function(){
    document.querySelector("#statusBtn").addEventListener("click",getUserStatus)
    document.querySelector("#loginBtn").addEventListener("click",function(){
        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value
        login(username,password)
        
    })
}
async function getUserStatus(e)
{
    e.preventDefault()
    const response = await fetch("http://localhost:3000/api/user")
    const users = await response.json();

    let html = "";
    for (let user of users){
        html += `<li>Username: ${user.username} - Status: ${user.status} </li>`
    }

    document.querySelector("#statusContainer").innerHTML = html;
}

async function login(username,password){
    const login_cred = {
        username,
        password
    }
    //send the login post request to the backend
    const response = await fetch("http://localhost:3000/api/auth",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(login_cred)
    })

    if (response.ok)
    {
        //Take token and save it to storage
        const tokenResponse = await response.json()
        token = tokenResponse.token
        uname = tokenResponse.username2
        auth = tokenResponse.auth
        console.log(token)
        //Save token
        localStorage.setItem("token", token)
        localStorage.setItem("uname", uname)
        localStorage.setItem("auth", auth)
        //redirect
        //window.location.replace("/index.html")
    }
    else{
        document.querySelector("#errorMsg").innerHTML = "Bad username or password"
    }
}