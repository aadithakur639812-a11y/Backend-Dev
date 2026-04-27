import jwt from "jsonwebtoken";
import {statusCodes} from "http-status-codes";  
import dotenv from "dotenv";
dotenv.config();

export function auth(req,res,next){
    try {
        let authentication=req.headers.authorization;
        if(!authentication||!authentication.startsWith("Bearer")){
            res.status(statusCodes.BAD_REQUEST.code).json({
                code: statusCodes.BAD_REQUEST.code,
                message:statusCodes.BAD_REQUEST.message,
                data:null
            });
            return res.redirect("/employee/login");
        }
        let token=authentication.split(" ")[1];
        let employee=jwt.verify(token,process.env.TOKEN);
        req.body=employee.id;
        next();
        
    } catch (err) {
        console.log("Error in auth.js", err);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            code: statusCodes.INTERNAL_SERVER_ERROR.code,
            message:statusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        });        
    }
}