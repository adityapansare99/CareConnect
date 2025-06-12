import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import { router } from "./routes/healthcheck.route.js";
app.use("/", router);

import { adminrouter } from "./routes/admin.route.js";
app.use("/admin", adminrouter);

export { app };
