import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    default: null
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    default: null
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  type: {
    type: String,
    enum: ["deposit", "withdraw", "transfer"],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Transaction", transactionSchema);
