import { Router } from "express";

import { verifiedToken } from "../../../middleware/jwt.middleware.js";
import { verifyAdmin } from "../../../middleware/requireRole.js";

import {
  hasAcceptUserDocuments,
  hasRejectedUserDocuments,
  createAdminProfile,
  getWorkerPending,
  getWorkerApproved,
  getWorkerRejected,
  getWorker,
  getProfilesVerified,
  getProfilesUnverified,
  hasProfileApproved,
  hasProfileRejected,
  deleteUser,
  getAdminProfile,
  getProfileByEmail,
  filterByExpiringCI,
  totalWorker,
  calculateProcentTotalWorkers,
  totalWorkerApproved,
  calculateProcentWorkersApproved,
  totalWorkerRejected,
  calculateProcentWorkersRejected,
  totalWorkersPending,
  calculateProcentWorkersPending,
  getStatistic,
} from "./admin.controller.js";

export const adminRouter = Router();



adminRouter.post(
  "/admin/create/profile",
  verifiedToken,
  verifyAdmin,
  createAdminProfile,
);

adminRouter.get(
  "/admin/profile",
  verifiedToken,
  verifyAdmin,
  getAdminProfile,
);

//Card total worker
adminRouter.get(
  "/admin/profile/card/total_workers",
  verifiedToken,
  verifyAdmin,
  totalWorker,
);

adminRouter.post(
  "/admin/profile/card/total_workers",
  verifiedToken,
  verifyAdmin,
  calculateProcentTotalWorkers,
);
//

// Card worker approved
adminRouter.get(
  "/admin/profile/card/total_workers/approved",
  verifiedToken,
  verifyAdmin,
  totalWorkerApproved,
);

adminRouter.post(
  "/admin/profile/card/total_workers/approved",
  verifiedToken,
  verifyAdmin,
  calculateProcentWorkersApproved,
);
//////////////////////////////////////////////////

//Card worker rejected
adminRouter.get(
  "/admin/profile/card/total_workers/rejected",
  verifiedToken,
  verifyAdmin,
  totalWorkerRejected,
);

adminRouter.post(
  "/admin/profile/card/total_workers/rejected",
  verifiedToken,
  verifyAdmin,
  calculateProcentWorkersRejected,
);
//////////////////////////////////////////////////

//Card worker pending
adminRouter.get(
  "/admin/profile/card/total_workers/pending",
  verifiedToken,
  verifyAdmin,
  totalWorkersPending,
);

adminRouter.post(
  "/admin/profile/card/total_workers/pending",
  verifiedToken,
  verifyAdmin,
  calculateProcentWorkersPending,
);
////////////////////////////////////////////////////////////////

adminRouter.post(
  "/worker/by_email",
  verifiedToken,
  verifyAdmin,
  getProfileByEmail,
);

adminRouter.get(
  "/worker/by_expiring/ci",
  verifiedToken,
  verifyAdmin,
  filterByExpiringCI,
); 


adminRouter.get(
  "/worker/pending",
  verifiedToken,
  verifyAdmin,
  getWorkerPending,
);

adminRouter.get(
  "/worker/rejected",
  verifiedToken,
  verifyAdmin,
  getWorkerRejected,
);

adminRouter.get(
  "/worker",
  verifiedToken,
  verifyAdmin,
  getWorker,
);

// Get statistic worker
adminRouter.get(
  "/worker/statistic",
  verifiedToken,
  verifyAdmin,
  getStatistic,
);
///////////////////

adminRouter.get("/worker/approved", verifiedToken, verifyAdmin, getWorkerApproved);


//Accept users
adminRouter.put(
  "/documents/accept",
  verifiedToken,
  verifyAdmin,
  hasAcceptUserDocuments,
);
adminRouter.put(
  "/documents/reject",
  verifiedToken,
  verifyAdmin,
  hasRejectedUserDocuments,
);
adminRouter.get("/profiles/verified", verifiedToken, verifyAdmin, getProfilesVerified);
adminRouter.get("/profiles/unverified",verifiedToken, verifyAdmin, getProfilesUnverified);
adminRouter.put(
  "/profile/verify/accept",
  verifiedToken,
  verifyAdmin,
  hasProfileApproved,
);
adminRouter.put(
  "/profile/verify/reject",
  verifiedToken,
  verifyAdmin,
  hasProfileRejected,
);
adminRouter.delete("/user", verifiedToken, verifyAdmin, deleteUser);
