import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";


const refreshValidator = (request,response,next)=> {
  const token = request.cookies.sessionId;
  if(!token){
    return next(new AppError("Not authenticated", 401));
  }
  jwt.verify(token , process.env.ACCESS_TOKEN , (err,decoded)=>{
    if (err) {
      if(err.message === "jwt expired" || err.message === "jwt malformed"){
        response.clearCookie("sessionId" , {
          httpOnly : true ,
          secure : process.env.NODE_ENV === "production" ,
          sameSite : "lax" ,
          path : "/"
        });
      }
      return next(new AppError(err.message, 401));
    }
    response.json({ isValid : true });
  });
};


export default refreshValidator;