import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    courseId: mongoose.Schema.Types.ObjectId,
    question: String,
    answer: String,
    submitted: { type: Boolean, default: false }
});

export default mongoose.model("Quiz", quizSchema);