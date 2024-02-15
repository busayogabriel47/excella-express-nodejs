const  express = require('express')
const mongoose = require('express');

const router = express.Router();

const blogModel = require('../Model/blog');

const getPosts = async(req, res) => {
    try{
        const blog = await blogModel.find();
        res.status(200).json(blog)
    }catch (error){
        res.status(404).json(message.error)
    }
}

const getBlog = async(req, res) => {
    const {id} = req.params;

    try{
        const blog = await blogModel.finById(id);

        res.status(200).json(blog);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


const createBlogs = async(req, res) => {
    const blogs = req.body

    const newBlogPost = new blogModel({...blogs, createdAt: new Date().toISOString()})
    try {
        await newBlogPost.save();
        res.status(201).json(newBlogPost);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

module.exports = {router, getBlog, getPosts, createBlogs}