import express from "express";
import {sendMessage} from "../controllers/message.controller.js";
import {isAuth} from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/send",isAuth,sendMessage);

export default router;