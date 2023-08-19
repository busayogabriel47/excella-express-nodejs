const express = require("express");
const post = require('../controller/services')


const router = express.Router()

router.get('/', post.getPosts);
router.get('/:id', post.getPost);
router.post('/services', post.createServices)

module.exports = router


