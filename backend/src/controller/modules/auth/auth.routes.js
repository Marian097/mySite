import { Router } from "express";

import { registerProvider, Login, registerClient, registerAdmin } from "./auth.controller.js"



export const authRouter = Router()

authRouter.post("/sign-up/provider", registerProvider)
authRouter.post("/client", registerClient)
authRouter.post("/admin", registerAdmin)
authRouter.post("/login", Login)