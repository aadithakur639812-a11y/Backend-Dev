import express from "express";
import {addTodo} from "../middleware/add.middleware.js";
import {updateTodo} from "../middleware/update.middleware.js";
import {markComplete} from "../middleware/markcomplete.middleware.js";
import {deleteTodo} from "../middleware/delete.middleware.js";
import {getTodo} from "../middleware/get.middleware.js";
import {addtodo} from "../services/add.js";
import {gettodo} from "../services/get.js";
import {updatetodo} from "../services/update.js";
import {markcomplete} from "../services/markcomplete.js";
import {deletetodo} from "../services/delete.js";

const router=express.Router();

router.post("/",addTodo,addtodo);
router.get("/",gettodo);
router.put("/:id",updateTodo,updatetodo);
router.patch("/:id/complete",markComplete,markcomplete);
router.delete("/:id",deleteTodo,deletetodo);

export default router;