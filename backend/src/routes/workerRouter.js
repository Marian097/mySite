import { Router } from "express";

import { createProfile, getAllProfiles, updateProfile, deleteProfile, filterProfile} from "../controller/controller.worker.profile.js"
import { verifiedToken } from "../middleware/jwt.middleware.js"


export const workerRouter = Router()

workerRouter.post("/create/profile", verifiedToken, createProfile)
workerRouter.get("/get/profiles", getAllProfiles)
workerRouter.patch("/update/profile", verifiedToken, updateProfile)
workerRouter.delete("/update/profile", verifiedToken,  deleteProfile )
workerRouter.post("/filter/profile", filterProfile )