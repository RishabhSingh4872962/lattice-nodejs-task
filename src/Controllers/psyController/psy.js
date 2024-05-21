"use strict";
import createHttpError from "http-errors";
import { Psychiatrist } from "../../Models/psychiatrist.model.js";
import { Patient } from "../../Models/patient.model.js";
import fs from "fs";
import { Hospital } from "../../Models/hospital.model.js";

let psyCashed = {};

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

const registerPaitent = async (req, res, next) => {
  const { name, address, email, phone, password } = req.body;

  const { countryCode, phoneNumber } = JSON.parse(phone);

  const { cachedPatient, expire } = psyCashed[`${email}`] ?? {
    cachedPatient: "",
  };

  if (cachedPatient) {
    if (expire > Date.now()) {
      if (
        cachedPatient._doc.psychiatrists.find((psy) => psy._id == req.user.id)
      ) {
        return res.status(400).send({
          success: false,
          msg: "Psychiatrists already assigned to this Patient",
          backendMessage:"Data is coming from the Cashed Data which is valid only for 15 Min"
        });
      } else {
        cachedPatient._doc.psychiatrists.push(req.user.id);
        await cachedPatient.save({ validateModifiedOnly: true });
        return res.status(201).send({
          success: true,
          msg: "New Psychiatrists has been assigned to this Patient",
          backendMessage:"Data is coming from the Cashed Data which is valid only for 15 Min"
        });
      }
    } else {
      delete psyCashed[`${cachedPatient.email}`];
    }
  }

  if (!req.file.path) {
    return next(createHttpError(400, "Please upload the profile photo"));
  }

  const existPaitent = await Patient.findOne({ email });

  if (existPaitent) {
    psyCashed[`${email}`] = {
      cachedPatient: existPaitent,
      expire: Date.now() + 900000,
    };
    if (existPaitent.psychiatrists.find((psy) => psy._id == req.user.id)) {
      return res.status(400).send({
        success: false,
        msg: "Psychiatrists already assigned to this Patient",
      });
    } else {
      existPaitent.psychiatrists.push(req.user.id);
      await existPaitent.save();
      return res.status(201).send({
        success: true,
        msg: "Psychiatrists has been assigned to this Patient",
      });
    }
  }

  const psychiatrist = await Psychiatrist.findOne({
    email: req.user.email,
    _id: req.user.id,
  });

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
    psychiatrists: [psychiatrist._id],
  });

  await patient.save();

  psyCashed[`${patient.email}`] = {
    cachedPatient: patient,
    expire: Date.now() + 900000,
  };
  return res
    .status(201)
    .send({ success: true, msg: "Patient Registered Successfully" });
};

const removePatient = async (req, res, next) => {
  const { id } = req.params;

  const patient = await Patient.findOneAndDelete({ _id: id });

  delete psyCashed[`${patient.email}`];
  if (!patient) {
    return next(createHttpError(400, "Paitent not Found"));
  }
  return res
    .status(200)
    .send({ success: true, msg: "Paitent removed successfully" });
};

export { registerPsy, registerPaitent, removePatient };
