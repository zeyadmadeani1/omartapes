import express from "express"
import VerifyToken from "../VerifyToken.js"
import {deleteuser,getuser,viewthis,updateuser,subscribe,unsubscribe,like,unlike} from "../controllers/user.js"
const router=express.Router()
// update a user
router.put("/:id",VerifyToken,updateuser)

//delete a user
router.delete("/:id",VerifyToken,deleteuser)

//get a user 
router.get("/find/:id", getuser)

//subscribe a user
router.put("/sub/:id",VerifyToken,subscribe)

//unsubscribe a user
router.put("/unsub/:id",VerifyToken,unsubscribe)

//like a video 
router.put("/like/:videoId",VerifyToken,like)

router.put("/viewthis/:id",VerifyToken,viewthis)

router.put("/dislike/:videoId",VerifyToken,unlike)
//disklike a video
export default router