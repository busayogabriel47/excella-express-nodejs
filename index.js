const express = require('express')

const cors = require('cors');
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser')


const multer = require('multer');
const emailer = require('./Routes/emailer');
const servicesRoute = require('./Routes/servicesRoute');
const addStudent = require('./Routes/addStudent');
const addTrainer = require('./Routes/addTrainer')
const studentReg = require('./Routes/studentReg')
const trainerReg = require('./Routes/trainerReg')
const paginate = require('./Routes/paginates');
const addAdmin = require('./Routes/admin');
const allAction = require('./Routes/notice')
const blog = require('./Routes/blog')

const app = express()


app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());



//Route
app.use('/api/', emailer);
app.use('/api/posts', servicesRoute);
app.use('/api/', paginate);
app.use('/api/', addStudent);
app.use('/api/', addTrainer);
app.use('/api/', addAdmin)
app.use('/api/', studentReg);
app.use('/api/', trainerReg);
app.use('/api/', allAction);
app.use('/api/blog', blog)



//port
const port = process.env.PORT || 5000

//database connection here
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})




app.listen(port, console.log('App is running on port 5000'))