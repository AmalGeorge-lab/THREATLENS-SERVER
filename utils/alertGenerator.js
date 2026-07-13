import Alert from "../models/Alert.js";

const bruteAttackTypes = ["Classical Brute Force Attack","Root Account Brute Force Attack","Brute Force Account Success","Root Brute Force Account Success"];
const distributedAttackTypes = ["Distributed Brute Force Attack","Root Account Distributed Brute Force Attack","Distributed Brute Force Attack Success","Root Account Distributed Brute Force Attack Success"];
const passwordSpraying = "Password Spraying Attack";
const userEnumeration = "Username Enumeration Attack";



const bruteAttackAlertGenerator = async (alert,file_id)=> {
  if (alert.relatedAlerts){
    const relatedAlertsIDs = await Promise.all(
      alert.relatedAlerts.map(async (a)=>{
        const newAlert = await Alert.create({
          alert_id : a.alert_id ,
          fileUpload_id : file_id ,
          alert_type : a.alert_type ,
          rule_id : a.rule_id ,
          rule_name : a.rule_name ,
          severity : a.severity ,
          risk_score : a.risk_score ,
          target_user : a.user ,
          status : a.status ,
          source_ip : a.source_ip ,
          host : a.host ,
          service : a.service ,
          pid : a.pid ,
          port : a.port ,
          protocol : a.protocol ,
          mitre_technique : a.mitre_technique ,
          mitre_name : a.mitre_name ,
          failed_attempts : a.failed_attempts ,
          starting_time : a.starting_time ,
          ending_time : a.ending_time ,
          created_at : a.created_at
        });
        return newAlert._id;
      })
    )
    await Alert.create(
      {
        alert_id : alert.alert_id ,
        fileUpload_id : file_id ,
        alert_type : alert.alert_type ,
        rule_id : alert.rule_id ,
        rule_name : alert.rule_name ,
        severity : alert.severity ,
        risk_score : alert.risk_score ,
        target_user : alert.target_user ,
        relatedAlerts : relatedAlertsIDs ,
        status : alert.status ,
        source_ip : alert.source_ip ,
        host : alert.host ,
        service : alert.service ,
        pid : alert.pid ,
        port : alert.port ,
        protocol : alert.protocol ,
        mitre_technique : alert.mitre_technique ,
        mitre_name : alert.mitre_name ,
        failed_attempts : alert.failed_attempts ,
        starting_time : alert.starting_time ,
        ending_time : alert.ending_time ,
        created_at : alert.created_at
      }
    )
  }else{
    await Alert.create(
      {
        alert_id : alert.alert_id ,
        fileUpload_id : file_id ,
        alert_type : alert.alert_type ,
        rule_id : alert.rule_id ,
        rule_name : alert.rule_name ,
        severity : alert.severity ,
        risk_score : alert.risk_score ,
        target_user : alert.user ,
        status : alert.status ,
        source_ip : alert.source_ip ,
        host : alert.host ,
        service : alert.service ,
        pid : alert.pid ,
        port : alert.port ,
        protocol : alert.protocol ,
        mitre_technique : alert.mitre_technique ,
        mitre_name : alert.mitre_name ,
        failed_attempts : alert.failed_attempts ,
        starting_time : alert.starting_time ,
        ending_time : alert.ending_time ,
        created_at : alert.created_at
      }
    )
  }
}



