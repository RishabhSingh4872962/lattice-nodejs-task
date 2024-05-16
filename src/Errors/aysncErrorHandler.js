export const asyncErrorHandler = (func) => { 
    return async (req, res, next) => {
      // Promise.resolve(func(req,res,next)).catch(next)
      try {
       await   func(req,res,next)
      } catch (error) {
       return next(error)   
      }
    };
  };