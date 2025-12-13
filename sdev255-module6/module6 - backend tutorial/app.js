const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const User = require("./models/users");
const Song = require("./models/songs");
const app = express();
app.use(cors());
app.use(express.json())
const router = express.Router();
const secret = "supersecret";

//creating a new user
router.post("/user", async(req,res)=>{
    if(!req.body.username || !req.body.password)
    {
        res.status(400).json({error: "Missing username or password"})
    }
    //Check to make sure a user doesnt already exist in the DB
    const existingUser = await User.findOne({username: req.body.username})
    if (existingUser)
    {
        return res.status(400).json({error: "Username already exists"})
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    try {
        await newUser.save()
        res.status(201).json({username: newUser.username, message: "Username created"})
    }
    catch(error){
        console.log(error)
    }
})
//Update users online status
router.post("/auth", async(req,res) =>{
    if (!req.body.username || !req.body.password)
    {
        res.status(400).json({error: "Missing username or password"})
        return
    }
    //Try to find username in database, see if it matches with a username and password
    //await finding user
    let user = await User.findOne({username : req.body.username})
        //Connection or server error
        if (!user)
        {
            res.status(401).json({error: "Bad username"})
        }
        else
        {
        if (user.password != req.body.password)
        {
            res.status(401).json({error: "Bad password"})
        }
        else
        {
            //Create login token
            username2 = user.username;
            const token = jwt.encode({username: user.username}, secret)
            const auth = 1;
            //Change status to online
            await User.updateOne({_id: user._id},{$set: {status:"online"}})
            //respond with the token
            res.json({
                username2,
                token:token,
                auth:auth
            })
           
        }
    }
})
//Handle logout and let status be set to offline
router.post("/logout", async (req,res)=> {
    try {
        const user = req.body.username

        await User.updateOne({username: user}, {$set:{status: "offline"}})
        res.status(200).send("Sucessfully logged out")
    }
    catch(err){
        res.status(500).send(err)
    }
})
//CHeck status of user with token, check if its valid
router.get("/status", async(req,res) =>{
    if (!req.headers["x-auth"]){
        return res.status(401).json({error: "Missing auth header"})
    }
    const token = req.headers["x-auth"]
    try{
        const decoded = jwt.decode(token,secret)

        //Send back all username and status fields to the user or front end
        let users = User.find({}, "username status")
        res.json(users)
    }
    catch(ex)
    {
        res.status(401).json({error: "invalid JWT"})
    }
})
//Grab Users
router.get("/user", async(req,res)=>{
    try{
        const users = await User.find({}, "username status");
        res.send(users);
    }
    catch (err)
    {
        console.log(err)
        res.status(400).send(err)
    }
})
//Grab all songs in database
router.get("/songs", async(req,res)=>{
    try{
        const songs = await Song.find({});
        res.send(songs);
        console.log(songs);
    }
    catch (err)
    {
        console.log(err)
        res.status(400).send(err)
    }
})

router.post("/songs", async(req,res)=>{
    try{
        const song = await new Song(req.body)
        await song.save();
        res.status(201).json(song)
        console.log(song);
    }
    catch (err)
    {
        res.status(400).send(err)
    }
})

router.get("/songs/:id", async(req, res) =>{
    try{
        song = await Song.findById(req.params.id)
        res.json(song)
        
    }
    catch(err)
    {
        res.status(400).send(err)
        console.log(err)
    }
})
//Update is to update existing record
router.put("/songs/:id", async(req,res) => {
    //First find the song that needs to be updated
    //Request id of song from request, and then find and update it
    try{
        const song = req.body
        await Song.updateOne({_id : req.params.id}, song)
        console.log(song)
        res.sendStatus(204)
    }
    catch (err)
    {
        res.status(400).send(err)
    }
    
})
router.delete("/songs/:id", async(req,res) => {
    try {
        songy = await Song.findById(req.params.id)
        console.log(songy)
        await Song.deleteOne({_id: songy.id})
        res.sendStatus(204)
    }
    catch (err){
        res.status(400).send(err)
    }
})

app.use("/api", router);
app.listen(3000)
console.log("Server Started!")