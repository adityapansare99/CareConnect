import express from 'express'
import { Router } from "express";
import{getalldoctors,logindoctor} from '../controllers/doctor.controller.js'

const doctorsrouter = Router();

doctorsrouter.route("/getalldoctors").get(getalldoctors);
doctorsrouter.route("/login").post(logindoctor);

export{doctorsrouter}