import FirewallAlert from "../models/FirewallAlert.js";

const excessiveBlockedAlertGenerator = async (alert,file_id) => {
  await FirewallAlert.create({
    alert_id : alert.alert_id ,
    fileUpload_id : file_id ,
    alert_type : alert.alert_type ,
    rule_id : alert.rule_id ,
    rule_name : alert.rule_name ,
    risk_score : alert.risk_score ,
    severity : alert.severity ,
    source_ip : alert.source_ip ,
    destination_ips : alert.destination_ips ,
    destination_ports : alert.destination_ports ,
    source_ports : alert.source_ports ,
    drop_count : alert.drop_count ,
    status : alert.status ,
    actions : [alert.action] ,
    host : alert.host ,
    service : alert.service ,
    mitre_technique : alert.mitre_technique ,
    mitre_name : alert.mitre_name ,
    starting_time : alert.starting_time ,
    ending_time : alert.ending_time ,
    created_at : alert.created_at
  });
}


const internalNetworkAlertGenerator = async (alert , file_id) => {
  await FirewallAlert.create({
    alert_id : alert.alert_id ,
    fileUpload_id : file_id ,
    alert_type : alert.alert_type ,
    rule_id : alert.rule_id ,
    rule_name : alert.rule_name ,
    risk_score : alert.risk_score ,
    severity : alert.severity ,
    source_ip : alert.source_ip ,
    destination_ips : alert.destination_ips ,
    status : alert.status ,
    host : alert.host ,
    service : alert.service ,
    mitre_technique : alert.mitre_technique ,
    mitre_name : alert.mitre_name ,
    starting_time : alert.starting_time ,
    ending_time : alert.ending_time ,
    created_at : alert.created_at
  });
}


const portScanningAlertGenerator = async (alert , file_id) => {
  await FirewallAlert.create({
    alert_id : alert.alert_id ,
    fileUpload_id : file_id ,
    alert_type : alert.alert_type ,
    rule_id : alert.rule_id ,
    rule_name : alert.rule_name ,
    risk_score : alert.risk_score ,
    severity : alert.severity ,
    source_ip : alert.source_ip ,
    destination_ips : [alert.destination_ip] ,
    destination_ports : alert.destination_ports ,
    source_ports : alert.source_ports ,
    actions : alert.actions ,
    status : alert.status ,
    host : alert.host ,
    service : alert.service ,
    mitre_technique : alert.mitre_technique ,
    mitre_name : alert.mitre_name ,
    starting_time : alert.starting_time ,
    ending_time : alert.ending_time ,
    created_at : alert.created_at ,
    accepted_destination_ports : alert.accepted_destination_ports
  });
}


const sshTargetingAlertGenerator = async (alert , file_id) => {
  await FirewallAlert.create({
    alert_id : alert.alert_id ,
    fileUpload_id : file_id ,
    alert_type : alert.alert_type ,
    rule_id : alert.rule_id ,
    rule_name : alert.rule_name ,
    risk_score : alert.risk_score ,
    severity : alert.severity ,
    source_ip : alert.source_ip ,
    destination_ips : alert.destination_ips ,
    destination_ports : [alert.destination_port] ,
    source_ports : alert.source_ports ,
    drop_count : alert.drop_count ,
    actions : [alert.action] ,
    status : alert.status ,
    host : alert.host ,
    service : alert.service ,
    mitre_technique : alert.mitre_technique ,
    mitre_name : alert.mitre_name ,
    starting_time : alert.starting_time ,
    ending_time : alert.ending_time ,
    created_at : alert.created_at ,
  });
}



export const firewallAlertGenerator = async (alerts , file_id) => {
  await Promise.all(
    alerts.map(alert => {
      if (alert.alert_type === "Excessive Blocked Connections"){
        return excessiveBlockedAlertGenerator(alert,file_id);
      }
      if (alert.alert_type === "Internal Network Access Attempt"){
        return internalNetworkAlertGenerator(alert,file_id);
      }
      if (alert.alert_type === "Port Scanning Detection"){
        return portScanningAlertGenerator(alert,file_id);
      }
      if (alert.alert_type === "SSH Targeting"){
        return sshTargetingAlertGenerator(alert,file_id);
      }
    })
  )
}