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

import { doctorsrouter } from "./routes/doctor.route.js";
app.use("/doctors", doctorsrouter);

import { userrouter } from "./routes/user.route.js";
app.use("/user", userrouter);

export { app };
