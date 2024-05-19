"use strict";
import createHttpError from "http-errors";
import { Psychiatrist } from "../../Models/psychiatrist.model.js";
import { Patient } from "../../Models/patient.model.js";
import fs from "fs";
import bcrypt from "bcrypt";
import { Hospital } from "../../Models/hospital.model.js";
import { generateToken } from "../../Helpers/generateToken.js";

const registerPsy = async (req, res, next) => {
  const { name, email, password, hospital } = req.body;
  const existPsychiatrist = await Psychiatrist.findOne({ email });
  if (existPsychiatrist) {
    return next(
      createHttpError(400, "Psychiatrist Already exists with these Credensials")
    );
  }

  const existsHospital = await Hospital.findOne({ name: hospital });
  if (!existsHospital) {
    return next(createHttpError(404, "Hospital not Found"));
  }

  const psychiatrist = new Psychiatrist({
    name,
    email,
    password,
    hospital: existsHospital._id,
  });
  await psychiatrist.save();

  return res
    .status(201)
    .send({ success: true, msg: "Psychiatrist Create Successfully " });
};

const psyLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const psychiatrist = await Psychiatrist.findOne({ email }).select(
    "email password"
  );

  if (!psychiatrist) {
    return next(createHttpError(404, "Enter the valid credensials"));
  }
  if (!(await bcrypt.compare(password, psychiatrist.password))) {
    return next(createHttpError(400, "Enter the valid Credensials"));
  }
  const jwtToken = generateToken({
    id: psychiatrist._id,
    email: psychiatrist.email,
  });

  return res
    .status(200)
    .cookie("token", jwtToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .send({ success: true, msg: "Psy login successfully" });
};

const psyLogout = async (req, res, next) => {
  return res
    .status(200)
    .clearCookie("token")
    .send({ success: true, msg: "Psychiatrist logout successfully" });
};

// Patient Controllers
const registerPaitent = async (req, res, next) => {
  const { name, address, email, phone, password } = req.body;

  const { countryCode, phoneNumber } = JSON.parse(phone);

  if (!req.file.path) {
    return next(createHttpError(400, "Please upload the profile photo"));
  }

  const existPaitent = await Patient.findOne({ email });


  if (existPaitent) {
    if (existPaitent.psychiatrists.find((psy) => psy._id == req.user.id)) {
      return res.status(400).send({
        success: false,
        msg: "Psychiatrists already assigned to this Patient",
      });
    } else {
      existPaitent.psychiatrists.push(req.user.id);
      await existPaitent.save();
     return res.status(201).send({success:true,msg:"Psychiatrists has been assigned to this Patient"})
    }
  }

  const psychiatrist = await Psychiatrist.findOne({
    email: req.user.email,
    _id: req.user.id,
  });
  console.log(psychiatrist);
  if (!psychiatrist) {
    res.clearCookie("token");
    return next(500, "Internal Server Error");
  }

  const data = fs.readFileSync(req.file.path);
  const contentType = req.file.mimetype;

  const patient = new Patient({
    name,
    email,
    password,
    address,
    phone: {
      countryCode,
      phoneNumber,
    },
    photo: {
      data,
      contentType,
    },
    psychiatrists: [ psychiatrist._id],
  });

  console.log(patient);

  await patient.save();
  return res
    .status(201)
    .send({ success: true, msg: "Patient Registered Successfully" });
};

const removePatient = async (req, res, next) => {
  const { id } = req.params;

  const patient = await Patient.findOneAndDelete({ _id: id });
  console.log(patient);
  if (!patient) {
    return next(createHttpError(400, "Paitent not Found"));
  }
  return res
    .status(200)
    .send({ success: true, msg: "Paitent removed successfully" });
};

export { registerPsy, registerPaitent, removePatient, psyLogin, psyLogout };
