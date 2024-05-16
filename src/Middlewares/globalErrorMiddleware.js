import { config } from "../Config/config";


export const globalErrorHandler=function(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const errorStack = config.env === "Development" ? (err?.errors) ? err?.errors: err.stack  : err.message ||  "Internal server Error";
  
    
    return res.status(statusCode).send({ message: err.message, errorStack });
  }