const express = require("express");
const blog = require('../controller/blog')


const router = express.Router();

router.get('/', blog.getPosts);
router.get('/:id', blog.getBlog);
router.post('/', blog.createBlogs)


module.exports = router