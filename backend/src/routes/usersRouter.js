import { Router } from "express";

import { singUp, Login} from "../controller/controller.users.js"


export const usersRouter = Router()

usersRouter.post("/sign-up", singUp)
usersRouter.post("/login", Login)