import { Request, Response } from "express";
import { PromoCodeModel } from "../models/promocode.model";

class PromoCodeController {
    // Create PromoCode
    createPromoCode = async (req: Request, res: Response) => {
        try {
            const { ...data } = req.body;

            const promoCodeExist = await PromoCodeModel.findOne({ code: data.code });

            if (promoCodeExist) {
                return res.status(409).send({
                    message: "PromoCode already exists!",
                    success: false,
                });
            };

            const result = await PromoCodeModel.create(data);

            return res.status(201).send({
                message: "PromoCode created successfully!",
                success: true,
                data: result,
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: false
            });
        };
    };

    // Get All PromoCode By Status
    getAllPromoCodeByStatus = async (req: Request, res: Response) => {
        try {
            let isActive: boolean;

            if (req.params.isActive == "true") {
                isActive = true;
            } else if (req.params.isActive == "false") {
                isActive = false;
            } else {
                return res.status(400).send({
                    message: "Invalid value! Use true or false.",
                    success: false
                });
            };

            const result = await PromoCodeModel.find({ isActive: isActive });

            res.status(200).send({
                message: result.length ? "PromoCode fetched successfully!" : " PromoCode not found!",
                isActive: isActive,
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: true
            });
        };
    };

    // Get PromoCode By PromoCode ID
    getPromoCodeByPromoCodeId = async (req: Request, res: Response) => {
        try {
            const promoCodeExist = await PromoCodeModel.findOne({ _id: req.params.promoCodeId });

            if (!promoCodeExist) {
                res.status(404).send({
                    message: "PromoCode not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: "PromoCode fetched successfully!",
                result: promoCodeExist,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: true
            });
        };
    };

    // Update PromoCode by PromoCode ID
    updatePromoCodeByPromoCodeId = async (req: Request, res: Response) => {
        try {
            const promoCodeExist = await PromoCodeModel.findOne({ _id: req.params.promoCodeId });

            if (!promoCodeExist) {
                res.status(404).send({
                    message: "PromoCode not found!",
                    success: false
                });
            };

            const { ...data } = req.body;

            await PromoCodeModel.findOneAndUpdate(
                { _id: req.params.promoCodeId },
                { $set: data }
            );

            res.status(200).send({
                message: "PromoCode updated successfully!",
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: true
            });
        };
    };
};

export default PromoCodeController;