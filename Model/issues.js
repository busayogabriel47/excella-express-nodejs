const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({

    userId:{
        type: String, 
    },
   
    class_No:{
        type: String, 
    },
    cohort:{
        type: String, 
    },
    isIssue:{
        type:Boolean,
        default:false
    },
   stuDetail:{}



}, { timestamps: true });

module.exports = mongoose.model("Issue", IssueSchema);

