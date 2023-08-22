const mongoose = require('mongoose');
const {Schema} = mongoose;


let userSchema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    dob: {type: String},
    course: {type: String},
    phone: {type: Number},
    cohort: {type: String},
    class_No:{type: String},
    isAdmin: {
        type: Boolean,
        default: false
    },
    attdenList:[],
    markList:[],
    pList:[],
    pic:{
     type:String,
     default:"https://res.cloudinary.com/dvfpkko1z/image/upload/v1589016219/exwm2axhjign3pmawzlv.png"
    }
})


module.exports = mongoose.model('students', userSchema);
