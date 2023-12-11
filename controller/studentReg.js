const express = require('express')
const router = express.Router()
const studentModel = require('../Model/studentReg')
const bcrypt = require('bcrypt');
const env = require('dotenv');
const jwt = require("jsonwebtoken")

env.config();



//Register

const usersReg = async (req, res)=> {

    //create new registration instance
    const reg = new studentModel({
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        email: req.body.email, 
        phone: req.body.phone, 
        course: req.body.course, 
        terms: req.body.terms, 
        contactmeans: req.body.contactmeans
    })

    //Save the new registration

    reg.save()

    //Promise: return success msg if the user is added to DB sucessfully
    .then((result)=> {
        //Send email to admin
        req.sendEmail({
            from: 'omotukabusayo22@gmail.com',
            to: 'arairegold1@gmail.com',
            subject: 'New Student Registration',
            text: `A new student just registered.\n\nName: ${result.firstname} ${result.lastname}\nEmail: ${result.email}\nPhone: ${result.phone}\nCourse: ${result.course}`,
        })
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



    

module.exports = {usersReg, router};