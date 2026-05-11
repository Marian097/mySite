import { Router } from "express";


import { verifiedToken } from "../middleware/jwt.middleware.js"

import { addUserDocuments, hasVerifiedUserDocuments } from "../controller/controller.user.documents.js"


export const documentsRouter = Router()

documentsRouter.post("/documents", verifiedToken, addUserDocuments)
documentsRouter.put("/documents/verify", verifiedToken, hasVerifiedUserDocuments)