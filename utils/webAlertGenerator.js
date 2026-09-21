import WebAlert from "../models/WebAlert.js";


const directoryEnumerationAlertGenerator = async (alert , file_id) => {
  await WebAlert.create({
    alert_id : alert.alert_id ,
    fileUpload_id : file_id ,
    alert_type : alert.alert_type ,
    rule_id : alert.rule_id ,
    rule_name : alert.rule_name ,
    severity : alert.severity ,
    risk_score : alert.risk_score ,
    status : alert.status ,
    status_code : alert.status_code ,
    source_ip : alert.source_ip ,
    logs : alert.logs ,
    request_count : alert.request_count ,
    mitre_technique : alert.mitre_technique ,
    mitre_name : alert.mitre_name ,
    starting_time : alert.starting_time ,
    ending_time : alert.ending_time ,
    created_at : alert.created_at
  });
}


const sensitiveFileAlertGenerator = async (alert , file_id) => {
  await WebAlert.create({
    alert_id : alert.alert_id ,
    fileUpload_id : file_id ,
    alert_type : alert.alert_type ,
    rule_id : alert.rule_id ,
    rule_name : alert.rule_name ,
    risk_score : alert.risk_score ,
    severity : alert.severity ,
    request_uri : alert.request_uri ,
    status : alert.status ,
    source_ip : alert.source_ip ,
    starting_time : alert.timestamp ,
    ending_time : alert.timestamp ,
    http_method : alert.http_method ,
    http_version : alert.http_version ,
    status_code : alert.status_code ,
    response_size : alert.response_size ,
    referrer : alert.referrer ,
    user_agent : alert.user_agent ,
    mitre_technique : alert.mitre_technique ,
    mitre_name : alert.mitre_name ,
    created_at : alert.created_at
  });
}


const sqlAlertGenerator = async (alert , file_id) => {
  await WebAlert.create({
    alert_id : alert.alert_id ,
    fileUpload_id : file_id ,
    alert_type : alert.alert_type ,
    rule_id : alert.rule_id ,
    rule_name : alert.rule_name ,
    risk_score : alert.risk_score ,
    severity : alert.severity ,
    request_uri : alert.request_uri ,
    status : alert.status ,
    source_ip : alert.source_ip ,
    starting_time : alert.timestamp ,
    ending_time : alert.timestamp ,
    http_method : alert.http_method ,
    http_version : alert.http_version ,
    status_code : alert.status_code ,
    response_size : alert.response_size ,
    referrer : alert.referrer ,
    user_agent : alert.user_agent ,
    mitre_technique : alert.mitre_technique ,
    mitre_name : alert.mitre_name ,
    created_at : alert.created_at
  })
}


const webShellAlertGenerator = async (alert , file_id) => {
  await WebAlert.create({
    alert_id : alert.alert_id ,
    fileUpload_id : file_id ,
    alert_type : alert.alert_type ,
    rule_id : alert.rule_id ,
    rule_name : alert.rule_name ,
    risk_score : alert.risk_score ,
    severity : alert.severity ,
    request_uri : alert.request_uri ,
    status : alert.status ,
    source_ip : alert.source_ip ,
    starting_time : alert.timestamp ,
    ending_time : alert.timestamp ,
    http_method : alert.http_method ,
    http_version : alert.http_version ,
    status_code : alert.status_code ,
    response_size : alert.response_size ,
    referrer : alert.referrer ,
    user_agent : alert.user_agent ,
    mitre_technique : alert.mitre_technique ,
    mitre_name : alert.mitre_name ,
    created_at : alert.created_at
  })
}



export const webAlertGenerator = async (alerts , file_id) => {
  await Promise.all(
    alerts.map(alert => {
      if (alert.alert_type === "Directory Enumeration"){
        return directoryEnumerationAlertGenerator(alert,file_id);
      }
      if (alert.alert_type === "Sensitive File Access"){
        return sensitiveFileAlertGenerator(alert , file_id);
      }
      if (alert.alert_type === "SQL Injection Attempt"){
        return sqlAlertGenerator(alert , file_id);
      }
      if (alert.alert_type === "Web Shell Access Detection"){
        return webShellAlertGenerator(alert , file_id);
      }
    })
  )
}