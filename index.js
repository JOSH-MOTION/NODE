// require
const express = require("express");

// create server
const server = express()


// controllers 
const Home = (req,res)=>{
    res.send("hello this is the home page")
}

const Services = (req,res)=>{
     res.send("hello this is the About page")
}
const Contact = (req,res)=>{
     res.send("hello this is the About page")
}
const About = (req,res)=>{
     res.send("hello this is the About page")
}
const Products = (req,res)=>{
     res.send("hello this is the About page")
}


// routes
server.get('/product',Products)
server.patch('/services',Services)
server.put('/contact',Contact)
server.post('/about',About)
server.use('/',Home)



// initialize
server.listen(3000,()=>console.log('server is working port 3000 so it is prefect'))