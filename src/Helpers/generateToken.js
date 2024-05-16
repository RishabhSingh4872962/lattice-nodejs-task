import { config } from "../Config/config"

export const generateToken=(userData)=>{
    if (config?.jwtSecret) {
      return  jwt.sign(userData,config.jwtSecret)
    }

    return  null
}
