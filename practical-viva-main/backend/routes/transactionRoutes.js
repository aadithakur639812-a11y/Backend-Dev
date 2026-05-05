import express from "express";
import { getMyTransactions } from "../controllers/transactionController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/my", protect, getMyTransactions);

export default router;
