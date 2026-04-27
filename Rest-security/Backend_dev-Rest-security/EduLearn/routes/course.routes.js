import express from "express";
import {createCourse} from "../controllers/course.controller.js";
import {isAuth} from "../middleware/auth.middleware.js";
import {isInstructor} from "../middleware/role.middleware.js";

const router=express.Router();

router.post("/create",isAuth,isInstructor,createCourse);

export default router;