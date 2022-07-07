import cors from "cors";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "../docs/swagger.json";
import { ensureAuthenticated } from "./middlewares";
import { authRouter, clientRouter } from "./routes";
import { errorHandler } from "./utils";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/auth", authRouter);
app.use("/api/clients", ensureAuthenticated, clientRouter);

app.use(errorHandler);

export { app };
