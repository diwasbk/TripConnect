import { Request, Response } from "express";
import { PromoCodeModel } from "../models/promocode.model";
import { PaymentModel } from "../models/payment.model";

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

    // Get All PromoCode By Status
    getAllPromoCodeByStatus = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;

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

            const total = await PaymentModel.countDocuments({ isActive: isActive })

            const result = await PromoCodeModel.find({ isActive: isActive }).skip((page - 1) * limit).limit(limit);

            res.status(200).send({
                message: result.length ? "PromoCode fetched successfully!" : " PromoCode not found!",
                isActive: isActive,
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

    // Activate or Deactivate PromoCode By PromoCode ID
    activateOrDeactivatePromoCodeByPromoCodeId = async (req: Request, res: Response) => {
        try {
            const promoCodeExist = await PromoCodeModel.findOne({ _id: req.params.promoCodeId });

            if (!promoCodeExist) {
                res.status(404).send({
                    message: "PromoCode not found!",
                    success: false
                });
            };

            let message: string;
            let isActive: boolean;

            if (req.params.isActive == "true") {
                message = "activated";
                isActive = true;
            } else if (req.params.isActive == "false") {
                message = "deactivated";
                isActive = false;
            } else {
                return res.status(400).send({
                    message: "Invalid value! Use true or false.",
                    success: false
                });
            };

            await PromoCodeModel.findOneAndUpdate(
                { _id: req.params.promoCodeId },
                { $set: { isActive: isActive } }
            );

            res.status(200).send({
                message: `PromoCode ${message} successfully!`,
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

    // Apply promo code to a payment using payment ID
    applyPromoCodeByPaymentId = async (req: Request, res: Response) => {
        try {
            // Check if payment exists
            const paymentExist = await PaymentModel.findOne({ _id: req.params.paymentId });

            if (!paymentExist) {
                return res.status(404).send({
                    message: "Payment not found!",
                    success: false
                });
            };


            if (paymentExist.promoCodeId !== null) {
                return res.status(409).send({
                    message: "PromoCode already applied!",
                    success: false
                });
            };

            // Check if promo code exists
            const promoCodeExist = await PromoCodeModel.findOne({ code: req.body.code.toUpperCase() });

            if (!promoCodeExist) {
                return res.status(404).send({
                    message: "Invalid PromoCode!",
                    success: false
                });
            };

            // Check if promo code is active
            if (!promoCodeExist.isActive) {
                return res.status(400).send({
                    message: "PromoCode is inactive!",
                    success: false
                });
            };

            // Get current date for expiration validation
            const currentDate = new Date();

            // Check if promo code has expired
            if (promoCodeExist.expiresAt < currentDate) {
                return res.status(400).send({
                    message: "PromoCode has expired!",
                    success: false
                });
            };

            // Calculate discount amount
            const discountAmount = (promoCodeExist.discountPercentage * paymentExist.finalAmount) / 100;

            // Calculate final payable amount
            const finalAmount = paymentExist.originalAmount - discountAmount;

            // Save discount percentage in payment
            paymentExist.discountPercentage = promoCodeExist.discountPercentage;

            // Save calculated discount amount
            paymentExist.discountAmount = discountAmount;

            // Update final payment amount
            paymentExist.finalAmount = finalAmount;

            // Attach promo code ID to payment
            paymentExist.promoCodeId = promoCodeExist._id;

            // Save updated payment
            await paymentExist.save();

            // Send success response
            res.status(200).send({
                message: "PromoCode applied successfully!",
                result: {
                    promoCode: promoCodeExist.code,
                    originalAmount: paymentExist.originalAmount,
                    discountPercentage: promoCodeExist.discountPercentage,
                    discountAmount: discountAmount,
                    finalAmount: finalAmount
                },
                success: true,
            });

        } catch (err: any) {
            // Log server error
            console.log(err);

            // Send internal server error response
            res.status(500).send({
                message: err.message
                    ? `Internal server error: ${err.message}`
                    : "Internal server error!",
                success: false
            });
        }
    };

    // Delete PromoCode By PromoCode ID
    deletePromoCodeByPromoCodeId = async (req: Request, res: Response) => {
        try {
            const PromoCodeExist = await PromoCodeModel.findOne({ _id: req.params.promoCodeId });

            if (!PromoCodeExist) {
                return res.status(404).send({
                    message: "PromoCode not found!",
                    success: false
                });
            };

            await PromoCodeModel.findOneAndDelete({ _id: req.params.promoCodeId });

            res.status(200).send({
                message: "PromoCode deleted successfully!",
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

export default PromoCodeController;