const distributedAttackAlertGenerator = async (alert,file_id)=> {
  if(alert.relatedAlerts){
    const relatedAlertsIDs = await Promise.all(
      alert.relatedAlerts.map(async(a)=>{
        const newAlert = await Alert.create({
          target_user : a.user ,
          fileUpload_id : file_id ,
          alert_id : a.alert_id ,
          alert_type : a.alert_type ,
          rule_id : a.rule_id ,
          rule_name : a.rule_name ,
          severity : a.severity ,
          risk_score : a.risk_score ,
          status : a.status ,
          host : a.host ,
          service : a.service ,
          pid : a.pid ,
          port : a.port ,
          protocol : a.protocol ,
          mitre_technique : a.mitre_technique ,
          mitre_name : a.mitre_name ,
          failed_attempts : a.failed_attempts ,
          created_at : a.created_at ,
          IPs : a.IPs ,
          starting_time : a.starting_time ,
          ending_time : a.ending_time
        });
        return newAlert._id;
      })
    )
    await Alert.create(
      {
        alert_id : alert.alert_id ,
        alert_type : alert.alert_type ,
        fileUpload_id : file_id ,
        rule_id : alert.rule_id ,
        rule_name : alert.rule_name ,
        successIP : alert.success_IP ,
        severity : alert.severity ,
        risk_score : alert.risk_score ,
        target_user : alert.target_user ,
        failed_attempts : alert.failed_attempts ,
        IPs : alert.IPs ,
        host : alert.host ,
        service : alert.service ,
        pid : alert.pid ,
        port : alert.port ,
        protocol : alert.protocol ,
        status : alert.status ,
        mitre_technique : alert.mitre_technique ,
        mitre_name : alert.mitre_name ,
        relatedAlerts : relatedAlertsIDs ,
        created_at : alert.created_at ,
        starting_time : alert.starting_time ,
        ending_time : alert.ending_time
      }
    )
  }else{
    await Alert.create(
      {
        target_user : alert.user ,
        fileUpload_id : file_id ,
        alert_id : alert.alert_id ,
        alert_type : alert.alert_type ,
        rule_id : alert.rule_id ,
        rule_name : alert.rule_name ,
        severity : alert.severity ,
        risk_score : alert.risk_score ,
        status : alert.status ,
        host : alert.host ,
        service : alert.service ,
        pid : alert.pid ,
        port : alert.port ,
        protocol : alert.protocol ,
        mitre_technique : alert.mitre_technique ,
        mitre_name : alert.mitre_name ,
        failed_attempts : alert.failed_attempts ,
        created_at : alert.created_at ,
        IPs : alert.IPs ,
        starting_time : alert.starting_time ,
        ending_time : alert.ending_time
      }
    )
  }
}





const passwordSprayingAlertGenerator = async (alert,file_id)=> {
  await Alert.create(
    {
      alert_id : alert.alert_id ,
      alert_type : alert.alert_type ,
      fileUpload_id : file_id ,
      rule_id : alert.rule_id ,
      rule_name : alert.rule_name ,
      host : alert.host ,
      service : alert.service ,
      pid : alert.pid ,
      port : alert.port ,
      protocol : alert.protocol ,
      severity : alert.severity ,
      risk_score : alert.risk_score ,
      status : alert.status ,
      source_ip : alert.source_ip ,
      mitre_technique : alert.mitre_technique ,
      mitre_name : alert.mitre_name ,
      created_at : alert.created_at ,
      failed_attempts : alert.failed_attempts ,
      users : alert.users ,
      starting_time : alert.starting_time ,
      ending_time : alert.ending_time
    }
  )
}





const userEnumerationAlertGenerator = async (alert,file_id)=> {
  await Alert.create({
    alert_id : alert.alert_id ,
    alert_type : alert.alert_type ,
    fileUpload_id : file_id ,
    rule_id : alert.rule_id ,
    rule_name : alert.rule_name ,
    source_ip : alert.source_ip ,
    host : alert.host ,
    service : alert.service ,
    pid : alert.pid ,
    port : alert.port ,
    protocol : alert.protocol ,
    severity : alert.severity ,
    risk_score : alert.risk_score ,
    failed_attempts : alert.failed_attempts ,
    users : alert.users ,
    status : alert.status ,
    mitre_technique : alert.mitre_technique ,
    mitre_name : alert.mitre_name ,
    created_at : alert.created_at ,
    starting_time : alert.starting_time ,
    ending_time : alert.ending_time
  })
}






export const alertGenerator = async (alerts, file_id) => {
  await Promise.all(
    alerts.map((alert) => {
      if (bruteAttackTypes.includes(alert.alert_type)) {
        return bruteAttackAlertGenerator(alert, file_id);
      }
      if (distributedAttackTypes.includes(alert.alert_type)) {
        return distributedAttackAlertGenerator(alert, file_id);
      }
      if (alert.alert_type === passwordSpraying) {
        return passwordSprayingAlertGenerator(alert, file_id);
      }
      if (alert.alert_type === userEnumeration) {
        return userEnumerationAlertGenerator(alert, file_id);
      }
      return Promise.resolve();
    })
  );
};