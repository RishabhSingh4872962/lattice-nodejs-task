
import express from "express";
import { asyncErrorHandler } from "../../Errors/aysncErrorHandler.js";
import { psyLogin, psyLogout, registerPaitent, registerPsy, removePatient } from "../../Controllers/psyController/psy.js";
import multer from "multer";
import { isUserLogged } from "../../Middlewares/isUserLogged.js";


const upload=multer({
    dest:"/patient_photo"
})

const psyRouter=express.Router();

psyRouter.post("/register",asyncErrorHandler(registerPsy));
psyRouter.get("/login",asyncErrorHandler(psyLogin));
psyRouter.post("/logout",isUserLogged,asyncErrorHandler(psyLogout));

psyRouter.post("/add",isUserLogged,upload.single("photo"),asyncErrorHandler(registerPaitent));
psyRouter.delete("/:id",isUserLogged,asyncErrorHandler(removePatient));
export default psyRouter