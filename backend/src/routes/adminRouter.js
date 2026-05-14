import { Router } from "express";

import { verifiedToken } from "../middleware/jwt.middleware.js";

import { hasVerifiedAcceptUserDocuments, hasVerifiedRejectedUserDocuments, getUserDocumentsUnverified, getUserDocumentsVerified } from "../controller/controller.admin.documents.js";
import { getProfilesVerified, getProfilesUnverified, hasProfileApproved, hasProfileRejected } from "../controller/controller.admin.profiles.js";
import { deleteUser, findAllUsers } from "../controller/controller.admin.user.js";

export const adminRouter = Router();

adminRouter.update("/admin/documents/verify/accept", verifiedToken, hasVerifiedAcceptUserDocuments);
adminRouter.update("/admin/documents/verify/reject", verifiedToken, hasVerifiedRejectedUserDocuments);
adminRouter.get("/admin/documents/unverified", verifiedToken, getUserDocumentsUnverified);
adminRouter.get("/admin/documents/verified", verifiedToken, getUserDocumentsVerified);
adminRouter.get("/admin/profiles/verified", getProfilesVerified);
adminRouter.get("/admin/profiles/unverified", getProfilesUnverified);
adminRouter.put("/admin/profile/verify/accept", verifiedToken, hasProfileApproved );
adminRouter.put("/admin/profile/verify/reject", verifiedToken, hasProfileRejected );
adminRouter.delete("/admin/user", deleteUser);
adminRouter.get("/admin/user", findAllUsers );
