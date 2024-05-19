
import express from "express";
import { asyncErrorHandler } from "../../Errors/aysncErrorHandler.js";
import { getPaitent, loginPatient, logoutPatient } from "../../Controllers/patientController/patient.js";
import { isUserLogged } from "../../Middlewares/isUserLogged.js";


const patientRouter=express.Router();


patientRouter.get("/:id",isUserLogged,asyncErrorHandler(getPaitent));
patientRouter.post("/login",asyncErrorHandler(loginPatient));
patientRouter.delete("/logout",isUserLogged,asyncErrorHandler(logoutPatient));

export default patientRouter