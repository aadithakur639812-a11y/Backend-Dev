import express from "express";
import Joi from "joi";
import {
  createAccount,
  deposit,
  getAllAccounts,
  getMyAccounts,
  transfer,
  withdraw
} from "../controllers/accountController.js";
import { adminOnly, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

const objectId = Joi.string().hex().length(24);

const createAccountSchema = Joi.object({
  accountType: Joi.string().valid("savings", "current").required()
});

const moneySchema = Joi.object({
  accountId: objectId.required(),
  amount: Joi.number().positive().precision(2).required()
});

const transferSchema = Joi.object({
  fromAccountId: objectId.required(),
  toAccountId: objectId.required(),
  amount: Joi.number().positive().precision(2).required()
});

router.use(protect);

router.get("/my", getMyAccounts);
router.get("/all", adminOnly, getAllAccounts);
router.post("/", validate(createAccountSchema), createAccount);
router.post("/deposit", validate(moneySchema), deposit);
router.post("/withdraw", validate(moneySchema), withdraw);
router.post("/transfer", validate(transferSchema), transfer);

export default router;
