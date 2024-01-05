const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        default: 'admin'
    },
    city:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    pic:{
     type:String,
     default:"https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png"
    }
})


module.exports = mongoose.model("Admin",userSchema)