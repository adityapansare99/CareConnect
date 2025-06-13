import express from 'express'
import { Router } from "express";
import{getalldoctors} from '../controllers/doctor.controller.js'

const doctorsrouter = Router();

doctorsrouter.route("/getalldoctors").get(getalldoctors);

export{doctorsrouter}