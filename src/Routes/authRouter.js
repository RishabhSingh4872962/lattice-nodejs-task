import express from "express";
import createHttpError from "http-errors";

import { Patient } from "../Models/patient.model.js";

import bcrypt from "bcrypt";
import { Psychiatrist } from "../Models/psychiatrist.model.js";
import { generateToken } from "../Helpers/generateToken.js";
import { asyncErrorHandler } from "../Errors/aysncErrorHandler.js";
import { isUserLogged } from "../Middlewares/isUserLogged.js";

const authRouter = express.Router();

authRouter.post("/login", asyncErrorHandler(loginRoleBasedUser));
authRouter.post(
  "/logout",
  isUserLogged,
  asyncErrorHandler(logoutRoleBasedUser)
);

function checkRole(role, next) {
  if (!role) {
    return next(createHttpError(400, "Enter the Role for Access"));
  }
  role.toLowerCase();
  return role;
}

async function logoutRoleBasedUser(req, res, next) {
  const role = checkRole(req.user.role, next); // refactor code 

  return res
    .status(200)
    .clearCookie("token")
    .send({
      success: true,
      msg: `${role == "psy" ? "Psychiatrist" : "Patient"} logout successfully`,
    });
}

// refactor user login route
async function userAuth(reqBody, res, next, userModel) {   
  const { email, password, role } = reqBody;
  if (!email || !password || !role) {
    return next(createHttpError(400, "Enter the valid credensials"));
  }
  const user = await userModel.findOne({ email }).select("password email");

  if (!user) {
    return next(createHttpError(404, "Enter the valid credensials"));
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(createHttpError(400, "Enter the valid Credensials"));
  }
  const jwtToken = await generateToken({
    id: user._id,
    email: user.email,
    role,
  });

  return res
    .status(200)
    .cookie("token", jwtToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .send({
      success: true,
      msg: `${role == "psy" ? "Psychiatrist" : "Patient"} login successfully`,
    });
}

async function loginRoleBasedUser(req, res, next) {
  const role = checkRole(req.body.role, next);

  if (role == "patient") {
    await userAuth(req.body, res, next, Patient);
  } else if (role == "psy") {
    await userAuth(req.body, res, next, Psychiatrist);
  } else {
    return next(createHttpError(400, "Invalid Access Role"));
  }
}

export default authRouter;
