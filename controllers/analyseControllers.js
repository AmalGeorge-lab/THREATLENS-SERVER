import FileUpload from "../models/FileUpload.js";
import { alertGenerator } from "../utils/alertGenerator.js";
import AppError from "../utils/AppError.js";
import { severityCalculator } from "../utils/severityMap.js";









const analyseControllers = {
  analyseAPI : async (request,response,next)=> {
    const file = request.file;
    if (!request.file) {
      return next(new AppError("Please upload a log file.", 400));
    }
    const userId = request.user;
    const logContents = file.buffer.toString("utf8");
    try {
      const result = await fetch(process.env.ANALYSE_URL, { method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.PYTHON_API_KEY,
        },
        body: JSON.stringify({ logs: logContents}),
      });

      const alertsInfo = await result.json();
      const severityMap = severityCalculator(alertsInfo.alerts);

      const newFile = await FileUpload.create({
        fileName : file.originalname ,
        uploadedBy : userId ,
        fileSize : file.size ,
        logType : "auth" ,
        parsedLogs : alertsInfo.parsedLogs ,
        alertsGenerated : {
          low : severityMap.LOW , 
          medium : severityMap.MEDIUM , 
          high : severityMap.HIGH , 
          critical : severityMap.CRITICAL
        }
      });
      await alertGenerator(alertsInfo.alerts , newFile._id);
      response.status(200).json({_id : newFile._id});
    } catch (error) {
      return next(new AppError("Something went wrong. Try again later.", 500));
    }
  }
}

export default analyseControllers;