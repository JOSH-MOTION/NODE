const express = require("express")
const app = express();
const port = 3000;
//middleware
app.use(express.json());
//Bank database 
const banksDb = [
]
//Model
class BankModel {
  constructor({name,location,branch,phone,address,accountNumber}) {
    this.name = name;
    this.location = location;
    this.branch = branch;
    this.phone = phone;
    this.address = address;
    this.accountNumber = accountNumber;
  }
  save(){
  banksDb.push(this);
  return this;
  }
  static all(){
    return banksDb
  }
}
//Controller
//retrieve
const retrieveBanksController = (req,res) => {
  const banks = BankModel.all();
  res.json({data: banks})
};
//create
const createBanksController = (req,res) => {
  const {name,location,branch,phone,address,accountNumber} = req.body;
  const banks = new BankModel({name,location,branch,phone,address,accountNumber});
  banks.save();
  res.json({message: "Bank created successfully",banks});
};
//update
const updateBanksController = (req,res) => {
};
//delete
const deleteBanksController = (req,res) => {
};
//retrieve banks
app.get("/banks",retrieveBanksController);
//create bank
app.post("/banks",createBanksController);
//update bank
app.put("/banks",updateBanksController);
//delete bank
app.delete("/bank",deleteBanksController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
