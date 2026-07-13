import express from "express";
import userControllers from "../controllers/userControllers.js";
import catchAsync from "../utils/catchAsync.js";
import rateLimit from "express-rate-limit";
import refreshValidator from "../middlewares/refreshMiddleware.js";
import protect from "../middlewares/authMiddleware.js";


const loginLimiter = rateLimit({ windowMs : 15 * 60 * 1000 , max : 5 , message : { message : "Limit reached.Try again after 15 min." }});
const registerLimiter = rateLimit({ windowMs : 60 * 60 * 1000 , max : 3 , message : { message : "Limit reached.Try again after 1 hr." }});


const userRouter = express.Router();

userRouter.post("/register" , registerLimiter , catchAsync(userControllers.registerAPI));
userRouter.post("/login" , loginLimiter , catchAsync(userControllers.loginAPI));

userRouter.get("/dashboard" , protect , catchAsync(userControllers.dashboardAPI));

userRouter.get("/refresh" , refreshValidator);
userRouter.post("/logout" , userControllers.logOutAPI);



export default userRouter;