const mongoose = require('mongoose');



const blogSchema = mongoose.Schema({
    title: String,
    note: String,
    img: String,
    author: String,
    authorPic: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {timeStamp: true})


const blogModel = mongoose.model("excellblog", blogSchema);
module.exports = blogModel