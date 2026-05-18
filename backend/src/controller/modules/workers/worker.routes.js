import { Router } from "express";

import { createProfile, updateProfile, deleteProfile, addDocuments} from "./worker.controller.js"

import { verifiedToken } from "../../../middleware/jwt.middleware.js"



export const workerRouter = Router()

workerRouter.post("/create/worker/profile", verifiedToken, createProfile)
workerRouter.patch("/update/worker/profile", verifiedToken, updateProfile)
workerRouter.delete("/update/worker/profile", verifiedToken,  deleteProfile )
workerRouter.post("/worker/documents", verifiedToken, addDocuments)