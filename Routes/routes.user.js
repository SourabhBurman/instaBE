const express = require('express');
const bcrypt = require('bcrypt');
const { UserModel } = require('../Model/model.user');
const jwt = require('jsonwebtoken')
const userRoute = express.Router();


userRoute.post('/register', async (req,res)=> {
    const payload = req.body;
    
        const exist = await UserModel.findOne({email:payload.email})
        if(exist) {
            res.status(200).send({msg:"Email id already registered"});
        } else {
            try{
                bcrypt.hash(payload.password,8,async (error,hash)=> {
                    if(error) {
                        res.status(400).send({error})
                    } else {
                        const newUser = new UserModel({...payload,password:hash});
                        await newUser.save();
                        res.status(200).send({msg:"New user Registerd",newUser})
                    }
                })
            } catch(error) {
                res.status(400).send({error})
            }
        }
})


userRoute.post('/login', async (req,res)=> {
    const {email,password} = req.body;
    
        const exist = await UserModel.findOne({email})
        if(exist) {
            try{
                bcrypt.compare(password,exist.password,(err, result)=> {
                    if(result) {
                   const accessToken = jwt.sign({userId:exist._id},'secret',{expiresIn:"7d"});
                   res.status(200).send({msg:"Login Successfull",accessToken})
                    } else {
                    res.status(400).send({msg:"Invalid password"})
                    }
                })
            } catch(error) {
                res.status(400).send({error})
            }
        } else {
            res.status(200).send({msg:"Email id not registered"});
           
        }
})


module.exports = {userRoute}
