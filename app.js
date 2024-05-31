const express=require('express')
const path=require('path')
const mongoose= require('mongoose')

const app=express()

// MONGODB CONNECTION

const MONGOURL="mongodb://localhost:27017/noteroom";

mongoose.connect(MONGOURL).then(()=>{
    console.log("DB Connection succesfull");


})
.catch((error)=>console.log(error));

//  ---------------------- //


// Static serving of website
app.use(express.static(path.join(__dirname,'public')));
// -------------------------


// Listening the site at port
app.listen(3000,()=>{
    console.log("listening on port 3000")
});
// --------------------------


// Data scheme for DB
const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
});
// --------------------------

// users is the table name, userSchema is description refrencing the table data structure
const UserModel=mongoose.model("notes",userSchema)
// --------------------------

// get request, find all the data in the users table 
app.get("/getUsers",async(req,res)=>{
    const userData=await UserModel.find();
    res.json(userData);
})
// --------------------------