
import express from "express";
import { asyncErrorHandler } from "../../Errors/aysncErrorHandler.js";
import { getPaitent } from "../../Controllers/patientController/patient.js";
import { isUserLogged } from "../../Middlewares/isUserLogged.js";


const patientRouter=express.Router();


patientRouter.get("/:id",isUserLogged,asyncErrorHandler(getPaitent));

export default patientRouter