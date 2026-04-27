import fs from "fs";
import bcrypt from "bcrypt";
import {statusCodes} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

function employeeUpdate(req,res){
    let {id,Name,Email}=req.body;
    try {
        if(!fs.existsSync("user.json")){
            res.status(statusCodes.NOT_FOUND).json({
                code:statusCodes.NOT_FOUND.code,
                message:statusCodes.NOT_FOUND.message,
                data:null
            })
            
        }
        let data=fs.readFileSync("user.json","utf-8");
        let employee=JSON.parse(data);
        let index=employee.findIndex((emp)=>emp.id===id);
        if(index===-1){
            res.status(statusCodes.NOT_FOUND).json({
                code:statusCodes.NOT_FOUND.code,
                message:statusCodes.NOT_FOUND.message,
                data:null
            })
        }
        data[index].Name=Name;
        data[index].Email=Email;
        fs.writeFileSync("user.json",JSON.stringify(employee,null,2));
            res.status(statusCodes.OK).json({
                code:statusCodes.OK.code,
                message:statusCodes.OK.message,
                data:null
            });

    } catch (err) {
        console.log("Error in employeeUpdate service:", err);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            code:statusCodes.INTERNAL_SERVER_ERROR.code,
            message:statusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
        
    }
}