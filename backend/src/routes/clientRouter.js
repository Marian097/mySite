import { Router } from "express";

import { singUp, Login} from "../models/client.js"


export const clientRouter = Router()

clientRouter.post("/sign-up", singUp)
clientRouter.post("/login", Login)