import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./config/db.js";
import {sanitizeData} from "./middleware/sanitize.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import messageRoutes from "./routes/message.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

dotenv.config();
connectDB();

const app=express();

app.use(helmet({
    contentSecurityPolicy:false
}));

app.use(cors({
    origin:true,
    credentials:true
}));

app.use(express.json());
app.use(sanitizeData);

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:process.env.MONGO_URI}),
    cookie:{maxAge:30*60*1000}
}));

app.use("/api/auth",authRoutes);
app.use("/api/course",courseRoutes);
app.use("/api/quiz",quizRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/upload",uploadRoutes);

app.listen(process.env.PORT,()=>console.log("Server running"));