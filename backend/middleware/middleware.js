const jwt=require("jsonwebtoken");
module.exports=async function(req,res,next){
    const token=req.params.token;
    if(token){
        const decode=jwt.verify(token,"jwtScret");
        if(decode){
            req.student=decode.student;
        }
        else{
            return res.send(400).send("Invalid token");
        }
    }
    else{
        return res.status(400).send("Token not found")
    }
    next();
}