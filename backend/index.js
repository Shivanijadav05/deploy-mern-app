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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  credentials: true // If cookies or credentials are sent
}));

// Handle preflight requests globally
app.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'https://deploy-mern-app-uiii.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.status(204).end();
});





app.get("/home",(req,res)=>{
    res.send("hello")
})

app.use('/auth',authrouter);
app.use('/products',productrouter);

app.listen(PORT,()=>{
    console.log("server running");
})
