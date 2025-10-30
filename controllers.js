const BankModel = require("./model")





// controllers
const retrieveBanksController = (req,res) => {
    // retrieve
   BankModel.findOne().then( banks =>{
    res.json({data: banks})
   }).catch(err => console.log(err))
  
}

const createBanksController = (req,res)=>{
    // creating
    const {name,location,branch,phone,address,accountNumber} = req.body;

    const bank = new BankModel({name,location,branch,phone,address,accountNumber})

    bank.save().then(result =>{
            res.json({message:"created successfully", data: result})
    }).catch(error => console.log(error)    )

}

    
const updateBanksController = (req,res)=>{
// update
  const {id,name,location,branch,address,accountNumber} = req.body;

 BankModel.findById(id).then( bank => {
     if(bank){
        bank.name = name;
        bank.location = location;
        bank.branch = branch;
        bank.address = address;
        bank.accountNumber = accountNumber

        bank.save();

        res.json({message:"updated successfully", data: bank})
     }
      res.json({message:"document could not be found"})

 }).catch(error => console.log(error))
}
  


const deleteBanksController = (req,res)=>{
        // delete
        const {id} = req.body
        const {name} = req.body;
        BankModel.findByIdAndDelete(id).then( deletedBank => {
            if (deletedBank) {
             res.json({message:"bank deleted succesfully", data: deletedBank})
                return;
            }
            res.json({message:"bank not found "})
        })
}


module.exports = {
    retrieveBanksController,
    updateBanksController,
    deleteBanksController,
    createBanksController,
}