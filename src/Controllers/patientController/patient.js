import { Patient } from "../../Models/patient.model.js";
import createHttpError from "http-errors";

import bcrypt from "bcrypt";
import { generateToken } from "../../Helpers/generateToken.js";

const getPaitent = async (req, res, next) => {
  const id = req.params;
  if (!id) {
    return next(createHttpError(400, "Enter the valid id"));
  }
  const patient = await Patient.findOne({ _id: id });
  if (!patient) {
    return next(createHttpError(404, "Paitent not found"));
  }
  return res.status(200).send({ success: true, patient });
};

const loginPatient = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "Enter the valid credensials"));
  }
  const patient = await Patient.findOne({ email });
  if (!patient) {
    return next(createHttpError(404, "Enter the valid credensials"));
  }
  if (!bcrypt.compare(password, patient.password)) {
    return next(createHttpError(400, "Enter the valid Credensials"));
  }
  const jwtToken=await generateToken({id: patient._id,email:patient.email});

  return res.status(200).cookie("token",jwtToken,{
    maxAge:3*24*60*60*1000, httpOnly: true
  })
};

const logoutPatient=async(req,res,next)=>{
  return res.status(200).clearCookie("token").send({success:true,msg:"Paitent logout Successfully"})
}


export {getPaitent,loginPatient,logoutPatient}
