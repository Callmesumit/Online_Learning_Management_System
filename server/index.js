import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import otpRoutes from "./routes/otpRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import webinarRoutes from "./routes/webinarRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

// default middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));



//apis

app.use("/api/v1/user", userRoute)
app.use("/api/otp", otpRoutes);
app.use('/api/v1', messageRoutes);
app.use('/api/v1',webinarRoutes);

http://localhost:8000/api/v1/user/register

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server Liten at port ${PORT}`);
    
})