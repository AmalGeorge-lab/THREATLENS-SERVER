import FileUpload from "../models/FileUpload.js";
import AppError from "../utils/AppError.js";
import {firewallAlertGenerator} from "../utils/firewallAlertGenerator.js";
import {linuxAlertGenerator} from "../utils/linuxAlertGenerator.js";
import { severityCalculator } from "../utils/severityMap.js";
import {webAlertGenerator} from "../utils/webAlertGenerator.js";









const analyseControllers = {
  analyseAPI : async (request,response,next)=> {
    const file = request.file;
    const fileType = request.body.type;
    if (!request.file) {
      return next(new AppError("Please upload a log file.", 400));
    }
    const userId = request.user;
    const logContents = file.buffer.toString("utf8");
    let url;
    let auth;
    if (fileType == 1){
      url = process.env.LINUX_ANALYSE_URL;
      auth = "auth";
    }else if(fileType == 2){
      url = process.env.WEB_ANALYSE_URL;
      auth = "web";
    }else{
      url = process.env.FIREWALL_ANALYSE_URL;
      auth = "firewall";
    }
    try {
      const result = await fetch(url, { method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.PYTHON_API_KEY,
        },
        body: JSON.stringify({ logs: logContents}),
      });

      const alertsInfo = await result.json();

      if(alertsInfo.alerts.length === 0){
        return response.status(200).json({_id : null});
      }
      const severityMap = severityCalculator(alertsInfo.alerts);

      const newFile = await FileUpload.create({
        fileName : file.originalname ,
        uploadedBy : userId ,
        fileSize : file.size ,
        logType : auth ,
        parsedLogs : alertsInfo.parsedLogs ,
        alertsGenerated : {
          low : severityMap.LOW , 
          medium : severityMap.MEDIUM , 
          high : severityMap.HIGH , 
          critical : severityMap.CRITICAL
        }
      });
      if (fileType == 1) {
        await linuxAlertGenerator(alertsInfo.alerts, newFile._id);
      }

      if (fileType == 2) {
        await webAlertGenerator(alertsInfo.alerts, newFile._id);
      }

      if (fileType == 3) {
        await firewallAlertGenerator(alertsInfo.alerts, newFile._id);
      }
      response.status(200).json({_id : newFile._id});
    } catch (error) {
      return next(new AppError("Something went wrong. Try again later.", 500));
    }
  }
}

export default analyseControllers;