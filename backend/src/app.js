import express from "express";
import cors from "cors";

import {clientRouter} from "./routes/clientRouter.js";
import {errorHandler} from "./middleware/error.middleware.js";

const app = express();

app.use(cors({origin: "http://localhost:5173"}));

app.use(express.json());

app.get("/health", (req, res) => res.json({ok: true}));

app.use("/api/client", clientRouter);

app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`API Running on http://localhost:${port}`));