//Setup This is similar to default tags in html
const express = require("express");
//Activate or tell app variable to be an express server
const app = express();

//Start the web server app.list(portnumber, function)
app.listen(3000,function(){
    console.log("Listening on port 3000");
    
});

//Making an api using routes
//ROutes are used to handle browser requests, they look like urls, the difference is that when a browser requests a route,
//it is dynamically handled by using a function

//Get or a regular request when someone goes to http://localhost:3000/hello, when using a function in a route, we almost always have a parameter
//or handle a response request
app.get("/hello", function(req,res){
    res.send("<h1>Hello express</h1>");
});

app.post("/goodbye", function(req,res){
    res.send("<h1>Goodbye express</h1>");
});