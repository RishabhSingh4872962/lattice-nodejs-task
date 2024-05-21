
import express from "express";
import { asyncErrorHandler } from "../../Errors/aysncErrorHandler.js";
import { getHospital, registerHospital } from "../../Controllers/hospitalController/hospital.js";


const hospitalRouter=express.Router();


hospitalRouter.get("/",asyncErrorHandler(getHospital));
hospitalRouter.post("/register",asyncErrorHandler(registerHospital));//1st check done 

export default hospitalRouter