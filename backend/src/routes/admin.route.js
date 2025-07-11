import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  adddoctor,
  adminlogin,
  alldoctors,
  allappointments,
  cancelappointment,
  admindashboard,
} from "../controllers/admin.controller.js";
import { changeavailable } from "../controllers/doctor.controller.js";
import { body } from "express-validator";

import { auth } from "../middlewares/auth.middleware.js";

const adminrouter = Router();

adminrouter.route("/add-doctor").post(auth, upload.single("image"), adddoctor);

adminrouter.route("/login").post(adminlogin);

adminrouter.route("/all-doctors").post(auth, alldoctors);

adminrouter.route("/change-available").post(auth, changeavailable);

adminrouter.route("/all-appointments").get(auth, allappointments);

adminrouter.route("/cancel-appointment").post(auth, cancelappointment);

adminrouter.route("/dashboard").get(auth, admindashboard);

export { adminrouter };
