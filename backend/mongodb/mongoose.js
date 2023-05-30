const mongoose=require("mongoose");
const bcrypt =require("bcrypt");
const Register=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true,
        unique:true
    },
    phoneno:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        default:"student"
    },
    roll:{
        type:String,
        required:true,
        default:"student"
    }
}
);

//security function
Register.pre("save", async function(next){
    if(this.password==="student"){
    this.password=await bcrypt.hash(this.password,10);
    }
    // this is importent becuase next() not exist the page is load continuously
    next();
    
})

module.exports= mongoose.model("student",Register)
