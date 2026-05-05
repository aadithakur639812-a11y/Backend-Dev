import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

export async function checkBalance(userId, amount = 0, accountId = null) {
  const query = accountId ? { _id: accountId, userId } : { userId };
  const account = await Account.findOne(query);

  if (!account) {
    const error = new Error("Account not found");
    error.status = 404;
    throw error;
  }

  if (account.balance < amount) {
    const error = new Error("Insufficient balance");
    error.status = 400;
    throw error;
  }

  return account;
}

export async function getMyAccounts(req, res, next) {
  try {
    const accounts = await Account.find({ userId: req.user._id });
    res.json(accounts);
  } catch (error) {
    next(error);
  }
}

export async function getAllAccounts(req, res, next) {
  try {
    const accounts = await Account.find().populate("userId", "name email role");
    res.json(accounts);
  } catch (error) {
    next(error);
  }
}

export async function createAccount(req, res, next) {
  try {
    const account = await Account.create({
      userId: req.user._id,
      accountType: req.body.accountType || "savings",
      balance: 0
    });

    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
}

export async function deposit(req, res, next) {
  try {
    const { accountId, amount } = req.body;
    const account = await checkBalance(req.user._id, 0, accountId);

    account.balance += amount;
    await account.save();

    await Transaction.create({
      fromAccount: null,
      toAccount: account._id,
      amount,
      type: "deposit"
    });

    res.json({ message: "Deposit successful", account });
  } catch (error) {
    next(error);
  }
}

export async function withdraw(req, res, next) {
  try {
    const { accountId, amount } = req.body;
    await checkBalance(req.user._id, amount, accountId);

    const account = await Account.findOneAndUpdate(
      { _id: accountId, userId: req.user._id, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true }
    );

    if (!account) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    await Transaction.create({
      fromAccount: account._id,
      toAccount: null,
      amount,
      type: "withdraw"
    });

    res.json({ message: "Withdraw successful", account });
  } catch (error) {
    next(error);
  }
}

export async function transfer(req, res, next) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    if (fromAccountId === toAccountId) {
      return res.status(400).json({ message: "Cannot transfer to the same account" });
    }

    await checkBalance(req.user._id, amount, fromAccountId);
    const receiverExists = await Account.exists({ _id: toAccountId });

    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver account not found" });
    }

    const fromAccount = await Account.findOneAndUpdate(
      { _id: fromAccountId, userId: req.user._id, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true }
    );

    if (!fromAccount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findByIdAndUpdate(
      toAccountId,
      { $inc: { balance: amount } },
      { new: true }
    );

    await Transaction.create({
      fromAccount: fromAccount._id,
      toAccount: toAccount._id,
      amount,
      type: "transfer"
    });

    res.json({ message: "Transfer successful", fromAccount, toAccount });
  } catch (error) {
    next(error);
  }
}
