import { config } from "../Config/config.js"
import jwt from "jsonwebtoken"
export const generateToken=(userData)=>{
    if (config?.jwtSecret) {
      return  jwt.sign(userData,config.jwtSecret)
    }

    return  null
}
