import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructorId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model("Course", courseSchema);