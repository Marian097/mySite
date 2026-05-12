import { Router } from "express";

import { verifiedToken } from "../middleware/jwt.middleware.js";

import { hasVerifiedUserDocuments } from "../controller/controller.admin.documents.js";
import { getProfiles, hasProfileApproved } from "../controller/controller.admin.profiles.js";
import { deleteUser, findAllUsers } from "../controller/controller.admin.user.js";

export const adminRouter = Router();

adminRouter.put("/admin/documents/verify", verifiedToken, hasVerifiedUserDocuments);
adminRouter.get("/admin/profiles", getProfiles);
adminRouter.put("/admin/profile/verify", verifiedToken, hasProfileApproved );
adminRouter.delete("/admin/user", deleteUser);
adminRouter.get("/admin/user", findAllUsers );
