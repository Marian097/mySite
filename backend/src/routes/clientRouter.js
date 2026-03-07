import { Router } from "express";

import { createClient } from "../models/client.js"


export const clientRouter = Router()

clientRouter.post("/sing-up", createClient)