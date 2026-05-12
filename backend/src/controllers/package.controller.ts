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

    // Get All Live Packages
    getAllLivePackages = async (req: Request, res: Response) => {
        try {
            const result = await PackageModel.find({
                status: "published",
                isActive: true
            });
            
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

    // Get Single Package By ID
    getSinglePackageById = async (req: Request, res: Response) => {
        try {

            const packageExist = await PackageModel.findOne({ _id: req.params.packageID });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: "Package fetched successfully!",
                result: packageExist,
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

    // Delete Single Package By ID
    deleteSinglePackageById = async (req: Request, res: Response) => {
        try {

            const packageExist = await PackageModel.findOne({ patientId: req.params.patientId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            await PackageModel.findOneAndDelete({ _id: req.params.packageID });

            res.status(200).send({
                message: "Package deleted successfully!",
                result: packageExist,
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

    // Update Package Basic Info By ID
    updatePackageBasicInfoByID = async (req: Request, res: Response) => {
        try {
            const { ...data } = req.body;

            const packageExist = await PackageModel.findOne({ _id: req.params.packageID });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const result = await PackageModel.findOneAndUpdate(
                { _id: req.params.packageID },
                { $set: data },
                { new: true }
            );

            res.status(200).send({
                message: "Package updated successfully!",
                result: result,
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
};

export default PackageController;