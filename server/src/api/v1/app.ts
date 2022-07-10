import cors from "cors";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import ratelimit from "express-rate-limit";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "../../config/documentation/swagger.json";
import { ensureAuthenticated } from "./middlewares";
import { authRouter, clientRouter } from "./routes";
import { errorHandler } from "./utils";
config();

const app = express();

const request_limit = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

const logsFolder = path.join(__dirname, "../../config/logs");
const accessLogStream = fs.createWriteStream(
  path.join(logsFolder, "Access.log"),
  {
    flags: "a",
  }
);
const morganFormat =
  "[:method] - [:url] - [:status] - [HTTP/:http-version] - [:response-time ms]";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan(morganFormat, { stream: accessLogStream }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/auth", authRouter);
app.use("/api/clients", ensureAuthenticated, clientRouter);
app.use("/api", request_limit);

app.use(errorHandler);

export { app };
