const { loginvalidation, signupvalidation } = require("../middlewares/authvalidation");
const {login,signup}=require("../controllers/authcontroller");
const router=require("express").Router();


router.post('/login',loginvalidation,login)


router.post('/signup',signupvalidation,signup);
module.exports=router;