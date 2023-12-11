const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config()
const adminModel = require('../Model/admin');
const nodemailer = require('nodemailer');
const emailMiddleware = require("../middleware/emailMiddleware")
const adminLogin = require("../middleware/adminLogin")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')




const regAdmin = (req,res)=>{
    const {firstname,lastname, email,password,pic,phone,city, role} = req.body 
 //   console.log(req.body )
   if(!email || !password || !firstname || !phone || !city || !role){
      return res.status(422).json({error:"please add all the fields"})
   }
   adminModel.findOne({email:email})
   .then((savedUser)=>{
       if(savedUser){
         return res.status(422).json({error:"user already exists with that email"})
       }
       bcrypt.hash(password,12)
       .then(hashedpassword=>{
             const admin = new adminModel({
                 email,phone,city,
                 password:hashedpassword,
                 firstname,lastname,
                 pic, role
             })
     
             admin.save()
             .then(user => {
              emailMiddleware({
                  from: "omotukabusayo22@gmail.com",
                  to: user.email,
                  subject: "Excella registration",
                  html: "You successfully completed your registration as Admin on Excella",
              });
              res.json({ message: "Registration is successful" });
          })
             .catch(err=>{
                 console.log(err)
             })
       })
      
   })
   .catch(err=>{
     console.log(err)
   })
 }


//Login admin
const loginAdmin = (req,res)=>{
    const {email,password} = req.body
    console.log(req.body)
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    adminModel.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
               const {_id, firstname,lastname,email,pic,phone, role, city} = savedUser
               res.json({token,user:{_id, firstname,lastname,email,pic,phone,city,role}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}



 module.exports = {
    regAdmin, loginAdmin
 }