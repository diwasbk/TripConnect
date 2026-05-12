import { Request, Response } from "express";
import { PackageModel } from "../models/package.model";

class PackageController {
    // Create Basic Package Info
    createPackageBasicInfo = async (req: Request, res: Response) => {
        try {
            const { title, intro, description, duration, price, includes } = req.body;

            const result = await PackageModel.create({
                title: title,
                intro: intro,
                description: description,
                duration: duration,
                price: price,
                includes: includes,
                photoUrls: [],
                itinerary: [],
                departures: []
            });

            res.status(201).send({
                message: "Package created successfully!",
                result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: false
            });
        };
    };

    // Get All Packages
    getAllPackagesByStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.query;

            if (status !== "draft" && status !== "published") {
                return res.status(400).send({
                    message: "Invalid status. Status must be either draft or published.",
                    success: false
                });
            };

            const result = await PackageModel.find({ status: status });

            res.status(200).send({
                message: result.length ? "Packaged fetched successfully!" : "No Packages!",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });;
        };
    };
};

export default PackageController;