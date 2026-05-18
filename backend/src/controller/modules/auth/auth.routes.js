import { Router } from "express";

import { registerProvider, Login, registerClient, registerAdmin } from "./auth.controller.js"


export const usersRouter = Router()

usersRouter.post("/provider", registerProvider)
usersRouter.post("/client", registerClient)
usersRouter.post("/admin", registerAdmin)
usersRouter.post("/login", Login)