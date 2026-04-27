import joi from "joi";
import {statusCodes} from "http-status-codes";

function employeecreate(req,res,next){
    try {
        const schema=joi.object({
            id:joi.string().trim().required(),
            Name:joi.string().trim().min(3).max(30).required(),
            profileImage:joi.string().trim().required(),
            gender:joi.string().trim().min(4).max(6).required(),
            department:joi.string().trim().min(6).max(200).required(),
            salary:joi.number().required(),
            startDate:joi.date().required(),
            note:joi.string().trim().min(3).max(200).required()

            
        })
        let {error,value}=schema.validate(req.body);
        if(error){
            res.status(statusCodes.BAD_REQUEST).json({
                code:statusCodes.BAD_REQUEST.code,
                message:error.details[0].message,
                data:null
            })
            return;
        }
        req.body=value;
        next();
        
    } catch (err) {
        console.log("Error employeecreate data:", err);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            code:statusCodes.INTERNAL_SERVER_ERROR.code,
            message:statusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
        
    }
}

export default usercreate;