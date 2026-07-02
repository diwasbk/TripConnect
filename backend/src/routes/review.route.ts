import { Router } from "express";
import ReviewController from "../controllers/review.controller";
import { jwtAuthMiddleware } from "../utils/jwt";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { reviewSchema } from "../types/review.type";

const reviewRouter = Router();
const reviewController = new ReviewController();

reviewRouter.get("/all", reviewController.getAllReviews);
reviewRouter.get("/all/:packageId", reviewController.getAllReviewsByPackageId);
reviewRouter.get("/average-rating/:packageId", reviewController.getAverageRatingByPackageId);
reviewRouter.patch("/give-review/:packageId", jwtAuthMiddleware, schemaValidateMiddleware(reviewSchema.pick({ review: true })), reviewController.giveReviewToPackage);
reviewRouter.patch("/give-rating/:packageId", jwtAuthMiddleware, schemaValidateMiddleware(reviewSchema.pick({ rating: true })), reviewController.giveRatingToPackage);
reviewRouter.delete("/delete/:reviewId", reviewController.deleteReviewByReviewId);

export default reviewRouter;