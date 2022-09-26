import express from "express"
import Comment from "../models/Comment.js"
export const addComment=async(req,res,next)=>
{
try 
{
    const newComment=new Comment({userId:req.body.userId,...req.body})
        await newComment.save()
res.status(200).json("Comment has been added")

}
catch(e)
{
    res.status(403).json(`error: ${e}`)
}
}

export const deleteComment=async(req,res)=>
{

}
export const getComments=async(req,res,next)=>
{
try 
{
const comments=await Comment.find({videoId:req.params.videoId})
res.status(200).json(comments)
}
catch(e)
{
next(e)
}
}

