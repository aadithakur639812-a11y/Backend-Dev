import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo.routes.js";

const app=express();
app.use(express.json());
app.use("/api/todos",todoRoutes);

const PORT=8800;
mongoose.connect("mongodb://localhost:27017/todo").then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("error connecting to database",err);
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});