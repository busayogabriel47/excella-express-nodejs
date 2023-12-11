const express = require('express')
const router = express.Router()
const create = require('../controller/admin')
const adminAuth = require("../middleware/adminLogin")
const getPendingStudents = require("../controller/AdminActivateController/Getpendingstudent")



  
router.post('/adminReg', create.regAdmin)


router.post('/adminSignin', create.loginAdmin, getPendingStudents)
router.get('/pending-students', adminAuth, )


// router.put('/updatepic',requireLogin,(req,res)=>{
//     User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
//         (err,result)=>{
//          if(err){
//              return res.status(422).json({error:"pic canot post"})
//          }
//          res.json(result)
//     })
// })


module.exports = router