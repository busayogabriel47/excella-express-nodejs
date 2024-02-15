const mongoose = require('mongoose');
const {Schema} = mongoose;
const {v4: uuidv4} = require('uuid');




let userSchema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    dob: {type: String},
    phone: {type: String},
    employeeid:{
    type: String, 
    unique: true,
    default: () => generateDefaultEmploymentId()},
    attdenList:[],
    markList:[],
    pList:[],
    pic:{
     type:String,
     default:"https://res.cloudinary.com/dvfpkko1z/image/upload/v1589016219/exwm2axhjign3pmawzlv.png"
    },
    role: {
        type: String,
        default: 'trainer',
    },
    isActive: {
        type: Boolean,
        default: false,
      }
}, {timestamps: true})

// Function to generate a default employment ID
const generateDefaultEmploymentId = () => {
    return 'exc-trainer' + uuidv4();
  };


module.exports = mongoose.model('addtrainer', userSchema);
