"use strict";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { globalErrorHandler } from "./Middlewares/globalErrorHandler.js";
import hospitalRouter from "./Routes/hospitalRoutes/hospital.js";
import patientRouter from "./Routes/patientRoutes/patient.js";
import psyRouter from "./Routes/psyRoutes/psychiatrist.js";
import authRouter from "./Routes/authRouter.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(morgan("short"));
app.use(helmet());

app.get("/", function (req, res, next) {
  return res.status(200).send({ success: true, msg: "Server is working " });
});

app.use("/api/v1/hospital",hospitalRouter);
app.use("/api/v1/patient",authRouter,patientRouter);
app.use("/api/v1/psy",authRouter,psyRouter);

app.use(globalErrorHandler);

export default app;
