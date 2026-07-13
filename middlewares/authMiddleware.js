import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const protect = async (req, res, next) => {
  const token = req.cookies.sessionId;
  if(!token){
    return next(new AppError("Not authenticated", 401));
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      res.clearCookie("sessionId" , {
        httpOnly : true ,
        secure : process.env.NODE_ENV === "production" ,
        sameSite : "lax" ,
        path : "/"
      });
      return next(new AppError("Session Expired", 401));
    }
    req.user = decoded.id;
    next();
  });
};

export default protect;