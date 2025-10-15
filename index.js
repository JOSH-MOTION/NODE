// require
const express = require("express")

//create the server
const server = express()

// middleware
server.use(express.json());

// Bank batabase
let banksDb = []

// model 
class BankModel  {
    constructor({name,location,branch,phone,address,accountNumber}){
            this.name = name;
            this.location = location;
            this.branch = branch;
            this.phone = phone;
            this.address = address;
            this.accountNumber = accountNumber
    }

    save(){
        banksDb.push(this);
        return this
    }

    static all(){
        return banksDb
    }

    static update(updateInfo = {}){

        banksDb = banksDb.map(bank =>{
            if(bank.name === updateInfo.name){
                return {...bank, ...updateInfo};
            }

            return bank;
        })
 return banksDb.find(bank => bank.name === updateInfo.name);
    }

    static delete({name}){
        let deletedBank = null
        banksDb.filter(bank => {
            if(bank.name !== name){
                return true;
            }
            return false
        });
        return deletedBank

    }

   
}




// controllers
const retrieveBanksController = (req,res) => {
    // retrieve
   const banks = BankModel.all();
   res.json({data:banks})
}

const createBanksController = (req,res)=>{
    // creating
    const {name,location,branch,phone,address,accountNumber} = req.body;


    const bank = new BankModel({name,location,branch,phone,address,accountNumber})

    bank.save();

    res.json({message:"bank created successfully", data:bank})
}

const updateBanksController = (req,res)=>{
// update
  const {name,location,branch,phone,address,accountNumber} = req.body;

  const updatedBank =  BankModel.update({name,location,branch,phone,address,accountNumber})
  res.json({message:"updated successfully", data: updatedBank})
}

const deleteBanksController = (req,res)=>{
        // delete
        const {name} = req.body;
        const deletedBank = BankModel.delete({name});
        res.json({message:"bank deleted succesfully", data: deletedBank})
}



// routes
// retrieve banks 
server.get("/banks",retrieveBanksController)

//  create bank
server.post("/banks",createBanksController)
//   update bank
server.put("/banks",updateBanksController)
//  delete bank
server.delete("/banks",deleteBanksController)

// server start
server.listen(3000,()=> console.log("its working"))