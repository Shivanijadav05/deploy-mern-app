const mongoose=require("mongoose");

require("dotenv").config();

console.log("monghhho connected");

const mongo_url=process.env.MONGODB_URL;

mongoose.connect(mongo_url).then(()=>{
    console.log("mongo connected");
}).catch((err)=>{
    console.log("mongo err",err);
})