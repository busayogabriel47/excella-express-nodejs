const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')

dotenv.config();


//configure cloudinary
cloudinary.config({
    cloud_name:'ilove2support',
    api_key: process.env.api_key,
    api_secret: process.env.api_secret 
})

//set storage engine
const storage = multer.memoryStorage();



// Set storage engine
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         fs.mkdir('./uploads/',(err)=>{
//             cb(null, './uploads/');
//          }); // Define the destination folder for uploads
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname); // Define the filename
//     },
// });

// Initialize multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Set file size limit (in bytes)
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single('uploads'); // 'uploads' should match the field name in your form
  
  // Check file type
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
  
  module.exports = async function (req, res, next) {
    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
        folder: 'Excella-consult', // Replace with your Cloudinary folder
        public_id: `${Date.now()}_${req.file.originalname}`,
      });
  
      // Store Cloudinary URL in req.file
      req.file.cloudinaryUrl = result.secure_url;
  
      next();
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    }
  };

  module.exports = upload