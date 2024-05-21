import express from "express";
import { asyncErrorHandler } from "../../Errors/aysncErrorHandler.js";
import {
  registerPaitent,
  registerPsy,
  removePatient,
} from "../../Controllers/psyController/psy.js";
import multer from "multer";
import { isUserLogged } from "../../Middlewares/isUserLogged.js";
import createHttpError from "http-errors";
import {
  loginValidation,
  patientRegisterValidations,
} from "../../Validations/authValidation.js";

const upload = multer({
  dest: "/patient_photo",
});

const psyRouter = express.Router();

function checkRole(req, res, next) {
  let { role } = req.body;

  if (!role) {
    return next(createHttpError(400, "Need a Role Access Credensials"));
  }

  if (role == "psy") {
    next();
  } else {
    return next(createHttpError(400, "Enter the valid Credensials"));
  }
}

psyRouter.post(
  "/register",
  checkRole,
  loginValidation,
  asyncErrorHandler(registerPsy)
);

psyRouter.post(
  "/add",
  upload.single("photo"),
  patientRegisterValidations,
  isUserLogged,
  asyncErrorHandler(registerPaitent)
);
psyRouter.delete("/:id", isUserLogged, asyncErrorHandler(removePatient));
export default psyRouter;
