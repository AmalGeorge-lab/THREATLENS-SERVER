import express from "express";
import alertControllers from "../controllers/alertControllers.js";
import protect from "../middlewares/authMiddleware.js";
import catchAsync from "../utils/catchAsync.js";


const alertRouter = express.Router();


alertRouter.get("/alerts" , protect , catchAsync(alertControllers.alertsAPI));
alertRouter.get("/filteredAlerts" , protect , catchAsync(alertControllers.filteredAlertsAPI));
alertRouter.patch("/status" , protect , catchAsync(alertControllers.updateStatusAPI));
alertRouter.get("/:alertId" , protect , catchAsync(alertControllers.alertAPI));
alertRouter.delete("/delete/:fileId" , protect , catchAsync(alertControllers.deleteLogAPI));




export default alertRouter;