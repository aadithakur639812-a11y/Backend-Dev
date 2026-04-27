import joi from "joi";
import {statusCodes} from "http-status-codes";

function employeeUpdate(req,res,next){
    try {
        const schema=joi.object({
            Name:joi.string().trim().min(3).max(30).required(),
            department:joi.string().trim().min(6).max(200).required(),
            salary:joi.number().required(),
            note:joi.string().trim().min(3).max(200).required()

        })
        let {error,value}=schema.validate(req.body);
        if(error){
            res.status(statusCodes.BAD_REQUEST).json({
                code:statusCodes.BAD_REQUEST.code,
                message:error,
                data:null
            })
            return;
        }
        req.body=value;
        next();
        
    } catch (err) {
        console.log("Error in employeeUpdate middleware:", err);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            code:statusCodes.INTERNAL_SERVER_ERROR.code,
            message:statusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export default employeeUpdate;