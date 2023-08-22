const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config()
const adminModel = require('../Model/admin');
const nodemailer = require('nodemailer');
const requireLogin = require('../middleware/requireLogin')
const sendGridTransport = require('nodemailer-sendgrid-transport')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport(
    sendGridTransport({
      auth: {
        api_key: "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",
      },
    })
  );


const regAdmin = (req,res)=>{
    const {firstname,lastname, email,password,pic,phone,city,branch, isAdmin} = req.body 
 //   console.log(req.body )
   if(!email || !password || !firstname || !phone || !city || !branch, !isAdmin){
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
                 email,phone,city,branch,
                 password:hashedpassword,
                 firstname,lastname,
                 pic, isAdmin
             })
     
             admin.save()
             .then(user=>{
                 transporter.sendMail({
                     from: "mahenmondal111@gmail.com", // sender address
                     to: user.email, // list of receivers
                     subject: "E-voting Registration", // Subject line
                     html:
                       " You sucessfully complete Your  registration for E-voting.", // html body
                   });
                 res.json({message:"saved successfully"})
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
               const {_id, firstname,lastname,email,pic,phone,branch,isAdmin, city} = savedUser
               res.json({token,user:{_id, firstname,lastname,email,pic,phone,city,branch,isAdmin}})
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