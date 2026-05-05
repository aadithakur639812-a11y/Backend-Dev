import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

export async function getMyTransactions(req, res, next) {
  try {
    const accounts = await Account.find({ userId: req.user._id }).select("_id");
    const accountIds = accounts.map((account) => account._id);

    const transactions = await Transaction.find({
      $or: [
        { fromAccount: { $in: accountIds } },
        { toAccount: { $in: accountIds } }
      ]
    })
      .sort({ date: -1 })
      .populate("fromAccount", "accountType balance")
      .populate("toAccount", "accountType balance");

    res.json(transactions);
  } catch (error) {
    next(error);
  }
}
