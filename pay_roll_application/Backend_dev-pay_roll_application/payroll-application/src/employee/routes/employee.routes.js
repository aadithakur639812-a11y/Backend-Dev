import express from "express";
import { employeeDelete } from "../services/delete.js";
import { employeeUpdate } from "../services/update.js";
import { employeeSignup } from "../services/signup.js";
import { employeeLogin } from "../services/logging.js";
import auth from "../auth/auth.js";
import employeeDelete from "../midd/delete.js";
import employeeUpdate from "../midd/update.js";
import employeecreate from "../midd/add.js";
import searchEmployee from "../midd/search.js";
import fs from "fs";

import {createEmployee,updateEmployee,deleteEmployee,getEmployee,getAllEmployee} from "../model/employee.model.js";

let router=express.Router();

router.get("/register",(req,res)=>{
    res.render("signup.ejs",{error:null});
});

router.post("/user",employeeSignup);

router.get("/login",(req,res)=>{
    res.render("login.ejs",{error:null});
});
router.post("/login",employeeLogin);
router.delete("/delete",employeeDelete);
router.put("/update",employeeUpdate);


router.get("/dashboard",(req,res)=>{
    res.render("dashboard.ejs");
})

router.post("/create",auth,employeecreate,createEmployee);
router.put("/update",auth,employeeUpdate,updateEmployee);
router.delete("/delete",auth,employeeDelete,deleteEmployee);
router.get("/search",auth,searchEmployee,getEmployee);

router.post("/employee",auth,(req,res)=>{
    let {search}=req.body;
    let data=fs.readFileSync("employee.json","utf-8");
    let employee=JSON.parse(data);
    let searchEmployee=employee.filter((emp)=>emp.Name.toLowerCase().includes(search.toLowerCase()));
    res.render("employee.ejs",{employee:searchEmployee});
});

router.get("/edit",auth,(req,res)=>{
    res.render("edit.ejs",{error:null});

});

router.put("/edit",auth,(req,res)=>{
    let {id}=req.body;
    let data=fs.readFileSync("employee.json","utf-8");
    let employee=JSON.parse(data);
    let isEmployee=employee.find((emp)=>emp.id===id);
    if(!isEmployee){
        res.render("edit.ejs",{error:"employee not found"});
    }
    res.render("edit.ejs",{error:null,employee:isEmployee});
});

router.get("/employee",auth,getAllEmployee);

router.get("/del/:id",(req,res)=>{
    res.send("delete employee with id: "+req.params.id);
});

export default router;