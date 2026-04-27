import express from "express";
import {submitQuiz} from "../controllers/quiz.controller.js";
import {isAuth} from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/submit",isAuth,submitQuiz);

export default router;