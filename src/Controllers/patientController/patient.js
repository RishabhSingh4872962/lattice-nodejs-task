import { Patient } from "../../Models/patient.model.js";
import createHttpError from "http-errors";

import mongoose from "mongoose";

const getPaitent = async (req, res, next) => {
  const { id } = req.params;
  if (!id || !mongoose.isValidObjectId(id)) {
    return sendErrorResponse(next, 400, "Enter the valid Credensials");
  }

  const patient = await Patient.findOne({ _id: id });

  const psy = patient.psychiatrists.find((psyId) => {
    return psyId._id.toString() == req.user.id;
  });


  if (!patient || !psy) {
    return next(createHttpError(404, "Paitent not found"));
  }
  return res.status(200).send({ success: true, patient });
};

export { getPaitent };

function sendErrorResponse(next, statusCode, msg) {
  return next(createHttpError(statusCode, msg));
}
