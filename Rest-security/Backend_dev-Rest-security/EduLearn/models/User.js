import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ["student","instructor","admin"] },
    mfaEnabled: { type: Boolean, default: false }
});

export default mongoose.model("User", userSchema);