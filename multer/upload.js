const multer = require('multer')


//File upload with multer
const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('testImage')


module.exports = {Storage, upload}


// app.post('/upload', (req, res)=> {
//     upload(req, res, (err)=> {
//         if(err){
//             console.log(err)
//         }else{
//             const newImage = new userModel({
                
//             })
//         }
//     })
// })