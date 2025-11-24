//Setup This is similar to default tags in html
const express = require("express");
//We have to use cors to host a front end and backend on the same device
var cors = require('cors');
//Activate or tell app variable to be an express server
const app = express();
app.use(cors());
const router = express.Router();



//Making an api using routes
//ROutes are used to handle browser requests, they look like urls, the difference is that when a browser requests a route,
//it is dynamically handled by using a function

//Get or a regular request when someone goes to http://localhost:3000/hello, when using a function in a route, we almost always have a parameter
//or handle a response request
/*
app.get("/hello", function(req,res){
    res.send("<h1>Hello express</h1>");
});

app.post("/goodbye", function(req,res){
    res.send("<h1>Goodbye express</h1>");
});
*/
router.get("/songs", function(req, res){
    const songs = [
        {
            title: "We Found Love",
            artist: "Rihanna",
            popularity: 10,
            releaseDate: new Date(2011 ,9, 22),
            genre: ["electro house"]
        },
        {
            title: "Songy Song",
            artist: "John Singer",
            popularity: 2,
            releaseDate: new Date(2013,11,21),
            genre: ["Death Metal"]
        }
]

    res.json(songs);
});

//All requests that use an api start with/api... so the url would be localhost:3000/api/songs
app.use("/api", router);
app.listen(3000)
