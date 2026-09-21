import mongoose from "mongoose";

const FirewallAlertSchema = new mongoose.Schema({
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
  source_ip : {
    type : String ,
    reuqired : true
  } ,
  destination_ips : [{
    type : String ,
    required : true
  }] ,
  destination_ports : [{
    type : Number ,
    default : null
  }] ,
  source_ports : [{
    type : Number ,
    default : null
  }] ,
  accepted_destination_ports : [{
    type : Number ,
    default : null
  }] ,
  drop_count : {
    type : Number ,
    default : null
  } ,
  actions : [{
    type : String ,
    default : null
  }] ,
  host : {
    type : String ,
    required : true
  } ,
  service : {
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

export default mongoose.model("FirewallAlert",FirewallAlertSchema);