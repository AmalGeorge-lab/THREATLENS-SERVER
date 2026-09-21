import mongoose from "mongoose";


const LinuxAlertSchema = new mongoose.Schema({
  alert_id : {
    type : String ,
    required : true ,
  } ,
  fileUpload_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FileUpload",
    required: true,
  } ,
  alert_type : {
    type : String ,
    required : true
  } ,
  rule_id : {
    type : String ,
    required : true
  } ,
  rule_name : {
    type : String ,
    required : true
  } ,
  severity : {
    type : String ,
    enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    required : true
  } ,
  risk_score : {
    type : Number ,
    required : true
  } ,
  target_user : {
    type : String ,
    default : null
  } ,
  relatedAlerts : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "LinuxAlert"
  }] ,
  status : {
    type : String ,
    enum : ["OPEN","CLOSED"] ,
    required : true
  } ,
  source_ip : {
    type : String ,
    default : null
  } ,
  users : {
    type : [String] ,
    default : []
  } ,
  IPs : {
    type : [String] ,
    default : []
  } ,
  successIP : {
    type : String ,
    default : null
  } ,
  host : {
    type : String ,
    required : true
  } ,
  service : {
    type : String ,
    required : true
  } ,
  pid : {
    type : Number ,
    required : true
  } ,
  port : {
    type : Number ,
    required : true
  } ,
  protocol : {
    type : String ,
    required : true
  } ,
  mitre_technique : {
    type : String ,
    required : true
  } ,
  mitre_name : {
    type : String ,
    required : true
  } ,
  failed_attempts : {
    type : Number ,
    required : true
  } ,
  starting_time : {
    type : Date ,
    required : true
  } ,
  ending_time : {
    type : Date ,
    required : true
  } ,
  created_at : {
    type : Date ,
    required : true
  }
});


export default mongoose.model("LinuxAlert",LinuxAlertSchema);