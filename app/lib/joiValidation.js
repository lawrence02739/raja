const Joi = require('joi');
const user = require('../model/user.model')
const register = Joi.object({
       name: Joi.string().min(3).max(30).required(),
       email: Joi.string().email().min(5).required(),
       password: Joi.string().required(),
});

const login = Joi.object({
       // id:Joi.string().required(),
       email: Joi.string().email().min(5).required(),
       password: Joi.string().required(),
});

const resetPassword = Joi.object({
       email: Joi.string().email().min(5).max(50).required(),
       oldPassword: Joi.string().required(),
       newPassword: Joi.string().required(),
       confirmPassword: Joi.string().required(),
});


module.exports = {
       register: register,
       login: login,
       resetPassword: resetPassword,
};