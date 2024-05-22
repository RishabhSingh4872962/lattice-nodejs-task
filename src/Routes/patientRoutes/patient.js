
import express from "express";
import { asyncErrorHandler } from "../../Errors/aysncErrorHandler.js";
import { getPaitent } from "../../Controllers/patientController/patient.js";
import { isUserLogged } from "../../Middlewares/isUserLogged.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";


const patientRouter=express.Router();


function checkRole(req,res,next) {
    const {id}=req.params;
  if (!id || !mongoose.isValidObjectId(id)) {
    return next(createHttpError(400, "Enter the valid ID"));
  }

    if (req.user.role=="patient" && id!=req.user.id) {
        return next(createHttpError(400,"Access Denied"))
    }
    

    next()
}

patientRouter.get("/:id",isUserLogged,checkRole,asyncErrorHandler(getPaitent));

export default patientRouter