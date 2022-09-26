import express from "express"
const router=express.Router()
import VerifyToken from "../VerifyToken.js"
import Comment from "../models/Comment.js"
import {addComment,getComments} from "../controllers/comment.js"
router.post("/addcomment",addComment)
router.get("/:videoId",getComments)
router.delete("/:id",VerifyToken,async(req,res,next)=>
{
    try 
{
await Comment.findByIdAndDelete(req.params.id)
res.status(200).json("Comment has been deleted")
}
catch(e)
{
next(e)
}
})
export default router