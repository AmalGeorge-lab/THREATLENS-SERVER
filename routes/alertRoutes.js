import express from "express";
import protect from "../middlewares/authMiddleware.js";
import catchAsync from "../utils/catchAsync.js";
import linuxAlertControllers from "../controllers/linuxAlertControllers.js";
import webAlertControllers from "../controllers/webAlertControllers.js";
import firewallAlertControllers from "../controllers/firewallAlertControllers.js";


const alertRouter = express.Router();


alertRouter.get("/linux/alerts" , protect , catchAsync(linuxAlertControllers.alertsAPI));
alertRouter.get("/linux/filteredAlerts" , protect , catchAsync(linuxAlertControllers.filteredAlertsAPI));
alertRouter.patch("/linux/status" , protect , catchAsync(linuxAlertControllers.updateStatusAPI));
alertRouter.get("/linux/:alertId" , protect , catchAsync(linuxAlertControllers.alertAPI));
alertRouter.delete("/linux/delete/:fileId" , protect , catchAsync(linuxAlertControllers.deleteLogAPI));




alertRouter.get("/web/alerts" , protect , catchAsync(webAlertControllers.alertsAPI));
alertRouter.get("/web/filteredAlerts" , protect , catchAsync(webAlertControllers.filteredAlertsAPI));
alertRouter.patch("/web/status" , protect , catchAsync(webAlertControllers.updateStatusAPI));
alertRouter.get("/web/:alertId" , protect , catchAsync(webAlertControllers.alertAPI));
alertRouter.delete("/web/delete/:fileId" , protect , catchAsync(webAlertControllers.deleteLogAPI));





alertRouter.get("/firewall/alerts" , protect , catchAsync(firewallAlertControllers.alertsAPI));
alertRouter.get("/firewall/filteredAlerts" , protect , catchAsync(firewallAlertControllers.filteredAlertsAPI));
alertRouter.patch("/firewall/status" , protect , catchAsync(firewallAlertControllers.updateStatusAPI));
alertRouter.get("/firewall/:alertId" , protect , catchAsync(firewallAlertControllers.alertAPI));
alertRouter.delete("/firewall/delete/:fileId" , protect , catchAsync(firewallAlertControllers.deleteLogAPI));



export default alertRouter;