const jwt=require("jsonwebtoken");
const ensureauthenticated=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth)
    {
        return res.status(403).json({
            msg:"unauthorized ,provide jwt"
        })
    }
    try{
        const decoded=jwt.verify(auth,"shivani");
        req.user=decoded;
        console.log(decoded);
        next();
    }
    catch(err)
    {
        return res.status(403).json({
            msg:"unauthorized jwt"
        })
    }
}
module.exports=ensureauthenticated;