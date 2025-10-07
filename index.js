// require
const express = require("express");

// create server
const server = express()


// controllers 
const Home = (req,res)=>{
    res.send("hello this is the home page")
}

const About = (req,res)=>{
     res.send("hello this is the About page")
}


// routes
server.use('/about',About)
server.get('/',Home)


// initialize
server.listen(3000,()=>console.log('server is working port 3000 so it is prefect'))