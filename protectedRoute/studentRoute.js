const express = require('express')
const router = express.Router();
const studentAuth = require('../middleware/requireLogin')


//student dashboard route

router.get('/dashboard', studentAuth, (req, res)=> {
    const {isActive} = req.user;

    if(isActive){
        res.json({message: 'Student dashboard accessed successfully.'});
    }else{
        //inactive students are denied access
        res.status(403).json({error: `Unauthorized access. Please wait for your account to be activated by the Admin`})
    }
})


module.exports = router;