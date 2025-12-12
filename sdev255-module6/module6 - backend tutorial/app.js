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

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    try {
        await newUser.save()
        res.sendStatus(201)
    }
    catch(error){
        console.log(error)
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