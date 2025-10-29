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

    
// const updateBanksController = (req,res)=>{
// // update
//   const {name,location,branch,phone,address,accountNumber} = req.body;

//   const updatedBank =  BankModel.update({name,location,branch,phone,address,accountNumber})
//   res.json({message:"updated successfully", data: updatedBank})
// }

// const deleteBanksController = (req,res)=>{
//         // delete
//         const {name} = req.body;
//         const deletedBank = BankModel.delete({name});
//         res.json({message:"bank deleted succesfully", data: deletedBank})
// }


module.exports = {
    retrieveBanksController,
    // updateBanksController,
    // deleteBanksController,
    createBanksController,
}