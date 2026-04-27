import joi from "joi";
import {StatusCodes} from "http-status-codes";

export function addTodo(req,res,next){
    try{
        const schema=joi.object({
            title:joi.string().required().min(3).max(100),
            description:joi.string().required().min(5).max(500)
        })
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