import fs from "fs";
import { StatusCodes } from "http-status-codes";

export function createEmployee(req,res){
    let {Name,profileImage,gender,department,salary,startDate,note}=req.body;
    try {
        let employee=[];
        let employeeData={
            id:Date.now(),
            Name,
            profileImage,
            gender,
            department,
            salary,
            startDate:new Date(),
            note
        }
        if(!Name||!profileImage||!gender||!department||!salary||!startDate){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        if(fs.existsSync("employee.json")){
            let data=fs.readFileSync("employee.json","utf-8");
            let isEmployee=JSON.parse(data).find((emp)=>emp.Name===Name);
            if(isEmployee){
                res.status(StatusCodes.BAD_REQUEST.code).json({
                    code: StatusCodes.BAD_REQUEST.code,
                    message:StatusCodes.BAD_REQUEST.message,
                    data:null
                })
            
            }
            employee=data;

        }
        employee.push(employeeData);
        fs.writeFileSync("employee.json",JSON.stringify(employee,null,2));
        res.status(StatusCodes.CREATED.code).json({
            code: StatusCodes.CREATED.code,
            message:StatusCodes.CREATED.message,
            data:null
        })
        
        
    } catch (err) {
        console.log("error in createEmployee", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
        
    }

}

export function updateEmployee(req,res){
    let {id,Name,department,salary,note}=req.body;
    try{
        if(!id||!Name||!department||!salary||!note){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            });
        }
        if(fs.existsSync("employee.json")){
            let data=fs.readFileSync("employee.json","utf-8");
            let employee=JSON.parse(data);
            let isEmployee=employee.find((emp)=>emp.id===id);
            if(!isEmployee){
                res.status(StatusCodes.BAD_REQUEST.code).json({
                    code: StatusCodes.BAD_REQUEST.code,
                    message:StatusCodes.BAD_REQUEST.message,
                    data:null
                });
            }
            let updateEmployee=data.findIndex((emp)=>emp.id===id);
            employee[updateEmployee].Name=Name;
            employee[updateEmployee].department=department;
            employee[updateEmployee].salary=salary;
            employee[updateEmployee].note=note;
            fs.writeFileSync("employee.json",JSON.stringify(employee,null,2));
            res.status(StatusCodes.OK.code).json({
                code: StatusCodes.OK.code,
                message:StatusCodes.OK.message,
                data:null
            });
        }
    }
    catch(err){
        console.log("error in updateEmployee", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export function deleteEmployee(req,res){
    let {id}=req.body;
    try{
        if(!id){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            });
        }
        if(!fs.existsSync("employee.json")){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            });
        }
        let data=fs.readFileSync("employee.json","utf-8");
        let employee=JSON.parse(data);
        let isEmployee=employee.find((emp)=>emp.id===id);
        if(!isEmployee){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            });
        }
        let deleteEmployee=employee.filter((emp)=>emp.id!==id);
        fs.writeFileSync("employee.json",JSON.stringify(deleteEmployee,null,2));
        res.status(StatusCodes.OK.code).json({
            code: StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:null
        });
    }
    catch(err){
        console.log("error in deleteEmployee", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export function getEmployee(req,res){
    let {id}=req.body;
    try{
        if(!id){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            });
        }
        if(!fs.existsSync("employee.json")){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            });
        }
        let data=fs.readFileSync("employee.json","utf-8");
        let employee=JSON.parse(data);
        let isEmployee=employee.find((emp)=>emp.id===id);
        if(!isEmployee){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            });
        }
        res.status(StatusCodes.OK.code).json({
            code: StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:isEmployee
        });
    }
    catch(err){
        console.log("error in getEmployee", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }   
}

export function getAllEmployee(req,res){
    try{
        if(!fs.existsSync("employee.json")){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            });
        }
        let data=fs.readFileSync("employee.json","utf-8");
        
        let employee=JSON.parse(data);
        res.status(StatusCodes.OK.code).json({
            code: StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:employee
        });
    }
    catch(err){
        console.log("error in getAllEmployee", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,   
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}