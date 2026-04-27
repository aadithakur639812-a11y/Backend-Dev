import express from "express";
import {upload} from "../middleware/upload.middleware.js";
import {uploadFile} from "../controllers/upload.controller.js";

const router=express.Router();

router.post("/",upload.single("file"),uploadFile);

export default router;