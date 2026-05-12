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
};

export default PackageController;