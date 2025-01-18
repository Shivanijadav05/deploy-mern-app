const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const productrouter=require("./routes/productrouter")
const authrouter=require("./routes/authrouter")
require('dotenv').config();
const UserDb=require('./models/user')
require("./models/db")

const PORT=process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://deploy-mern-app-uiii.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
}));

app.options('*', cors());  // Respond to preflight requests



app.get("/home",(req,res)=>{
    res.send("hello")
})

app.use('/auth',authrouter);
app.use('/auth',productrouter);

app.listen(PORT,()=>{
    console.log("server running");
})
