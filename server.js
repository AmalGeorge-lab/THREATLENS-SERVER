import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRoutes.js";
import analyseRouter from "./routes/analyseRoutes.js";
import alertRouter from "./routes/alertRoutes.js";


dotenv.config();
const app = express();

app.set("trust proxy", 1);

const port = process.env.PORT;
const corsOptions = { origin : [`${process.env.CLIENT_URL}`] , credentials : true };
const limiter = rateLimit({windowMs: 15 * 60 * 1000,max: 80 , message : { message : "Too many requests.Try again after 15 min." }});


app.use(helmet());
app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());
app.use(cookieParser());



app.use("/v2/soc/user" , userRouter);
app.use("/v2/soc/analysis",analyseRouter);
app.use("/v2/soc/alert",alertRouter);
app.use(errorHandler);



mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("Database connected");
  app.listen(port, ()=> console.log(`Server running on port ${port}....`));
}).catch((error)=>{
  console.log(`MongoDB error : ${error}`);
});