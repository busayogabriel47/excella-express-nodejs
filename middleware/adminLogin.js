const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const adminModel = require('../Model/admin')

dotenv.config()

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
   
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
       
        adminModel.findById(_id)
        .then(userdata=>{
            if(!userdata){
                return res.status(401).json({error: 'You must be logged in'})
            }
            req.userdata = userdata
            
            next()
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: 'Internal server error'})
        })
        
        
    })
}