const express = require('express')

const cors = require('cors');
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cohort = require('./Model/cohort')


const multer = require('multer');
const emailer = require('./Routes/emailer');
const servicesRoute = require('./Routes/servicesRoute');
const addStudent = require('./Routes/addStudent');
const addTrainer = require('./Routes/addTrainer')
const studentReg = require('./Routes/studentReg')
const trainerReg = require('./Routes/trainerReg')
const paginate = require('./Routes/paginates');
const addAdmin = require('./Routes/admin');
const userDetails = require('./Routes/userDetails')
const allAction = require('./Routes/notice')
const blog = require('./Routes/blog')
const fileUploads = require('./Routes/upload');
const emailMiddleware = require('./middleware/emailMiddleware');
const trainerDashboardbRoute = require ('./Routes/addTrainer');
const activateStudent = require('./Routes/AdminActivate/ActivateStudent')
const createCohot = require("./protectedRoute/cohortRoute")
const fetchCohorts = require('./Routes/Cohort')
const path = require('path')

const app = express()


app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(bodyParser. text({type: '/'}));
app.use(cors());

//middleware
app.use(emailMiddleware)

//Route
app.use('/api/', emailer);
app.use('/api/posts', servicesRoute);
app.use('/api/blog', blog);
app.use('/api/', paginate);
app.use('/api/', addStudent);
app.use('/api/', addTrainer);
app.use('/api/', addAdmin);
app.use('/api/', studentReg);
app.use('/api/', trainerReg);
app.use('/api/', allAction);
app.use('/api/', fileUploads)
app.use('/api/', userDetails)
app.use('/api/', trainerDashboardbRoute)
app.use('/api/', activateStudent)
app.use('/api/', createCohot)
app.use('/api/', fetchCohorts)



//port
const port = process.env.PORT || 5000

//database connection here
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})




app.listen(port, console.log('App is running on port 5000'))