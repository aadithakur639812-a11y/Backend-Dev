import jwt from 'jsonwebtoken';
import fs from "fs";
import bcrypt from "bcrypt";
import {statusCodes} from 'http-status-codes';
import dotenv from "dotenv";
dotenv.config();

function employeeLogging(req,res){
    let {email,password}=req.body;

    try {
        if(!email||!password){
            res.status(statusCodes.BAD_REQUEST).json({
                code:statusCodes.BAD_REQUEST.code,
                message:statusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        if(!fs.existsSync("user.json")){
            res.status(statusCodes.NOT_FOUND).json({
                code:statusCodes.NOT_FOUND.code,
                message:statusCodes.NOT_FOUND.message,
                data:null
            })
        }
        let data=fs.readFileSync("user.json","utf-8");
        let employee=JSON.parse(data);
        let isEmployee=employee.find((emp)=>emp.Email===email);
        if(!isEmployee){
            res.status(statusCodes.NOT_FOUND).json({
                code:statusCodes.NOT_FOUND.code,
                message:statusCodes.NOT_FOUND.message,
                data:null
            })
            return res.render("login.ejs",{error:"not found"});
        }
        let isPasswordValid=bcrypt.compareSync(password,isEmployee.password);
        if(!isPasswordValid){
            res.status(statusCodes.UNAUTHORIZED).json({
                code:statusCodes.UNAUTHORIZED.code,
                message:statusCodes.UNAUTHORIZED.message,
                data:null
            })
            return res.render("login.ejs",{error:"email or password is incorrect"});
        }
        let token=jwt.sign({id:data.id},process.env.Token,{expiresIn:"1h"});
        res.status(statusCodes.OK).json({
            code:statusCodes.OK.code,
            message:statusCodes.OK.message,
            data:{Email:data.Email,token:token}
        })
        res.redirect("/employee/dashboard");

        
    } catch (err) {
        console.log("Error in employeeLogging service:", err);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            code:statusCodes.INTERNAL_SERVER_ERROR.code,
            message:statusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
        
    }
}
export default employeeLogging;