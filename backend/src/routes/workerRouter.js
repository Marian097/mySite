import { Router } from "express";

import { createProfile, updateProfile, deleteProfile, hasUserApproved} from "../controller/controller.worker.profile.js"

import { verifiedToken } from "../middleware/jwt.middleware.js"
import { addDocuments} from "../controller/controller.worker.documents.js"



export const workerRouter = Router()

workerRouter.post("/create/profile", verifiedToken, createProfile)
workerRouter.patch("/update/profile", verifiedToken, updateProfile)
workerRouter.delete("/update/profile", verifiedToken,  deleteProfile )
workerRouter.post("/documents", verifiedToken, addDocuments)