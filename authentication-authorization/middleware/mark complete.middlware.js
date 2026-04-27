import joi from "joi";
import {StatusCodes} from "http-status-codes";

export function markComplete(req,res,next){
    try{
        let schema=joi.object({
            isCompleted:joi.boolean().required()
        });
        let {error,value}=schema.validate(req.body);
        if(error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                code:StatusCodes.BAD_REQUEST,
                message:StatusCodes.BAD_REQUEST,
                data:null
            });
        }

        req.body=value;
        next();

    }
    catch(error){
        console.error("Error validating todo:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:StatusCodes.INTERNAL_SERVER_ERROR,
            data:null
        });
    }
}