import cors from "cors";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "../../config/docs/swagger.json";
import { ensureAuthenticated } from "./middlewares";
import { authRouter, clientRouter } from "./routes";
import { errorHandler } from "./utils";
config();

const app = express();

const configFolder = path.join(__dirname, "../../config/");
const accessLogStream = fs.createWriteStream(
  path.join(configFolder, "Logger.log"),
  {
    flags: "a",
  }
);

const morganFormat = "[:method] - [:url] - [:status] - [:response-time ms]";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan(morganFormat, { stream: accessLogStream }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/auth", authRouter);
app.use("/api/clients", ensureAuthenticated, clientRouter);

app.use(errorHandler);

export { app };
