const express=require('express');
const router=express.Router();
const userController = require('../controller/auth.controller');

router.use('/user',userController)

module.exports=router;