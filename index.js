// require
const { retrieveBanksController, updateBanksController,deleteBanksController,createBanksController,} = require("./controllers") 
const express = require("express")
const mongoose = require("mongoose")

//create the server
const server = express()

// middleware
server.use(express.json());





// routes
// retrieve banks 
server.get("/banks",retrieveBanksController)

//  create bank
server.post("/banks",createBanksController)
//   update bank
server.put("/banks/",updateBanksController)
//  delete bank
server.delete("/banks",deleteBanksController)

mongoose.connect('mongodb+srv://Banks:ZGToQq3HufBKPnYO@cluster0.quschgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


// mongoose.connect('mongodb+srv://joshuadoe168_db_user:CPcH6MuVCI8Vn3iH@cluster0.quschgn.mongodb.net/?appName=Cluster0')
// server start

server.listen(3000,()=> console.log("its working"))