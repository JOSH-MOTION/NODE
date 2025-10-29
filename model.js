// bankmodel
const mongoose = require('mongoose')

const BankSchema = new mongoose.Schema({
    name:String,
    location:String,
    branch:String,
    address:String,
    accountNumber:String
});



const BankModel = mongoose.model("Banks", BankSchema)

module.exports =  BankModel


