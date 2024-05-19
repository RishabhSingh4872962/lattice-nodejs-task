import createHttpError from "http-errors";
import mongoose, { Types } from "mongoose";

import { Hospital } from "../../Models/hospital.model.js";
import { Psychiatrist } from "../../Models/psychiatrist.model.js";
import { Patient } from "../../Models/patient.model.js";
export const getHospital = async (req, res, next) => {
  const { id } = req.body;

  if (!id || !mongoose.isValidObjectId(id)) {
    return next(createHttpError(400, "Enter the valid credensials"));
  }
  const hospital = await Hospital.findById({ _id: id });
  if (!hospital) {
    return res.status(404).send({
      success: false,
      msg: "Hospital not found with this credensials",
    });
  }
  const psychiatrist = await Psychiatrist.find({
    hospital: hospital._id,
  });

  const psychiatristArr =await Promise.all(psychiatrist.map( async(psy) => {
    return {
      id:psy._id,name:psy.name,
      Patient:(await  Patient.find({ psychiatrists: { $in: psy._id } })).length,
    };
  }));

  const totalPatient = await Patient.find({
    psychiatrists: { $in: psychiatrist },
  });
  return res.status(200).send({
    success: true,
    msg:"One Patient can assigned more than 1 Psychiatrists",
    hospital: {
      hospitalName: hospital.name,
      totalPsychiatrist: psychiatrist.length,
      totalPatient: totalPatient.length,
      psychiatrist:psychiatristArr,
    },
  });
};

export const registerHospital = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(createHttpError(400, "Enter the valid credensials"));
  }

  const existHospital = await Hospital.findOne({
    name,
  });
  if (existHospital) {
    return next(createHttpError(400, "Hospital already Exist"));
  }
  const hospital = new Hospital({
    name,
  });

  await hospital.save();
  return res
    .status(201)
    .send({ success: true, msg: "Hospital Register successfully" });
};
