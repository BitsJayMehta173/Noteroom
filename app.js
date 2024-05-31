const express=require('express')
const path=require('path')
const mongoose= require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express()

app.use(bodyParser.json());
app.use(cors());

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
    title:String,
    content:String,
});
// --------------------------

// users is the table name, userSchema is description refrencing the table data structure
const UserModel=mongoose.model("notes",userSchema)
// --------------------------

// get request, find all the data in the users table 
app.get("/getUsers",async(req,res)=>{
    const userData=await UserModel.find();
    res.json(userData);
});
// --------------------------

app.post("/getUsers",async(req,res)=>{
    const receivedData = req.body;
    console.log('Data received:', receivedData);

    const newData = new UserModel(receivedData);

    newData.save()
        .then(result => {
            console.log('Data inserted');
            res.json({
                message: 'Data received and inserted successfully',
                receivedData: result
            });
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.put('/getUsers/:id', (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    console.log('Update data for ID:', id, updateData);

    
    UserModel.findByIdAndUpdate(id, updateData, { new: true })
        .then(result => {
            if (result) {
                console.log('Data updated');
                res.json({
                    message: 'Data updated successfully',
                    updatedData: result
                });
            } else {
                res.status(404).json({ message: 'Document not found' });
            }
        })
        .catch(error => {
            console.error('Error updating data:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});