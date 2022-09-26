import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserRoute from "./Routes/User.js"
import VideoRoute from "./Routes/Video.js"
import CommentRoute from "./Routes/Comment.js"
import AuthRoute from "./Routes/Auth.js"
import cookieparser from "cookie-parser"
import morgan from "morgan"
import path from "path"
import cors from "cors"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config()
const app=express()
app.use((err,req,res,next)=>
{
    const status=err.status || 500
    const message=err.message || "Something Went Wrong..."
    return res.status(status).json(
        {
            success:false,
            status,
            message
        })
})
app.use(cors())
app.use(morgan("common"))
app.use(express.json())
app.use(cookieparser())
app.use("/api/users",UserRoute)
app.use("/api/videos",VideoRoute)
app.use("/api/comments",CommentRoute)
app.use("/api/auth",AuthRoute)
app.use(express.static(path.join(__dirname, "/client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});
mongoose.connect(process.env.DSKS,{useNewUrlParser:true})
.then(()=>{console.log("Connected to Database")}).catch(e=>{console.log(`Error connecting to database: ${e}`)})
app.listen(process.env.PORT,()=>{console.log(`Server is listening on port ${process.env.PORT}`)})