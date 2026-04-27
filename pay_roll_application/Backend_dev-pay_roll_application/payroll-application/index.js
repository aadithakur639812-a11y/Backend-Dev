import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoute from "./src/employee/routes/employee.routes.js";

dotenv.config();
let app=express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8008;

app.use("/employee",employeeRoute);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});