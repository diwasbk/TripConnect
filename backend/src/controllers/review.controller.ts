import { Request, Response } from "express";
import { PackageModel } from "../models/package.model";
import { ReviewModel } from "../models/review.model";

class ReviewController {
    // Give Review To a Package
    giveReviewToPackage = async (req: Request, res: Response) => {
        try {
            const user = req.user as { id: string };

            const packageExist = await PackageModel.findById(req.params.packageId);

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            }

            const { review } = req.body;

            const result = await ReviewModel.findOneAndUpdate(
                {
                    userId: user.id,
                    packageId: req.params.packageId
                },
                {
                    $set: {
                        review
                    }
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true
                }
            );

            res.status(200).send({
                message: "Review saved successfully",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message
                    ? `Internal server error: ${err.message}`
                    : "Internal server error.",
                success: false
            });
        }
    };

    // Give or Update Rating To a Package
    giveRatingToPackage = async (req: Request, res: Response) => {
        try {
            const user = req.user as { id: string };

            const packageExist = await PackageModel.findById({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const { rating } = req.body;

            const result = await ReviewModel.findOneAndUpdate(
                {
                    userId: user.id,
                    packageId: req.params.packageId
                },
                {
                    $set: { rating }
                },
                {
                    runValidators: true,
                    new: true,
                    upsert: true // creates if not exists
                }
            );

            res.status(200).send({
                message: "Rating saved successfully",
                result: result.rating,
                success: true
            });

        } catch (err: any) {
            console.log(err)
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get All Reviews
    getAllReviews = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;

            const total = await ReviewModel.countDocuments({});

            const result = await ReviewModel.find().skip((page - 1) * limit).limit(limit);;

            await ReviewModel.findOneAndDelete({ reviewId: req.params.reviewId });

            res.status(200).json({
                message: result.length ? "Review fetched successfully" : "Review not found",
                result: result,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: page < Math.ceil(total / limit),
                    hasPreviousPage: page > 1
                },
                success: true
            });

        } catch (err: any) {
            console.log(err)
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get All Reviews of a Package
    getAllReviewsByPackageId = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;

            const packageExist = await PackageModel.findById(req.params.packageId);

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const total = await ReviewModel.countDocuments({
                packageId: req.params.packageId,
                review: { $exists: true, $ne: "" }
            });

            const result = await ReviewModel.find({ packageId: req.params.packageId })
                .populate("userId", "fullName")
                .sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);

            res.status(200).send({
                message: "Reviews fetched successfully.",
                result: result,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: page < Math.ceil(total / limit),
                    hasPreviousPage: page > 1
                },
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get Average Rating of a Package
    getAverageRatingByPackageId = async (req: Request, res: Response) => {
        try {

            const ratings = await ReviewModel.find({
                packageId: req.params.packageId,
                rating: { $gte: 1 }
            });

            // Count total number of ratings
            let totalRatings = ratings.length;

            // Initialize sum and average rating values
            let sum = 0;
            let averageRating = 0;

            // Only calculate  sum and average if at least one rating exists
            if (totalRatings > 0) {
                // Loop through all ratings and add each rating value to sum
                for (let i = 0; i < ratings.length; i++) {
                    sum = sum + ratings[i].rating;
                };

                // Calculate average rating and keep 1 decimal place
                averageRating = Number((sum / totalRatings).toFixed(1));
            };

            res.status(200).json({
                message: "Average rating calculated successfully",
                result: {
                    totalRatingsSum: sum,
                    totalRatings,
                    averageRating
                },
                success: true
            });

        } catch (err: any) {
            console.log(err)
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Delete Review BY Review ID
    deleteReviewByReviewId = async (req: Request, res: Response) => {
        try {
            const reviewExist = await ReviewModel.findById(req.params.reviewId);

            if (!reviewExist) {
                return res.status(404).send({
                    message: "Review not found!",
                    success: false
                });
            };

            await ReviewModel.findOneAndDelete({ _id: req.params.reviewId });

            res.status(200).json({
                message: "Review deleted successfully",
                success: true
            });

        } catch (err: any) {
            console.log(err)
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };
};

export default ReviewController;