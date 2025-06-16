import express from 'express'
import { Router } from "express";
import{getalldoctors,logindoctor,docappointments,completedappointment,cancelappointment,dashboardData} from '../controllers/doctor.controller.js'
import {authdoc} from '../middlewares/auth.middleware.js'

const doctorsrouter = Router();

doctorsrouter.route("/getalldoctors").get(getalldoctors);
doctorsrouter.route("/login").post(logindoctor);
doctorsrouter.route("/doc-appointments").get(authdoc,docappointments);
doctorsrouter.route('/completed-appointment').post(authdoc,completedappointment)
doctorsrouter.route('/cancel-appointment').post(authdoc,cancelappointment)
doctorsrouter.route('/dashboard').get(authdoc,dashboardData)

export{doctorsrouter}