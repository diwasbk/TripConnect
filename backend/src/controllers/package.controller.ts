import { Request, Response } from "express";
import { PackageModel } from "../models/package.model";

class PackageController {
    // Create Package Basic Info
    createPackageBasicInfo = async (req: Request, res: Response) => {
        try {
            const { title, intro, description, duration, price, includes } = req.body;

            await PackageModel.create({
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
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

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
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            await PackageModel.findOneAndDelete({ _id: req.params.packageId });

            res.status(200).send({
                message: "Package deleted successfully!",
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
    updatePackageBasicInfoById = async (req: Request, res: Response) => {
        try {
            const { ...data } = req.body;

            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            await PackageModel.findOneAndUpdate(
                { _id: req.params.packageId },
                { $set: data }
            );

            res.status(200).send({
                message: "Package updated successfully!",
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

    // Update Package Photos By Package ID
    updatePackagePhotosByPackageId = async (req: Request, res: Response) => {
        try {
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            if (!req.file) {
                return res.status(400).json({
                    message: "No file uploaded!",
                    success: false
                });
            };

            packageExist.photoUrls.push(req.file.path.replace(/\\/g, "/"));

            await packageExist.save();

            res.status(200).send({
                message: "Package photos uploaded successfully!",
                result: packageExist.photoUrls,
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

    // Delete Package Photo By Package ID
    deletePackagePhotoByPackageId = async (req: Request, res: Response) => {
        try {
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const photoUrl = req.body.photoUrl;

            if (!photoUrl) {
                return res.status(400).send({
                    message: "Photo URL is required!",
                    success: false
                });
            };

            const photoExists = packageExist.photoUrls.includes(photoUrl);

            if (!photoExists) {
                return res.status(404).send({
                    message: "Photo not found in package!",
                    success: false
                });
            };

            packageExist.photoUrls = packageExist.photoUrls.filter((photo: string) =>
                photo !== photoUrl
            );

            await packageExist.save();

            res.status(200).send({
                message: "Package photo deleted successfully!",
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

    // Add Package Itinerary By Package ID
    addPackageItineraryByPackageId = async (req: Request, res: Response) => {
        try {
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const { ...data } = req.body;

            packageExist.itinerary.push(data);

            await packageExist.save();

            // Get the newly added itinerary (last element)
            const addedItinerary = packageExist.itinerary[packageExist.itinerary.length - 1];

            res.status(200).send({
                message: "Package itinerary added successfully!",
                result: addedItinerary,
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

    // Get Package Itinerary By Package ID
    getPackageItineraryByPackageId = async (req: Request, res: Response) => {
        try {

            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: packageExist.itinerary.length ? "Package itinerary fetched successfully!" : "Package itinerary not found!",
                result: packageExist.itinerary,
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

    // Update Package Itinerary By Itinerary ID
    updatePackageItineraryByItineraryId = async (req: Request, res: Response) => {
        try {
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const itineraryExist = packageExist.itinerary.find((itinerary: any) => {
                return itinerary._id == req.params.itineraryId
            });

            if (!itineraryExist) {
                return res.status(404).send({
                    message: "Itinerary not found!",
                    success: false
                });
            };

            const { day, title, description, activities } = req.body;

            // Update itinerary using positional operator
            const updatedPackage = await PackageModel.findOneAndUpdate(
                {
                    _id: req.params.packageId,
                    "itinerary._id": req.params.itineraryId
                },
                {
                    $set: {
                        "itinerary.$.day": day,
                        "itinerary.$.title": title,
                        "itinerary.$.description": description,
                        "itinerary.$.activities": activities
                    }
                },
                { new: true }
            );

            if (!updatedPackage) {
                return res.status(404).send({
                    message: "Failed to update itinerary.",
                    success: false
                });
            };

            // Get updated itinerary only
            const updatedPackageItinerary = updatedPackage.itinerary.find((itinerary: any) => {
                return itinerary._id == req.params.itineraryId
            });

            res.status(200).send({
                message: "Itinerary updated successfully!",
                result: updatedPackageItinerary,
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

    // Delete Itinerary By Itinerary ID
    deleteItineraryByItineraryId = async (req: Request, res: Response) => {
        try {
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const itineraryExist = packageExist.itinerary.find((itinerary: any) => {
                return itinerary._id == req.params.itineraryId
            });

            if (!itineraryExist) {
                return res.status(404).send({
                    message: "Itinerary not found!",
                    success: false
                });
            };

            // Get the index of the itinerary to delete
            const itineraryIndex = packageExist.itinerary.findIndex((itinerary: any) => {
                return itinerary._id == req.params.itineraryId;
            });

            // Remove the itinerary from the array
            packageExist.itinerary.splice(itineraryIndex, 1);

            await packageExist.save();

            res.status(200).send({
                message: "Itinerary deleted successfully!",
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

    // Add Package Departure By Package ID
    addPackageDepartureByPackageId = async (req: Request, res: Response) => {
        try {
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const { ...data } = req.body;

            packageExist.departures.push(data);

            await packageExist.save();

            // Get the newly added departure (last element)
            const addedDeparture = packageExist.departures[packageExist.departures.length - 1];

            res.status(200).send({
                message: "Package departure added successfully!",
                result: addedDeparture,
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

    // Get Package Departure By Package ID
    getPackageDepartureByPackageId = async (req: Request, res: Response) => {
        try {

            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: packageExist.departures.length ? "Package departures fetched successfully!" : "Package departured not found!",
                result: packageExist.departures,
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
};

export default PackageController;