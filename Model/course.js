const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({

    course_name:{
        type: String, 
    },
   
    course_code:{
        type: String, 
    },
    sub_credit:{
        type:Number,
      
    },
    class_name:{
        type: String, 
    }
  

}, { timestamps: true });

module.exports = mongoose.model("Subject", courseSchema);

