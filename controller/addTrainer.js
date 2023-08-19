const express = require('express')
const router = express.Router()
const addTrainer = require('../Model/addTrainer')
const addStudent = require('../Model/addStudent')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport')
const env = require('dotenv');
const jwt = require("jsonwebtoken");
const { DatePicker } = require('antd');

env.config()

const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: "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"
        }
    })
)



//Register

const register = (req, res)=> {
    //1. Get all input from req.body
    const {firstname, 
        lastname, email, 
        password, phone, dob, employeeid, files,} = req.body

    // //2. backend validation
    // if(!firstname || !lastname || !email || !password || !age || !gender || !address
    //     || !phone || !course || !dob || !isAdmin || !cohort || !picture){
    //         return res.status(422).json({error: "All fields are required!"})
    //     }

    //3. Check for existing email
    addTrainer.findOne({email: email})
    .then((savedUser)=> {
        if(savedUser){
            return res.status(422).json({error: "User already exist with that email. thanks!"})
        }

    //4. Proceed to hash password and create user
        bcrypt.genSalt(12)
        .then(salt => {
            console.log('Salt:', salt)
            return bcrypt.hash(password, salt).then(hashedp => {
                const user = new addTrainer({
                    firstname, lastname, email,
                    password: hashedp, 
                    phone, dob, employeeid, files
                })
    
                user.save()
                .then(user=> {
                    transporter.sendMail({
                        from: "omotukabusayo22@gmail.com",
                        to: user.email, 
                        subject: "Excella Registration",
                        html: `Hello ${user.firstname} ${user.lastname} You have successfully register for one of excella course` 
                    })
                    res.json({message: "saved successfully"})
                })
                .catch(err=> {
                    console.log(err)
                })
            })
            })
        })

       
    .catch(err=> {
        console.log(err)
    })
    
}


const login = (req, res) => {
//Get email & password from req.body
const {email, password} = req.body
console.log(req.body)

//Login validation. check for correct email/password
// if(!email || !password){
//     return res.status(422).json({error: "Please add email or password"})
// }

//Find email/pass from the db
addTrainer.findOne({email: email})
.then(savedUser=> {
    if(!savedUser){
        return res.status(422).json({error: "Invalid Email or password"})
    }
    bcrypt.compare(password, savedUser.password)
    .then(doMatch=> {
        if(doMatch){

            const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET)
            const {firstname, lastname, email, employeeid, dob, phone, password} = savedUser;
            res.json({token, user:{firstname, lastname, email, employeeid, dob, phone, password}})
        }else{
            return res.status(422).json({error: "Invalid Email or password"})
        }
    })
    .catch(err=> {
        console.log(err)
    })
})

}



const getTrainers = (req,res)=>{
  
    addTrainer.find()
    
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
}


const makeAttendance = async(req,res)=>{
    
    const posts = await addStudent.find({_id:req.body.StudentId})
    const {timestamp,type,StudentId,dateId} = req.body
    const obj = {
      timestamp,type,StudentId,dateId,
      madeBy:req.user.name
    }
    posts[0].attdenList.push(obj);
    posts[0].pList.push(dateId);
    posts[0].save();
    res.json(posts)
}

const uploadMark = async(req,res)=>{
    
  const student = await addStudent.find({_id:req.body.id})
  const { id,sem,smark,subject} = req.body
  const obj = {
    id,sem,smark,subject
  }
  student[0].markList.push(obj);
  student[0].save();
  res.json(student)
}

const trainerProfile = (req, res) => {
  
  console.log("req.body",req.body)
  addTrainer.find({ _id: req.body.id })
  .select("-password")
  .then((admins) => {
    res.json(admins);
  })
  .catch((err) => {
    console.log(err);
  });
  };

 
const trainerPicUpdate =  (req,res)=>{
    console.log(req.user)
    addTrainer.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic canot post"})
         }
         res.json(result)
         console.log(result)
    })
 
}

const trainerProfilUpdate = async(req,res)=>{
        const {  firstname, lastname, email, phone, userId} = req.body
        const addTrainer = await Teacher.findOne({_id:userId})
        console.log(teacher)
        addTrainer.firstname=firstname
        addTrainer.lastname=lastname
        addTrainer.dob=dob
        addTrainer.employeeid=qulification
        addTrainer.email=email
        addTrainer.phone=phone
         await teacher.save();

      }

module.exports = {
    register, login, getTrainers, 
    trainerPicUpdate, trainerProfile,
     uploadMark, makeAttendance, router,
     trainerProfilUpdate
};