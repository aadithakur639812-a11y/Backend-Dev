import fs from "fs";
import {statusCodes} from 'http-status-codes';
import dotenv from "dotenv";
dotenv.config();

function employeeDelete(req,res){
    let {id}=req.body; 
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
        let isUser=employee.find((emp)=>emp.id===id);
        if(!isUser){
            res.status(statusCodes.NOT_FOUND).json({
                code:statusCodes.NOT_FOUND.code,
                message:statusCodes.NOT_FOUND.message,
                data:null
            })
            return;
        }
        let index=employee.filter((emp)=>emp.id===id);
        fs.writeFileSync("user.json",JSON.stringify(employee,null,2));
        res.status(statusCodes.OK).json({
            code:statusCodes.OK.code,
            message:statusCodes.OK.message,
            data:null
        });
        

        
    } catch (err) {
        console.log("Error in employeeDelete service:", err);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            code:statusCodes.INTERNAL_SERVER_ERROR.code,
            message:statusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
        
    }
}