import nodemailer from "nodemailer";
import { APP_PASS, USER_EMAIL } from "../config/config";

// Nodemailer transporter using Gmail
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: USER_EMAIL,
        pass: APP_PASS
    }
});

//  Send email using the configured nodemailer transporter
export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const mailOptions = {
            from: `"TripConnect"<${USER_EMAIL}>`,
            to,
            subject,
            html
        };

        await transporter.sendMail(mailOptions);
        
    } catch (err: any) {
        throw new Error(err.message || "Error sending email!");
    };
};