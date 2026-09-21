import mongoose from "mongoose";

const WebAlertSchema = new mongoose.Schema({
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
  status : {
    type : String ,
    enum : ["OPEN","CLOSED"] ,
    required : true
  } ,
  status_code : {
    type : Number ,
    required : true
  } ,
  source_ip : {
    type : String ,
    required : true
  } ,
  logs : [{
    type : String ,
    default : null
  }] ,
  request_count : {
    type : Number ,
    default : null
  } ,
  mitre_technique : {
    type : String ,
    required : true
  } ,
  mitre_name : {
    type : String ,
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
  request_uri : {
    type : String ,
    default : null
  } ,
  http_method : {
    type : String ,
    default : null
  } ,
  http_version : {
    type : String ,
    default : null
  } ,
  response_size : {
    type : Number ,
    default : null
  } ,
  referrer : {
    type : String ,
    default : null
  } ,
  user_agent : {
    type : String ,
    default : null
  } ,
  created_at : {
    type : Date ,
    required : true
  }
})

export default mongoose.model("WebAlert",WebAlertSchema);