import { Router } from "express";
import {registeruser,loginuser,getprofile,updateuser,bookappointment,getappointments,cancelappointment} from "../controllers/user.controller.js";
import {authuser} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const userrouter=Router();

userrouter.route("/register").post(registeruser);
userrouter.route("/login").post(loginuser);
userrouter.route("/user-profile").get(authuser,getprofile);
userrouter.route("/update-user").post(authuser,upload.single("image"),updateuser);
userrouter.route("/book-appointment").post(authuser,bookappointment);
userrouter.route("/get-appointments").get(authuser,getappointments);
userrouter.route("/cancel-appointment").post(authuser,cancelappointment);

export {userrouter}