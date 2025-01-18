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
  origin: [`https://deploy-mern-app-uiii.vercel.app`], // Frontend URL
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  credentials: true ,// If cookies or credentials are sent
  optionSuccessStatus:200
}));

 app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', 'https://deploy-mern-app-uiii.vercel.app');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional: For cookies/auth
    });
 app.options('/auth/login', (req, res) => {
      res.header('Access-Control-Allow-Origin', 'https://deploy-mern-app-uiii.vercel.app');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.send();
    });







app.get("/home",(req,res)=>{
    res.send("hello")
})

app.use('/auth',authrouter);
app.use('/products',productrouter);

app.listen(PORT,()=>{
    console.log("server running");
})
