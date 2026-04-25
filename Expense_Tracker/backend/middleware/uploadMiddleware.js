const multer= require('multer');
//config storage
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/');
    }, filename: (req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    },
})

//File filter
const fFilter=(req,file,cb)=>{
    const allowTypes=['image/jpeg', 'image/png','image/jpg'];
    if (allowTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Only .jpeg, .jpg and .png are accepted'),false);
    }
};

const upload = multer({storage, fileFilter: fFilter});
module.exports=upload;