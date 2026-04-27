import mongoose from "mongoose";

export default function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));
}