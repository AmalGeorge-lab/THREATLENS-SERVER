export const severityCalculator = (alerts)=> {
  const severityMap = { "CRITICAL" : 0 , "HIGH" : 0 , "MEDIUM" : 0 , "LOW" : 0 }
  alerts.forEach((alert) => {
    severityMap[alert.severity] ++;
    if(alert.relatedAlerts?.length){
      alert.relatedAlerts.forEach((a)=>{
        severityMap[a.severity] ++;
      })
    }
  });
  return severityMap;
}