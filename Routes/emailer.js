const express = require('express');
const router = express.Router();
const env = require('dotenv');
env.config()

const nodemailer = require('nodemailer');


router.post('/contact', (req, res)=> {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone
    const mail = {
        from: name,
        to: "timothysoji1@gmail.com",
        subject: "Contact From Submission",
        html: `<p>Name: ${name}</p>
                <p>Email: ${email}
                <p>Phone: ${phone}
                <p>Message: ${message}</p>`
    };
    contactEmail.sendMail(mail, (error)=> {
        if(error){
            res.json({status: "ERROR"});
        }else{
            res.json({status: "Message Sent"})
        }
    })
})



const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GMAIL,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})


contactEmail.verify((error)=> {
    if(error){
        console.log(error);
    }else{
        console.log('Ready to Send')
    }
})

module.exports = router;

