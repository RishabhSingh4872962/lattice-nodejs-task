import createHttpError from "http-errors";
import verifyToken from "../Helpers/verifyToken.js";
export const isUserLogged = async (req, res, next) => {
  const token = req.cookies?.token;
  // console.log(req.cookie);
  if (!token) {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return next(createHttpError(400, "Make a login,Session expired"));
  }

  const userPayload = await verifyToken(token);
  if (!userPayload) {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return next(createHttpError(400, "Make a login,Session expired"));
  }

  // let { role } = req.body;
  // if (!role) {
  //   return next(createHttpError(400, "Need a Role Access"));
  // }
  // role = role.toLowerCase();
  // if (role != userPayload?.role  ) {
  //   res.clearCookie("token");
  //   return next(createHttpError(400, "Access Denied"));
  // }

  req.user = userPayload;
  next();
};
