const mongoose = require('mongoose');
const {Schema} = mongoose;




let userSchema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    dob: {type: String},
    phone: {type: String},
    employeeid:{type: String},
    attdenList:[],
    markList:[],
    pList:[],
    pic:{
     type:String,
     default:"https://res.cloudinary.com/dvfpkko1z/image/upload/v1589016219/exwm2axhjign3pmawzlv.png"
    }
}, {timestamps: true})


module.exports = mongoose.model('addtrainer', userSchema);
