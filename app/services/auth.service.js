const user = require('../model/user.model')
const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017/")
const hashPassword = require('../lib/cryptoPassword')
const authentication = require('../lib/authentication')
require('dotenv').config();



//register
async function signup(body) {
  try {
    result = await client.db("database").collection("users").findOne({email:body.email });
    if (result) {
      return { isSuccess: true, message: "user already exist" }
    }
    const data = new user(body);
    const field = await data.save()
    if (!field) {
      return { isSuccess: true, message: "failed to created", data: data };
    }
    return { isSuccess: true, message: "successfully created", data: data };

  } catch (error) {
    console.log("err",error);
    return { isSuccess: false, message: "something went wrong", data: error };
  }

}


//login
async function login(body) {

  try {
    const db = await user.findOne({ email: body.email })
    console.log("db",db);
    if (!db) {
      return { isSuccess: false, message: "user not found"};
    }
    const decrpyt = hashPassword.decryptPassword(body.password, db.password)

    if (decrpyt == true) {
      const accesstoken = authentication.tokengenerator(body.email, body.password)

      db.accessToken = accesstoken.token
      db.refreshToken = accesstoken.refreshtoken

      const data = await db.save()
      return { isSuccess: true, message: "Login Successfully", data: data };

      //return
    }
    return { isSuccess: false, message: "Invalid user", data: decrpyt };
  } catch (error) {
    console.log("err",error);
    return { isSuccess: false, message: "Something went Wrong", data: error };
  }
}


//reset password
async function reset(body) {
  try {
    const db = await user.findOne({ email: body.email })
    console.log("db",db);
    if (!db) {
      return { isSuccess: false, message: "user not found"};
    }
    const decrpyt = hashPassword.decryptPassword(body.oldPassword, db.password)

    if (decrpyt == true) {

      if (body.newPassword == body.confirmPassword) {

        const encrypt = hashPassword.encryptPassword(body.newPassword)
        db.password = encrypt.hash
        if (encrypt.hash) {
          var data = await db.save();
          return { isSuccess: true, message: "successfully updated", data: data };
        }

      } else {
        //let password={newPassword:body.newPassword,confirmPassword:body.confirmPassword}
        return { isSuccess: false, message: "Password mismatch", data: [] };
      }

    }
    return { isSuccess: false, message: "Invalid password", data: decrpyt };

  } catch (error) {
    console.log("er",error);
    return { isSuccess: false, message: "Something went Wrong", data: error };
  }
}


//logout
async function logout(id) {
  try {
    const db = await user.findOne({ _id: id})
    if (db) {
      db.accessToken = null,
        db.refreshToken = null
      const data = await db.save()
      return { isSuccess: true, message: "logout successfully", data: data };
    }
    return { isSuccess: false, message: "logout failed", data: db };
  } catch (error) {
    console.log("err",error);
    return { isSuccess: false, message: " failed", data: error };
  }
}


module.exports = {
  signup: signup,
  login: login,
  reset: reset,
  logout: logout,
}