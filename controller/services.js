const express = require ('express')
const mongoose = require('express');

const router = express.Router();

const servicesModel =  require('../Model/services');

const getPosts = async (req, res) => {
    try{
        const services = await servicesModel.find();
        res.status(200).json(services);
    }catch (error) {
        res.status(404).json(message.error)
    }
}

const getPost = async (req, res) => {
    const {id} = req.params;

    try{
        const post = await servicesModel.findById(id);
        
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}   


const createServices = async (req, res) => {
    const post = req.body

    const newservicePost = new servicesModel({...post, createdAt: new Date().toISOString()})

    try{
        await newservicePost.save();
        res.status(201).json(newservicePost);
    }catch(error){
        res.status(409).json({message: error.message})
    }
}

module.exports = {router, getPost, getPosts, createServices};





