const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'Uploads/')
    },
    filename: (req,file,cb)=>{
        cb(null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})

const checkFileFilter = (req,file,cb) =>{
    if (file.mimetype.startsWith('image')) {
        cb(null,true)
    } else{
        cb(new Error('This is not an image upload only images'))
    }
}

module.exports = multer({
    storage,
    fileFilter: checkFileFilter,
    limits:{
        fileSize: 5*1024*1024 //=>5MB-->limit
    }
})