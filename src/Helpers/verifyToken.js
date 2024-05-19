import { config } from "../Config/config.js";
import jwt from "jsonwebtoken"
export default function verifyToken(token){

    if (config?.jwtSecret) {
  
      return jwt.verify(token, config?.jwtSecret, { complete: true })
        .payload ;
    }
    return null;
  };