const express = require('express');
const mongoose=require("mongoose");
const student=require("./mongodb/mongoose.js")
const cors =require('cors');
const app = express()
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const middleware=require("./middleware/middleware.js");
const port = 4000 || process.env.port;
require('dotenv').config();

app.use(express.json());
app.use(cors({origin:"*"}));

//mongo db conncetion
mongoose.connect( `mongodb+srv://UserManagementSystem:${process.env.PASSWORD}@cluster0.mlzxepl.mongodb.net/?retryWrites=true&w=majority`,{
useUnifiedTopology:true,
useNewUrlParser:true
}).then(()=> console.log('mongodb is connected'));


app.get('/', (req, res) => res.send('wecome monster'))

//regiter student
app.post('/register',async(req,res)=>{
    try{
        const {rollno} =req.body;
        //student cheching
        const stu=await student.find({rollno});
        if(stu[0]){
            return res.status(400).send("Student already existed");
        }
        //creating new student
        if(req.body.name&&req.body.rollno&&req.body.phoneno&&req.body.address&&req.body.branch&&req.body.year&&req.body.college){
           
            const newStudent=new student(req.body);
            await newStudent.save();
            return res.status(200).send("Student registered succussfully");
        }
        else{
            console.log(res.body);
            return res.status(400).send("Empty values");
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send("server Error");
    }
})
//sendind all student details
app.get('/students',async(req,res)=>{
    try{
        const students=await student.find();
        //In the form of array
        return res.status(200).json(students);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error")
    }
})


//login router
app.post('/login',async (req,res)=>{
    try{
        const {rollno,password} =req.body;
        const student_array=await student.find({rollno});
        const student_login=student_array[0];
        if(!student_login){
            return res.status(400).send("Student doesn't existed");s
        }
        const isMatch=await bcrypt.compare(password,student_login.password);
        if(!isMatch){
            return res.status(400).send("Password doesn't matched")
        }
        const payload={
                    student:{
                        id:student_login.id
                    }
                }
        const token= await jwt.sign(payload,"jwtScret",{expiresIn:3600000});
        if(token){
                    return res.status(200).send(token);
                }
        else{
                    return res.status(400).send("Token not created")
                }
         
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error")
    }
})

//dashboard of student 

app.get('/:token/dashboard',middleware,async (req,res)=>{
    try{
        const id=req.student.id;
        const student_dash=await student.findById(id);
        if(student_dash){
            return res.status(200).json(student_dash);
        }
        else{
            return res.status(400).send("Database Error");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

//sendind a particular student details based on id
app.get('/student/:id',async (req,res)=>{
    try{
        const studen_id=req.params.id;
        await student.findById(studen_id).then(result=>{
            return res.status(200).json(result);
        }).catch(err=>{
            console.log(err);
            return res.status(500).send("Mongoose Error");
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error")
    }
})
//updating a particular student details based on id 
app.put('/student/:id',async (req,res)=>{
    try{
        const studen_id=req.params.id;
        await student.findByIdAndUpdate(studen_id,{...req.body}).then(result=>{
            return res.status(200).send("Student updated succussfully");
        }).catch(err=>{
            console.log(err);
            return res.status(500).send("Mongoose Error");
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error")
    }
})

app.delete('/student/:id',async (req,res)=>{
    try{
        const studen_id=req.params.id;
        await student.findByIdAndDelete(studen_id).then(result=>{
            return res.status(200).send("Student deleted succussfully");
        }).catch(err=>{
            console.log(err);
            return res.status(500).send("Mongoose Error");
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error")
    }
})

app.get("*",async(req,res)=>{
    res.send("Page not found 404 Error");
})
app.listen(port, () => console.log(`server is running on port ${port}!`))