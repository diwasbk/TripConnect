import { Request, Response } from "express";
import { InquiryModel } from "../models/inquiry.model";
import { sendEmail } from "../services/email";
import { generateInquiryConfirmationEmail, generateInquiryReplyEmail } from "../templates/email.templates";

class InquiryController {
    // Send Inquiry
    sendInquiry = async (req: Request, res: Response) => {
        try {

            const { fullName, email, phoneNumber, message } = req.body;

            await InquiryModel.create({
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                message: message
            });

            const html = generateInquiryConfirmationEmail({ fullName, email, phoneNumber, message });

            await sendEmail(email, "Thank You for Contacting TripConnect", html);

            // Send success response 
            res.status(201).send({
                message: "Message sent successfully!",
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

    // Get All Inquiries
    getAllInquiries = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;

            const total = await InquiryModel.countDocuments();

            const result = await InquiryModel.find().skip((page - 1) * limit).limit(limit);

            res.status(200).send({
                message: result.length ? "Inquiries fetched successfully!" : "No Inquiries",
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
            });;
        };
    };

    // Reply Inquiry 
    replyInquiry = async (req: Request, res: Response) => {
        try {
            const { reply } = req.body;

            const inquiryExist = await InquiryModel.findOneAndUpdate(
                { _id: req.params.inquiryId },
                { $set: { reply: reply, status: "replied" } },
                { new: true }
            );

            if (!inquiryExist) {
                return res.status(404).send({
                    message: "Inquiry not found!",
                    success: false
                });
            };

            const html = generateInquiryReplyEmail(inquiryExist, reply);

            await sendEmail(inquiryExist.email, "TripConnect - Response to Your Inquiry", html);

            res.status(200).send({
                message: "Reply sent successfully!",
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

    // Update Inquiry Status By ID 
    updateInquiryStatusById = async (req: Request, res: Response) => {
        try {
            const inquiryExist = await InquiryModel.findOneAndUpdate(
                { _id: req.params.inquiryId },
                { $set: { status: req.params.status } },
                { new: true }
            );

            if (!inquiryExist) {
                return res.status(404).send({
                    message: "Inquiry not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: "Inquiry status updated successfully!",
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

    // Delete Inquiry By ID 
    deleteInquiryById = async (req: Request, res: Response) => {
        try {
            const inquiryExist = await InquiryModel.findOneAndDelete({ _id: req.params.inquiryId });

            if (!inquiryExist) {
                return res.status(404).send({
                    message: "Inquiry not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: "Inquiry deleted successfully!",
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

export default InquiryController;