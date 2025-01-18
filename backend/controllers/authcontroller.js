const UserDb=require('../models/user')
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');

console.log(__dirname);

const signup=async (req,res)=>{

 try {  const {name,email,password}=req.body;
    const user=await UserDb.findOne({email});
    if(user)
    {
        return res.status(409).json({
            msg:"user already exists"
        })
    }
    const newUser=new UserDb({name,email,password});
    newUser.password=await bcrypt.hash(password,10);
     await newUser.save();
    res.status(201).json({
        msg:"signup successfully"
        ,success:true
    })}  
      catch(err)
    {
        res.status(500).json({
            msg:"internal server error1",
            err:err.message,
            success:false
        })
    }
}


const login=async(req,res)=>{
    try{const {email,password}=req.body;
    const user=await UserDb.findOne({email:email});
    if(!user)
    {
        return res.status(403).json({msg:"auth failed email or password is wrong",
            success:false})
    }
    const isPassEqual=await bcrypt.compare(password,user.password);
    if(!isPassEqual)
    {
        return res.status(403).json({msg:"auth failed email or password is wrong",
            success:false})
    }
    const jwtToken=jwt.sign({email:user.email,_id:user._id},"shivani")
    res.status(200).json({
        msg:"login successfull",
        jwtToken,
        email,
        name:user.name,
        success:true
    })}
    catch(err)
    {
        res.status(500).json({
            msg:"internal server error2",
            success:false
        })
    }
}
module.exports={
    login,
    signup
}

