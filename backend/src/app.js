import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
