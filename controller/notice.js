const express = require('express')
const router = express.Router()
const Notice = require('../Model/notice')
const Issue = require('../Model/issues')
const Report = require('../Model/report')
const course = require('../Model/course')

const allnotice = (req,res)=>{
    Notice.find()
   
  
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
}

const addnotice = (req,res)=>{
    const {title,content} = req.body 
    console.log(req.body)
    if(!title || !content){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
     const post = new Notice({title,content})
    post.save().then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const addreport = (req,res)=>{
    const {title,body,postedBy} = req.body 
   
    if(!title || !body){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
     const post = new Report({title,body,postedBy})
    post.save().then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const addcourse = (req,res)=>{
    const {sub_name,sub_code,class_name,sub_credit} = req.body 
   
   
     const post = new course({sub_name,sub_code,class_name,sub_credit})
    post.save().then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}


const allcourses = (req,res)=>{
    course.find()
   
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
}



const allreport = (req,res)=>{
    Report.find()
   
  
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
}


const allissues = (req,res)=>{
    Issue.find()
   
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
}


module.exports = {
    router,
    allcourses,
    allissues,
    allnotice,
    allreport,
    addnotice,
    addreport,
    addcourse
 }