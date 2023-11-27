const jwt=require('jsonwebtoken')
require('dotenv').config();

function tokengenerator (email,password) {
   const token = jwt.sign({email:email,password:password}, process.env.ACCESS_TOKEN,{expiresIn: '1d'})
   const refreshtoken = jwt.sign({email:email,password:password}, process.env.ACCESS_TOKEN,{expiresIn: '30d'})
   if(!token && !refreshtoken)
   {
    return { isSuccess: false, message: "Authorization failed!!", data: err };
  
  }

   return {token:token,refreshtoken:refreshtoken};
}



function verifyToken(header){
    const token = header;
   // console.log("token",token);
    const username=jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
      if(err){
        return { isSuccess: false,message: "invalid token",  data: err };
      }else{
        return { isSuccess: true, data: user }
      }
    })
   // console.log("user",username);
    return username;
}
module.exports={
    tokengenerator:tokengenerator,
    verifyToken:verifyToken
}