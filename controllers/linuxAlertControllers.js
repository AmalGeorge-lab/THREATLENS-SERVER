import FileUpload from "../models/FileUpload.js";
import LinuxAlert from "../models/LinuxAlert.js";





const linuxAlertControllers = {
  alertsAPI : async (request,response,next) => {
    const {fileId} = request.query;
    const userId = request.user;
    if(!fileId){
      return next(new AppError("File ID is missing", 400));
    }
    const file = await FileUpload.findOne({_id : fileId , uploadedBy : userId});
    if(!file){
      return next(new AppError("File not found", 404));
    }
    const alerts = await LinuxAlert.find({ fileUpload_id : fileId }).select("_id alert_id alert_type created_at severity rule_id rule_name status").sort({ created_at : 1 });
    response.status(200).json({file , alerts});
  } ,
  alertAPI : async (request,response,next) => {
    const {alertId} = request.params;
    if(!alertId){
      return next(new AppError("Alert Id is missing", 400));
    }
    const alert = await LinuxAlert.findById(alertId).populate("relatedAlerts");
    if (!alert) {
      return next(new AppError("Alert not found.", 404));
    }
    const file = await FileUpload.findOne({_id: alert.fileUpload_id,uploadedBy: request.user});
    if (!file) {
      return next(new AppError("Alert not found.", 404));
    }
    response.status(200).json(alert);
  } ,
  updateStatusAPI : async (request,response,next) => {
    const {alertId , status} = request.body;
    if(!alertId || !status){
      return next(new AppError("Alert ID and status is missing", 400));
    }
    const allowedStatus = ["OPEN","CLOSED"];
    if (!allowedStatus.includes(status)) {
      return next(new AppError("Invalid status.", 400));
    }
    const alert = await LinuxAlert.findById(alertId).populate({path: "fileUpload_id",select: "uploadedBy"});
    if (!alert ||alert.fileUpload_id.uploadedBy.toString() !== request.user) {
      return next(new AppError("Alert not found.", 404));
    }
    alert.status = status;
    await alert.save();
    response.status(200).json({ message : "status updated" });
  } ,
  filteredAlertsAPI : async (request,response,next) => {
    const { fileId , severity , status , rule , attack } = request.query;
    if(!fileId || !severity || !status || !rule || !attack){
      return next(new AppError("Insufficient data", 400));
    }
    const file = await FileUpload.findOne({_id: fileId,uploadedBy: request.user});
    if (!file) {
      return next(new AppError("File not found.", 404));
    }
    const filterDraft = {fileUpload_id : fileId};
    if(severity !== "*"){
      filterDraft.severity = severity;
    }
    if(status !== "*"){
      filterDraft.status = status;
    }
    if(rule !== "*"){
      filterDraft.rule_id = rule;
    }
    if(attack !== "*"){
      filterDraft.alert_type = attack;
    }
    const filteredAlerts = await LinuxAlert.find(filterDraft).select("_id alert_id alert_type severity status created_at rule_id rule_name");
    response.status(200).json(filteredAlerts);
  } ,
  deleteLogAPI : async (request,response,next) => {
    const {fileId} = request.params;
    if(!fileId){
      return next(new AppError("File ID is missing", 400));
    }
    const file = await FileUpload.findOne({_id: fileId,uploadedBy: request.user});
    if (!file) {
      return next(new AppError("File not found.", 404));
    }
    await LinuxAlert.deleteMany({ fileUpload_id : file._id });
    await FileUpload.findByIdAndDelete(file._id);
    response.status(200).json({ message : "log deleted" });
  } 
}



export default linuxAlertControllers;