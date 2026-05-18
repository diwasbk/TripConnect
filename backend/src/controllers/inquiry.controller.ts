import { Request, Response } from "express";
import { inquiryModel } from "../models/inquiry.model";
import { sendEmail } from "../services/email";
import { generateInquiryConfirmationEmail, generateInquiryReplyEmail } from "../templates/email.templates";

class InquiryController {
    // Send Inquiry
    sendInquiry = async (req: Request, res: Response) => {
        try {

            const { name, email, phone, message } = req.body;

            await inquiryModel.create({
                name: name,
                email: email,
                phone: phone,
                message: message
            });

            const html = generateInquiryConfirmationEmail({ name, email, phone, message });

            await sendEmail(email, "Thank You for Contacting MediConnect", html);

            // Send success response 
            res.status(201).send({
                message: "Message sent succcessfully!",
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

export default InquiryController;