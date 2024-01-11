const path = require('path');
const express = require('express');
const File = require('../Model/upload');
const Router = express.Router();



const postFile = async (req, res) => {
    try {
      const { title, description, cohortId } = req.body;
      const { path, mimetype } = req.file;

      if(!title || !description || !cohortId){
        return res.status(400).send('All fields are required.')
      }

      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype,
        cohort: cohortId, //Include cohort ID
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

      if(!file){
        return res.status(404).send('File not found.')
      }

      const filePath = path.resolve(__dirname, '..', file.file_path);

      res.set({
        'Content-Type': file.file_mimetype
      });

     res.sendFile(filePath);
    } catch (error) {
      console.error(400).send('Error while downloading file. Try again later.', error);
      res.status(500).send('Internet server error.');
    }
}




module.exports = 
{Router, 
postFile, 
getAllFiles, 
getSingleFile
};