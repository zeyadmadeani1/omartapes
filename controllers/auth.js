import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { createError } from "../error.js"
import {v4 as uuid} from "uuid"
import { isErrored } from "stream"
export const signup=async(req,res,next)=>
{
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        const savedUser=await newUser.save();
        res.status(200).json(savedUser);
      } catch (err) {
        next(err);
      }
}
export const signin=async(req,res,next)=>
{
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) return next(createError(404, "User not found!"));
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) return next(createError(401, "Wrong Credentials!"));
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...others } = user._doc;
      res.cookie("access_token", token, {httpOnly: true
        })
        .status(200)
        .json(others);

}
catch(err)
{
next(err)
}
}
export const forgotPassword=async(req,res,next)=>
{

const token=uuid()
  const user=await User.findOne({email:req.body.email})
      if(!user)
        return next(404,"Email doesn't exist")
        await user.update({resetToken:token,expireToken:Date.now()+900000},{new:true})
       const transporter=nodemailer.createTransport(
    {
          service:"hotmail",
   auth: {
     user: process.env.MAILER_EMAIL_ID,
     pass: process.env.MAILER_PASSWORD
   }})
   const mailOptions = {
    from: 'no-reply.omartapes@outlook.com', // Sender address
    to: user.email, // List of recipients
    subject: `${user.name.charAt(0).toUpperCase() + user.name.slice(1)}'s Password Reset Link - Omartapes`, // Subject line
    html: `<h3>Hello ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}, Below is your reset link for your account.</h3> <p><a href="https://omartapes.herokuapp.com/987739280-0329873280-KJFHKlnhdkujospk-2317Y6U32179808/${token}">https://omartapes.herokuapp.com/987739280-0329873280-KJFHKlnhdkujospk-2317Y6U32179808/${token}</a></p> <h3>Thank you for using Omartapes!</h3>`, // Plain text body
};

transporter.sendMail(mailOptions, function(err, info) {
   if (err) {
   next(err)
   } else {
 res.status(200).json("Email sent")
   }
});
}
export const newpass=(async(req,res,next)=>
{
const newpassword=req.body.password
const sentToken=req.body.token
const user= await User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    if(!user)
    return res.status(422).json("Session has expired")
    const salt = await bcrypt.genSaltSync(10);
    const newpass = await bcrypt.hashSync(newpassword, salt);
    user.update({password:newpass,resetToken:undefined,expireToken:undefined},{new:true})
    .then(user=>
      {
          res.status(200).json("Success")
      }).catch(e=>{next(e)})

  })
