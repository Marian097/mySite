import { Router } from "express";

import {
  createProfile,
  updateProfile,
  deleteProfile,
  addDocuments,
  registerBussines,
  updateStep
} from "./worker.controller.js";

import { verifiedToken } from "../../../middleware/jwt.middleware.js";
import { verifyProvider } from "../../../middleware/requireRole.js";
import { upload } from "../../../middleware/uploads.middleware.js";

export const workerRouter = Router();

workerRouter.post(
  "/create/worker/profile",
  verifiedToken,
  verifyProvider,
  createProfile,
);
workerRouter.patch(
  "/update/worker/profile",
  verifiedToken,
  verifyProvider,
  updateProfile,
);
workerRouter.delete(
  "/update/worker/profile",
  verifiedToken,
  verifyProvider,
  deleteProfile,
);
workerRouter.post(
  "/worker/documents",
  verifiedToken,
  verifyProvider,
  upload.fields([
    { name: "ci_image", maxCount: 1 },
    { name: "ci_selfie", maxCount: 1 },
  ]),
  addDocuments,
);



workerRouter.post(
  "/fiscal/documents",
  verifiedToken,
  verifyProvider,
  upload.fields([
    { name: 'certificate_registration', maxCount: 1}
  ]),
  registerBussines,
);

workerRouter.put(
  "/worker/documents/step",
  verifiedToken,
  verifyProvider,
  updateStep,
);
