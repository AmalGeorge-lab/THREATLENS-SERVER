import express from "express";
import analyseControllers from "../controllers/analyseControllers.js";
import upload from "../config/multer.js";
import protect from "../middlewares/authMiddleware.js";
import catchAsync from "../utils/catchAsync.js";


const analyseRouter = express.Router();


analyseRouter.post("/analyse", protect , upload.single("logFile") , catchAsync(analyseControllers.analyseAPI));


export default analyseRouter;