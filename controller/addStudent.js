const express = require('express')
const router = express.Router()
const usermodel = require('../Model/addStudent')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const env = require('dotenv');
const jwt = require("jsonwebtoken");
const addStudent = require('../Model/addStudent');
const emailMiddleware = require('../middleware/emailMiddleware');

env.config()





//Register
const register = (req, res)=> {
    //1. Get all data from req.body
    const {firstname, 
        lastname, email, 
        password, phone, dob, 
        course,} = req.body

    //2. backend validation.. Check if all required fields are provided.
    if(!firstname || !lastname || !email || !password || !dob || !phone || !course){
            return res.status(422).json({error: "All fields are required!"})
        }

    //3. Check for existing email
    usermodel.findOne({email: email})
    .then((savedUser)=> {
        if(savedUser){
            return res.status(422).json({error: "User already exist with that email. thanks!"})
        }

    //4. Proceed to hash password and create user
        bcrypt.hash(password, 12)
        .then(hashedp => {
            const user = new usermodel({
                firstname, lastname, email,
                password: hashedp, 
                phone, dob, course
            })

            user.save()
            .then(user=> {
                //Apply nodemailerMiddleware to the request object
                emailMiddleware(req, res, ()=> {
                    //Send email to user for successful registration
                    req.sendEmail({
                        from: "omotukabusayo22@gmail.com",
                        to: user.email, 
                        subject: "Excella Registration",
                        html: `Hello ${user.firstname} ${user.lastname} You have successfully register for one of excella course` 
                    })

                    //send email notification to admin
                    req.sendEmail({
                        from: "omotukabusayo22@gmail.com",
                        to: 'arairegold1@gmail.com',
                        subject: "New Registration",
                        html: `A new user has registered for ${user.course}:
                        Name: ${user.firstname} ${user.lastname}
                        Email: ${user.email}
                        Please activate the account.`
                    })

                    res.json({mssage: 'Registration successful. Admin approval required.'})
                })

               
                
            })
            .catch(err=> {
                console.log(err)
                res.status(500).json({error: 'Internal server error'})
            })
        })

    })
    .catch(err=> {
        console.log(err)
    })
    
}



//Login students
const login = (req, res) => {
    // Get email & password from req.body
    const { email, password } = req.body;

    // Login validation. Check for correct email/password
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" });
    }

    // Find email/pass from the db
    usermodel.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or password" });
            }

            // Log the value of isActive to the console
            console.log('isActive:', savedUser.isActive);

            // Check if the student account is active
            if (!savedUser.isActive) {
                return res.status(403).json({ error: "Account not yet activated by the admin. Please wait for activation." });
            }

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // Generate a JWT token for the logged-in student
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);

                        // Extract relevant user information
                        const { _id, firstname, lastname, email, phone, password, course, cohort } = savedUser;

                        // Send the token and user information in the response
                        res.json({ token, user: { _id, course, firstname, lastname, email, cohort, phone, password } });
                    } else {
                        return res.status(422).json({ error: "Invalid Email or password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};



const getStudentByCohort = (req,res)=>{
    console.log(req.body)
      Student.find({clsName:req.body.clsName})
      
    
      .then(posts=>{
          res.json(posts)
      })
      .catch(err=>{
          console.log(err)
      })
  }
  
 const getAllStudents = (req,res)=>{
   
      Student.find()
      
    
      .then(posts=>{
          res.json(posts)
      })
      .catch(err=>{
          console.log(err)
      })
  }
  
  const makeAttdance = async(req,res)=>{
      
      const posts = await Student.find({_id:req.body.StudentId})
      const {timestamp,type,StudentId,dateId} = req.body
      const obj = {
        timestamp,type,StudentId,dateId,
        madeBy:"admin"
      }
      posts[0].attdenList.push(obj);
      posts[0].pList.push(dateId);
      posts[0].save();
      res.json(posts)
  }

  
  const uploadMark = async(req,res)=>{
      
    const student = await Student.find({_id:req.body.id})
    const { id,sem,smark,subject} = req.body
    const obj = {
      id,sem,smark,subject
    }
    student[0].markList.push(obj);
    student[0].save();
    res.json(student)
  }
  
  const studentProfile = (req, res) => {
    
    console.log(req.body)
    Student.find({ _id: req.body.id })
    .select("-password")
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
    };
  
    const updateStuPic =  (req,res)=>{
      console.log(req.user)
      Student.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
          (err,result)=>{
           if(err){
               return res.status(422).json({error:"pic canot post"})
           }
           res.json(result)
           console.log(result)
      })
   
  }
  
  const updateStuProfile = async(req,res)=>{
  
   const {firstname, lastname, email, phone, 
    cohort, userId} = req.body 
  //   console.log(req.body )
      
  
     const student = await addStudent.findOne({_id:userId})
     addStudent.firstname = firstname 
     addStudent.lastname = lastname
     addStudent.dob=dob
     addStudent.email=email
     addStudent.cohort=cohort
     addStudent.phone=phone 

     await student.save()
  
  }
  

module.exports = {
    register, 
    login, 
    router,
    updateStuPic,
    updateStuProfile,
    makeAttdance,
    studentProfile,
    uploadMark,
    getStudentByCohort,
    getAllStudents
};