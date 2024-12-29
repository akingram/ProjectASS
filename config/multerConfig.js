const multer = require ("multer")

const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename: (req, file, cb) => [
        cb(null, `${Date.now()}-${file.originalname}`)
    ],

})

const fileFilter = (req,file,cb)=>{
    const allowedType = ["image/jpeg","image/png","image/jpg"]
    if(allowedType.includes(file.mimetype)){
        cb(null,true)

    }else{
        cb(new Error ("only image of JPEG,PNG,JPG are allowd "), false)
    }
}
const upload = multer ({
    storage,
    fileFilter,
    limits:{
        fileSize : 1024*1024*10,
    }
}).array ("images", 5)

module.exports = upload