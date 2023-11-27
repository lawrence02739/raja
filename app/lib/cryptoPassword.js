const crypto = require('crypto');
require('dotenv').config()

function encryptPassword(password){
    try{
        let salt =  process.env.SALT//crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`);        
        return {salt : salt, hash : hash};
    }
    catch(er){
        return '';
    }
}

function decryptPassword(password, dbhash){
    try{    
        let salt=process.env.SALT
       // console.log("salt",process.env.SALT);
        let hash = crypto.pbkdf2Sync(password.toString(), salt, 1000, 64, `sha512`).toString(`hex`);  
       // console.log("hash",hash);
        //console.log("dbhash",dbhash);
        if(hash == dbhash){
            return true;
        }
        return false;
    }
    catch(er){   
       // console.log(er)     
        return false;
    }
}

module.exports = {
    encryptPassword: encryptPassword,
    decryptPassword: decryptPassword
}