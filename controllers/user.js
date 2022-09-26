import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js"
import bcrypt from "bcryptjs"
export const updateuser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      if(req.body.password)
      {
        const salt = await bcrypt.genSaltSync(10);
        req.body.password = await bcrypt.hashSync(req.body.password, salt);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteuser = async (req, res, next) => {

  if (req.params.id === req.user.id) {
    try {
      await Video.findOne({userId:req.params.id}).deleteOne()
      await Comment.findOne({userId:req.params.id}).deleteOne()
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

export const getuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
};

export const unlike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err);
  }
};
export const viewthis = async (req, res, next) => {
try 
{
const video=await Video.findById(req.params.id)
const user=await User.findById(req.user.id)
user.updateOne({$push:{viewedVideos:video._id}})
res.status(200).json("Video has been viewed by this user")
}
catch(e)
{
next(e)
}
};

