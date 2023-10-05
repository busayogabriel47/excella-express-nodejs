const express = require('express');
const multer = require('multer');
const create = require('../controller/upload')


const router = express.Router();



const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './files');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 200000000 // max file size 1MB = 200000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|mp4|mp3)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });


router.post('/upload', upload.single('file'), create.postFile)

router.get('/getAllFiles', create.getAllFiles);

router.get('/download/:id', create.getSingleFile);

module.exports = router