const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswers: {
        type: [String],
        required: true,
    },
    explanations: {
        type: [String], 
    }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;