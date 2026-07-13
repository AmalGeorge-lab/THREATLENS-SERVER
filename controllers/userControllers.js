import User from "../models/User.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import generateToken from "../config/jwt.js";
import FileUpload from "../models/FileUpload.js";





const userControllers = {
  registerAPI : async (request,response,next)=> {
    const { username , email , password } = request.body;
    if(!username || !email || !password){
      return next(new AppError("Please fill all the fields", 400));
    }
    const userExists = await User.findOne({ email });
    if(userExists){
			return next(new AppError("User already exists", 400));
		}
    const hashSalt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password , hashSalt);
    await User.create({ username , email , password : hashedPassword });
    response.status(201).json({status : "success" });
  } ,
  loginAPI : async (request,response,next) => {
    const { email , password } = request.body;
		if(!email || !password){
			return next(new AppError("Please fill all the fields", 400));
		}
		const user = await User.findOne({ email });
		if(!user){
			return next(new AppError("Invalid credentials", 401));
		}
    const comparePassword = await bcrypt.compare(password , user.password);
		if(!comparePassword){
			return next(new AppError("Invalid credentials", 401));
		}
    const accessToken = generateToken(user._id);
    response.cookie("sessionId" , accessToken , {
			httpOnly : true ,
			secure : process.env.NODE_ENV === "production" ,
			sameSite : "none" ,
			maxAge : 1 * 24 * 60 * 60 * 1000 ,
			path : "/"
		});
    response.status(200).json({ userId : user._id });
  } ,
	dashboardAPI : async (request,response,next)=>{
		const userId = request.user;
		const userFiles = await FileUpload.find({ uploadedBy : userId });
		response.status(200).json(userFiles);
	} ,
  logOutAPI : (request,response)=>{
    response.clearCookie("sessionId" , {
			httpOnly : true ,
			secure : process.env.NODE_ENV === "production" ,
			sameSite : "none" ,
			path : "/"
		});
		response.status(200).json({status : "Logout success"});
  }
}


export default userControllers;