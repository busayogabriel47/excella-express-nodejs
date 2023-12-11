const express = require('express')
const router = express.Router()
const addTrainer = require('../Model/addTrainer')
const addStudent = require('../Model/addStudent')
const bcrypt = require('bcrypt');
const emailMiddleware = require('../middleware/emailMiddleware')
const env = require('dotenv');
const jwt = require("jsonwebtoken");
// const { DatePicker } = require('antd');

env.config()







//Register

const register = (req, res) => {
    const { firstname, lastname, email, password, dob, phone } = req.body;
  
    if (!email || !password || !firstname || !lastname || !dob || !phone) {
      return res.status(422).json({ error: "Please add all the required fields" });
    }
  
    addTrainer.findOne({ email: email })
      .then((existingTrainer) => {
        if (existingTrainer) {
          return res.status(422).json({ error: "Trainer already exists with that email" });
        }
  
        bcrypt.hash(password, 12)
          .then(hashedPassword => {
            const newTrainer = new addTrainer({
              email,
              firstname,
              lastname,
              password: hashedPassword,
              dob,
              phone
            });
  
            newTrainer.save()
              .then(trainer => {
                // Send signup successful email to trainer
                emailMiddleware({
                  to: trainer.email,
                  subject: "Trainer Registration",
                  html: `Hello ${trainer.firstname} ${trainer.lastname}, 
                    You have successfully registered as a trainer. 
                    Please wait for admin activation to access the dashboard.`
                });
  
                res.json({ message: "Trainer registration successful" });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ error: "Internal server error" });
              });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      });
  };


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

    // Check if the trainer account is active
    if (!savedUser.isActive) {
      return res.status(403).json({ error: "Account not yet activated by the admin. Please wait for activation." });
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