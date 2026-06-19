import { Request, Response } from "express";
import { inquiryModel } from "../models/inquiry.model";
import { sendEmail } from "../services/email";
import { generateInquiryConfirmationEmail, generateInquiryReplyEmail } from "../templates/email.templates";

class InquiryController {
    // Send Inquiry
    sendInquiry = async (req: Request, res: Response) => {
        try {

            const { fullName, email, phoneNumber, message } = req.body;

            await inquiryModel.create({
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
            const result = await inquiryModel.find();

            res.status(200).send({
                message: result.length ? "Inquiries fetched successfully!" : "No Inquiries",
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

    // Reply Inquiry 
    replyInquiry = async (req: Request, res: Response) => {
        try {
            const { reply } = req.body;

            const inquiryExist = await inquiryModel.findOneAndUpdate(
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

            await sendEmail(inquiryExist.email, "MediConnect - Response to Your Inquiry", html);

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
};

export default InquiryController;