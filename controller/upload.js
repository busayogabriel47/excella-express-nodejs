const path = require('path');
const express = require('express');
const File = require('../Model/upload');
const Router = express.Router();



const postFile = async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
}
//   (error, req, res, next) => {
//     if (error) {
//       res.status(500).send(error.message);
//     }
//   }

const getAllFiles = async (req, res) => {
    try {
      const files = await File.find({});
      const sortedByCreationDate = files.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      res.send(sortedByCreationDate);
    } catch (error) {
      res.status(400).send('Error while getting list of files. Try again later.');
    }
  }


const getSingleFile = async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      res.set({
        'Content-Type': file.file_mimetype
      });
      res.sendFile(path.join(__dirname, '..', file.file_path));
    } catch (error) {
      res.status(400).send('Error while downloading file. Try again later.');
    }
  }




module.exports = 
{Router, 
postFile, 
getAllFiles, 
getSingleFile
};