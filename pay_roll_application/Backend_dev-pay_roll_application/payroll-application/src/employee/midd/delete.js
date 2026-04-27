import joi from "joi";
import {statusCodes} from "http-status-codes";

function employeeDelete(req,res,next){
    try {
        const schema=joi.object({
            id:joi.string().trim().required()
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
        console.log("Error in employeeDelete middleware:", err);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            code:statusCodes.INTERNAL_SERVER_ERROR.code,
            message:statusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
        
    }
}
export default employeeDelete;