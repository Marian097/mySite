import { Router } from "express";

import { createProfile, updateProfile, deleteProfile, addDocuments, registerBussines} from "./worker.controller.js"

import { verifiedToken } from "../../../middleware/jwt.middleware.js"
import { verifyProvider } from "../../../middleware/requireRole.js"



export const workerRouter = Router()

workerRouter.post("/create/worker/profile", verifiedToken, verifyProvider , createProfile)
workerRouter.patch("/update/worker/profile", verifiedToken, verifyProvider, updateProfile)
workerRouter.delete("/update/worker/profile", verifiedToken, verifyProvider, deleteProfile )
workerRouter.post("/worker/documents", verifiedToken, verifyProvider, addDocuments)
workerRouter.post("/bussines/documents", verifiedToken, verifyProvider, registerBussines)