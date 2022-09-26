import express from "express"
import VerifyToken from "../VerifyToken.js"
import { addVideo,search,getByTag,history,randomVideo,subscribedVideos,trendVideo,viewVideo,updateVideo,getvideo,deletevideo } from "../controllers/video.js"
const router=express.Router()
router.post("/",VerifyToken,addVideo)
router.put("/:id",VerifyToken,updateVideo)
router.get("/find/:id",getvideo)
router.delete("/:id",VerifyToken,deletevideo)
router.put("/view/:id",viewVideo)
router.get("/trend",trendVideo)
router.get("/random",randomVideo)
router.get("/sub",VerifyToken,subscribedVideos)
router.get("/tag",getByTag)
router.get("/search",search)
router.get("/find/history",VerifyToken,history)


export default router