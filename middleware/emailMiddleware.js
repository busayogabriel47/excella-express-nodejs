const nodemailer = require('nodemailer')
const env = require('dotenv')

env.config()

//Define email server and sendder details
const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
    auth:{
        user: process.env.GMAIL,
        pass: process.env.PASS

    }, 
    tls:{
        rejectUnauthorized: false,
    }
    
}


)


console.log(process.env.SENDEMAILTOADMIN)

const sendEmail = (options) => {
    return new Promise((resolve, reject)=> {
        transporter.sendMail(options, (error, infor)=> {
            if(error){
                reject(error);
            }else{
                resolve(infor);
            }
        })
    })
}


const emailMiddleware = (req, res, next)=> {
req.sendEmail = async (options) => {
    try{
        const infor = await sendEmail(options);
        console.log('Email sent!', infor.response);
    }catch (error) {
        console.log('Error sending email:', error);
    }
}

// Ensure to call next to pass control to the next middleware in the chain
if (next && typeof next === 'function') {
    next();
  }
}

module.exports = emailMiddleware;