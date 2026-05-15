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
};

export default PromoCodeController;