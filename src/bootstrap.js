import express from "express";
import morgan from "morgan";
import { AppError } from "./utils/error.handler.js";
import v1Router from "./routers/v1.routes.js";
import cors from "cors";
const bootstrap = (app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use("/api/v1", v1Router);

  app.all("*", (req, res, next) => {
    throw new AppError("Route not found", 404);
  });

  app.use((err, req, res, next) => {
    const { message, status, stack } = err;
    res.status(status || 500).json({
      message,
      ...(process.env.MODE === "development" && { stack }),
    });
  });
};
//mostafaa
export default bootstrap;
