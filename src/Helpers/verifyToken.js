import { config } from "../Config/config";

export const verifyToken = (token) => {

    if (config?.jwtSecret) {
  
      return jwt.verify(token, config?.jwtSecret, { complete: true })
        .payload ;
    }
    return null;
  };