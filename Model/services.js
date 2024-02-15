const mongoose = require('mongoose');


const serviceSchema = mongoose.Schema({
    title: String,
    description: String,
    img: String,
    icon: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {timeStamp: true})



const servicesModel = mongoose.model("services", serviceSchema);

module.exports = servicesModel;


