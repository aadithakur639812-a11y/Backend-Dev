import multer from "multer";

const storage = multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});

export const upload = multer({
    storage,
    limits:{fileSize:2*1024*1024},
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==="application/pdf"){
            cb(null,true);
        }else{
            cb(new Error("Only PDF allowed"));
        }
    }
});