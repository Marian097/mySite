import { Router } from "express";

import { singUp, Login } from "../models/client"


export const clientRouter = Router()

clientRouter.post("/sing-up", singUp)
clientRouter.get("/login", Login)