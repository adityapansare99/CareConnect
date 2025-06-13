import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { adddoctor, adminlogin } from "../controllers/admin.controller.js";
import { body } from "express-validator";

import { auth } from "../middlewares/auth.middleware.js";

const adminrouter = Router();

adminrouter.route("/add-doctor").post(auth, upload.single("image"), adddoctor);

adminrouter.route("/login").post(adminlogin);

export { adminrouter };
