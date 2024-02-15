const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const create = require('../controller/notice')

router.get('/allnotice', create.allnotice)

router.post('/addnotice', create.addnotice)

router.post('/addreport', create.allreport)

router.post('/addcourse', create.addcourse)
router.get('/allcourses', create.allcourses)

router.get('/allreport', create.allreport)

router.get('/allissue', create.allissues)


module.exports = router
