const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Define the destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Define the filename
    },
});

// Initialize multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Set file size limit (in bytes)
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single('uploads'); // 'cohortBanner' should match the field name in your form

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



const multerMiddlerware = multer({storage: storage})
module.exports = multerMiddlerware;