import bcrypt from "bcrypt";
import fs from "fs";
import {statusCodes} from "http-status-codes";
import dotenv from "dotenv";

dotenv.config();

function employeeSignup(req,res){
    try {
        let {Name,Email,Password}=req.body;
        let salt=bcrypt.genSaltSync(10);
        let hasPassword=bcrypt.hashSync(Password,salt);
        Password=hasPassword;
        let employee=[];
        let obj={
            id:new Date(),
            Name,
            Email,
            Password
        }
        if(!Name||!Email||!Password){
            res.status(statusCodes.BAD_REQUEST).json({
                code:statusCodes.BAD_REQUEST.code,
                message:statusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        if(fs.existsSync("user.json")){
            let data=fs.readFileSync("user.json","utf-8");
            let isEmployee=JSON.parse(data).find((emp)=>emp.Email===Email);
            if(isEmployee){
                res.status(statusCodes.BAD_REQUEST).json({
                    code:statusCodes.BAD_REQUEST.code,
                    message:statusCodes.BAD_REQUEST.message,
                    data:null
                })
                return res.render("signup.ejs",{error:"conflict"});
            }
            employee=data;

        }
        employee.push(obj);
        fs.writeFileSync("user.json",JSON.stringify(employee,null,2));
        res.status(statusCodes.CREATED).json({
            code:statusCodes.CREATED.code,
            message:statusCodes.CREATED.message,
            data:null
        });
        res.redirect("/employee/login"); 
    } catch (err) {
        console.log("Error in employeeSignup service:", err);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            code:statusCodes.INTERNAL_SERVER_ERROR.code,
            message:statusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
        
    }
}

export default employeeSignup;
