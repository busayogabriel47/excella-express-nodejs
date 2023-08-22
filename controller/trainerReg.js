const express = require('express')
const router = express.Router()
const trainerModel = require('../Model/trainerReg')
const env = require('dotenv');


env.config()



//Register

const trainerReg = async (req, res)=> {

    //create new registration instance
    const reg = new trainerModel({
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        email: req.body.email, 
        phone: req.body.phone, 
        education: req.body.education, 
        terms: req.body.terms, 
        gender: req.body.gender,
        contactmeans: req.body.contactmeans
    })

    //Save the new registration

    reg.save()

    //Promise: return success msg if the user is added to DB sucessfully
    .then((result)=> {
        res.status(201).send({
            message: "Reg is successful",
            result
        })
    })
    //catch error if reg is not successful
    .catch((error)=> {
        res.status(500).send({
            message: "Error creating user",
            error
        })
    })
}



    // //1. Get all input data from req.body
    // const {title, firstname, 
    //     lastname, email, phone, 
    //     course, terms, contactmeans} = req.body

    // //2. backend validation
    // if(!title || !firstname 
    //     || !lastname 
    //     || !email 
    //     || !phone || 
    //     !course || 
    //     !terms || 
    //     !contactmeans){
    //         return res.status(422).json({error: "All fields are required!"})
    //     }

    // //3. check if email already exit
    // studentModel.findOne({email: email})
    // .then((savedUser)=> {
    //     if(savedUser){
    //         return res.status(422).json({error: "User already exist with that email. thanks!"})
    //     }
    //     //create user and save it into the db
    //         const user = new studentModel({
    //             title, firstname, lastname, email, 
    //             phone, terms, contactmeans, course
    //         })

    //         user.save()
    //         res.status(201).json({message: "saved successfully"})
    //     })
    // .catch(err=> {
    //     console.log(err)
    // })


module.exports = {trainerReg, router};