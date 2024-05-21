import { Patient } from "../../Models/patient.model.js";
import createHttpError from "http-errors";

import mongoose from "mongoose";

const getPaitent = async (req, res, next) => {
  const {id} = req.params;
  if (!id || !mongoose.isValidObjectId(id)) {
   return sendErrorResponse(next,400,"Enter the valid Credensials")
  }console.log(req.user);

  // todo
  const patient = await Patient.findOne({ _id: id ,psychiatrists:{$in:req.user.id}});
  if (!patient) {
    return next(createHttpError(404, "Paitent not found"));
  }
  return res.status(200).send({ success: true, patient });
};




export {getPaitent}


function sendErrorResponse(next,statusCode,msg) {
  return next(createHttpError(statusCode,msg))
}