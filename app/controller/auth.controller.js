const express=require('express')
const responsHelper=require('../lib/response')
const joiValid=require('../lib/joiValidation')
const hashPassword = require('../lib/cryptoPassword')
const authentication = require('../lib/authentication')
const authService=require('../services/auth.service')
const router=express.Router();

router.post('/signup',async(req,res,next)=>{
    const {error, value} = joiValid.register.validate(req.body);
    if(error){
        const msg = error.details ? error.details[0].message : 'Joi Validation Error!'
        res.response = await responsHelper.SendResponse(res,{isSuccess:false,message:msg})
        return next()
    }
    try {
        //var dataQ = req.query;
        var dataB = req.body;

        const encrypt = hashPassword.encryptPassword(req.body.password)
        const token = authentication.tokengenerator(req.body.email, req.body.password)
        if (!token || !encrypt) {
            return { isSuccess: false, message: "field missing", data: err };
          }
        dataB.password = encrypt.hash
        dataB.accessToken= token.token
        dataB.refreshToken= token.refreshtoken
 
        var result = await authService.signup(dataB)
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        return responsHelper.SendErrorResponse(err, res);
    }
})

router.post('/Login',async(req,res,next)=>{
    const {error, value} = joiValid.login.validate(req.body);
    if(error){
        const msg = error.details ? error.details[0].message : 'Joi Validation Error!'
        res.response = await responsHelper.SendResponse(res,{isSuccess:false,message:msg})
        return next()
    }
    try {
        //var dataQ = req.query;
         var dataB = req.body;

        var result = await authService.login(dataB)
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        return responsHelper.SendErrorResponse(err, res);
    }
})

router.put('/ResetPassword',async(req,res,next)=>{
    const {error, value} = joiValid.resetPassword.validate(req.body);
    if(error){
        const msg = error.details ? error.details[0].message : 'Joi Validation Error!'
        res.response = await responsHelper.SendResponse(res,{isSuccess:false,message:msg})
        return next()
    }

    try {
        if(req.body.newPassword!= req.body.confirmPassword){
            return responsHelper.SendResponse(res,{ isSuccess: false, message: "Password and Confirm Password are not same"} );
        }
        //  var dataQ = req.query;
         var dataB = req.body;
        var result = await authService.reset(dataB)
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        console.log("errr",err);
        return responsHelper.SendErrorResponse(err, res);
    }
})

router.delete('/Logout/:id',async(req,res)=>{
    try {
        var result = await authService.logout(req.params.id)
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        return responsHelper.SendErrorResponse(err, res);
    }
})
module.exports=router;