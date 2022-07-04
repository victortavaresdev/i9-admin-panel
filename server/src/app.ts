import cors from "cors";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import ensureAuthenticated from "./middlewares/ensureAuthenticated";
import { authRouter } from "./routes/auth.api";
import { clientRouter } from "./routes/clients.api";
import { errorHandler } from "./utils/errorHandler";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api", ensureAuthenticated, clientRouter);

app.use(errorHandler);

export { app };
