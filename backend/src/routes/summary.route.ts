import express from "express";
import SummaryController from "../controllers/summary.controller";

const summaryRouter = express.Router();
const summaryController = new SummaryController();

summaryRouter.get("/dashboard", summaryController.getDashboardSummary);
summaryRouter.get("/package", summaryController.getPackageSummary);
summaryRouter.get("/booking", summaryController.getBookingSummary);

export default summaryRouter;