import { PHONE_NUMBER } from "../config/config";

export const generatePasswordResetEmail = (userData: any, resetUrl: any) => `
<html>
  <body style="margin:0; padding:0; background-color:#f5fbf7; font-family:Manrope, Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f9; padding:40px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:#0f7a4b; padding:30px;">
                <h1 style="margin:0; color:#ffffff; font-size:28px;">
                  Reset Your Password
                </h1>
                <p style="margin:10px 0 0; color:rgba(184,243,203,0.95); font-size:14px;">
                  Secure Password Recovery
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:40px 30px; color:#334155;">

                <h2 style="margin-top:0; font-size:20px; color:#123324;">
                  Hello ${userData.fullName},
                </h2>

                <p style="font-size:15px; line-height:1.8;">
                  We received a request to reset your password. If you did not request this, you can safely ignore this email.
                </p>

                <!-- Reset Box -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0; background:#f0fff6; border-left:4px solid #0f7a4b;">
                  <tr>
                    <td style="padding:20px;">

                      <p style="margin:0 0 10px; font-size:13px; color:#1e3a8a; font-weight:bold; text-transform:uppercase;">
                        Password Reset
                      </p>

                      <p style="margin:0 0 20px; font-size:14px; color:#475569; line-height:1.6;">
                        Click the button below to reset your password. This link will expire in
                        <strong>5 minutes</strong>.
                      </p>

                      <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                          <td align="center" bgcolor="#0f7a4b" style="border-radius:5px;">
                            <a href="${resetUrl}"
                               target="_blank"
                               style="display:inline-block; padding:12px 24px; color:#ffffff; text-decoration:none; font-size:14px; font-weight:bold;">
                              Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <!-- Security Notice -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff9eb; border-left:4px solid #f59e0b; margin:20px 0;">
                  <tr>
                    <td style="padding:15px;">
                      <p style="margin:0; color:#92400e; font-weight:bold; font-size:13px;">
                        Security Notice
                      </p>

                      <p style="margin:8px 0 0; color:#78350f; font-size:13px; line-height:1.6;">
                        Never share this link with anyone. TripConnect will never ask for your password through email.
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="font-size:13px; color:#64748b; line-height:1.7;">
                  If you did not request a password reset, please ignore this email and your password will remain unchanged.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:25px 30px; border-top:1px solid #e2e8f0;">

                <p style="margin:0; font-size:15px; font-weight:bold; color:#123324;">
                  TripConnect Support Team
                </p>

                <p style="margin:5px 0 20px; font-size:13px; color:#64748b;">
                  Nepal travel specialists
                </p>

                <p style="margin:5px 0; font-size:13px; color:#64748b;">
                  📍 Kathmandu, Nepal
                </p>

                <p style="margin:5px 0; font-size:13px; color:#64748b;">
                  📞 +977-${PHONE_NUMBER}
                </p>

                <p style="margin:5px 0; font-size:13px; color:#64748b;">
                  🌐 www.tripconnect.com
                </p>

                <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;" />

                <p style="margin:0; text-align:center; font-size:11px; color:#94a3b8;">
                  © 2026 TripConnect. All rights reserved.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
`;

export const generatePasswordUpdatedEmail = (userData: any) => `
<html>
  <body style="margin:0; padding:0; background-color:#f5fbf7; font-family:Manrope, Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f9; padding:40px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">

            <!-- Header -->
            <tr>
              <td align="center" style="background:#0f7a4b; padding:30px;">
                <h1 style="margin:0; color:#ffffff; font-size:28px;">
                  ✓ Password Updated
                </h1>

                <p style="margin:10px 0 0; color:rgba(184,243,203,0.95); font-size:14px;">
                  Your account is secure
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:40px 30px; color:#334155;">

                <h2 style="margin-top:0; font-size:20px; color:#123324;">
                  Hello ${userData.fullName},
                </h2>

                <p style="font-size:15px; line-height:1.8;">
                  Great news! Your password has been successfully changed.
                  Your account is now secured with your new password.
                </p>

                <!-- Success Box -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="margin:30px 0; background:#f0fff6; border-left:4px solid #0f7a4b;">

                  <tr>
                    <td style="padding:20px;">

                      <p style="margin:0 0 10px; font-size:13px; color:#1e3a8a; font-weight:bold; text-transform:uppercase;">
                        ✓ Password Change Confirmed
                      </p>

                      <p style="margin:5px 0; color:#1e3a8a; font-size:13px;">
                        ✓ Your password has been updated
                      </p>

                      <p style="margin:5px 0; color:#1e3a8a; font-size:13px;">
                        ✓ Your account security is maintained
                      </p>

                      <p style="margin:5px 0; color:#1e3a8a; font-size:13px;">
                        ✓ You can now login with your new password
                      </p>

                    </td>
                  </tr>
                </table>

                <!-- What's Next -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="margin:20px 0; background:#f0fff6; border-left:4px solid #0f7a4b;">

                  <tr>
                    <td style="padding:20px;">

                      <p style="margin:0; color:#1e3a8a; font-weight:bold; font-size:13px;">
                        What's Next?
                      </p>

                      <p style="margin:10px 0 0; color:#475569; font-size:13px; line-height:1.6;">
                        You can now log in to your TripConnect account with your new password.
                        If you did not make this change, please contact our support team immediately.
                      </p>

                    </td>
                  </tr>
                </table>

                <!-- Security Tip -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="background:#fff9eb; border-left:4px solid #f59e0b; margin:20px 0;">

                  <tr>
                    <td style="padding:15px;">

                      <p style="margin:0; color:#92400e; font-weight:bold; font-size:13px;">
                        🔒 Security Tip
                      </p>

                      <p style="margin:8px 0 0; color:#78350f; font-size:13px; line-height:1.6;">
                        Keep your password safe and never share it with anyone.
                        Always use a strong password with a mix of letters, numbers, and symbols.
                      </p>

                    </td>
                  </tr>
                </table>

                <p style="font-size:13px; color:#64748b; line-height:1.7;">
                  This is an automated confirmation email. Please do not reply to this message.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:25px 30px; border-top:1px solid #e2e8f0;">

                <p style="margin:0; font-size:15px; font-weight:bold; color:#123324;">
                  TripConnect Support Team
                </p>

                <p style="margin:5px 0 20px; font-size:13px; color:#64748b;">
                  Nepal travel specialists
                </p>

                <p style="margin:5px 0; font-size:13px; color:#64748b;">
                  📍 Kathmandu, Nepal
                </p>

                <p style="margin:5px 0; font-size:13px; color:#64748b;">
                  📞 +977-${PHONE_NUMBER}
                </p>

                <p style="margin:5px 0; font-size:13px; color:#64748b;">
                  🌐 www.tripconnect.com
                </p>

                <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;" />

                <p style="margin:0; text-align:center; font-size:11px; color:#94a3b8;">
                  © 2026 TripConnect. All rights reserved.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
`;

export const generateBookingDetailEmail = (bookingData: any) => `
<html>
  <body style="margin:0; padding:0; background-color:#f5fbf7; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f9; padding:40px 0;">
      <tr>
        <td align="center">

          <table width="620" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #dbe7df; border:1px solid #dbe7df; border:1px solid #dbe7df; border:1px solid #dbe7df;">

            <!-- HEADER -->
            <tr>
              <td align="center" style="background:#0f7a4b; padding:30px;">
                <h1 style="margin:0; color:#ffffff; font-size:28px;">
                  Booking Details
                </h1>

                <p style="margin:10px 0 0; color:rgba(184,243,203,0.95); font-size:14px;">
                  Your TripConnect reservation summary
                </p>


              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:40px 30px; color:#324155;">

                <h2 style="margin-top:0; font-size:20px; color:#123324;">
                  Hello ${bookingData?.fullName || "Traveler"},
                </h2>

                <p style="font-size:15px; line-height:1.8;">
                  Thank you for booking with TripConnect. Below are your booking details for your upcoming trip.
                </p>

                <!-- Traveler Details -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="margin:20px 0; background:#f0fff6; border-left:4px solid #0f7a4b;">

                  <tr>
                    <td style="padding:22px;">

                      <p style="margin:0 0 15px; color:#1e3a8a; font-weight:bold; font-size:13px; text-transform:uppercase;">
                        Traveler Information
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <!-- Left column -->
                          <td valign="top" style="padding-right:10px; width:50%;">
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Name:</strong> ${bookingData?.fullName || "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Email:</strong> ${bookingData?.email || "N/A"}</p>
                          </td>

                          <!-- Right column -->
                          <td valign="top" style="padding-left:10px; width:50%;">
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Phone:</strong> ${bookingData?.phoneNumber || "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Special Request:</strong> ${bookingData?.specialRequest || "N/A"}</p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <!-- Booking Summary -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="margin:30px 0; background:#f0fff6; border-left:4px solid #0f7a4b;">

                  <tr>
                    <td style="padding:20px;">

                      <p style="margin:0 0 15px; font-size:13px; color:#1e3a8a; font-weight:bold; text-transform:uppercase;">
                        Booking Summary
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <!-- Left column -->
                          <td valign="top" style="padding-right:10px; width:50%;">
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Booking Reference:</strong> ${bookingData?.bookingReference || "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Package:</strong> ${bookingData?.packageName || "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Travel Date:</strong> ${bookingData?.travelDate ? new Date(bookingData.travelDate).toDateString() : "N/A"}</p>
                          </td>

                          <!-- Right column -->
                          <td valign="top" style="padding-left:10px; width:50%;">
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Duration:</strong> ${bookingData?.duration || "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Destination:</strong> ${bookingData?.destination || "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Number of Travelers:</strong> ${bookingData?.numberOfTravelers || "N/A"}</p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <!-- Payment Details -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="margin:20px 0; background:#f8fafc; border-left:4px solid #0f7a4b;">

                  <tr>
                    <td style="padding:20px;">

                      <p style="margin:0 0 15px; color:#1e3a8a; font-weight:bold; font-size:13px; text-transform:uppercase;">
                        Payment Details
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <!-- Left column -->
                          <td valign="top" style="padding-right:10px; width:50%;">
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Original Amount:</strong> ${bookingData?.originalAmount !== undefined && bookingData?.originalAmount !== null ? `NPR ${bookingData.originalAmount}` : "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Discount Amount:</strong> ${bookingData?.discountAmount !== undefined && bookingData?.discountAmount !== null ? `NPR ${bookingData.discountAmount}` : "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Payment Method:</strong> ${bookingData?.paymentMethod || "N/A"}</p>
                          </td>

                          <!-- Right column -->
                          <td valign="top" style="padding-left:10px; width:50%;">
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Promo Code:</strong> ${bookingData?.promoCode || "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Total Paid Amount:</strong> ${bookingData?.totalPaidAmount !== undefined && bookingData?.totalPaidAmount !== null ? `NPR ${bookingData.totalPaidAmount}` : "N/A"}</p>
                            <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Payment Status:</strong> ${bookingData?.paymentStatus || "N/A"}</p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <!-- Important Notice -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="background:#fff9eb; border-left:4px solid #f59e0b; margin:20px 0;">

                  <tr>
                    <td style="padding:15px;">

                      <p style="margin:0; color:#92400e; font-weight:bold; font-size:13px;">
                        Important Notice
                      </p>

                      <p style="margin:8px 0 0; color:#78350f; font-size:13px; line-height:1.6;">
                        Please review your booking details carefully. If anything looks incorrect, contact our support team as soon as possible.
                      </p>

                    </td>
                  </tr>
                </table>

                <p style="font-size:13px; color:#64748b; line-height:1.7;">
                  We look forward to helping you explore Nepal with TripConnect.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:25px 30px; border-top:1px solid #e2e8f0;">

                <p style="margin:0; font-size:15px; font-weight:bold; color:#123324;">
                  TripConnect Support Team
                </p>

                <p style="margin:5px 0 20px; font-size:13px; color:#64748b;">
                  Nepal travel specialists
                </p>

                <p style="margin:5px 0; font-size:13px; color:#64748b;">
                  📍 Kathmandu, Nepal
                </p>

                <p style="margin:5px 0; font-size:13px; color:#64748b;">
                  📞 +977-${PHONE_NUMBER}
                </p>

                <p style="margin:5px 0; font-size:13px; color:#64748b;">
                  🌐 www.tripconnect.com
                </p>

                <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;" />

                <p style="margin:0; text-align:center; font-size:11px; color:#94a3b8;">
                  © 2026 TripConnect. All rights reserved.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
`;

export const generateInquiryConfirmationEmail = (inquiryData: any) => `
<html>
  <body style="margin:0; padding:0; background-color:#f5fbf7; font-family:Manrope, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(180deg, #eef7f1 0%, #f8fbf9 100%); padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 12px 40px rgba(15, 118, 74, 0.12); border:1px solid #dcebe3;">
            <tr>
              <td align="center" style="background:linear-gradient(135deg, #0f7a4b 0%, #146c43 100%); padding:32px 24px;">
                <p style="margin:0 0 10px; color:#b8f3cb; font-size:12px; letter-spacing:1.4px; text-transform:uppercase; font-weight:bold;">TripConnect</p>
                <h1 style="margin:0; color:#ffffff; font-size:30px; line-height:1.2;">Inquiry Received</h1>
                <p style="margin:10px 0 0; color:rgba(230,255,238,0.95); font-size:14px;">Our team will review it and get back to you soon</p>
              </td>
            </tr>

            <tr>
              <td style="padding:38px 32px; color:#334155;">
                <h2 style="margin:0 0 14px; font-size:20px; color:#123324;">Hello ${inquiryData?.fullName || "Traveler"},</h2>

                <p style="font-size:15px; line-height:1.8; margin:0 0 18px;">
                  Thanks for contacting TripConnect. We have received your message and our support team is reviewing it carefully.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0; background:#f0fff6; border-left:4px solid #0f7a4b; border-radius:8px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="margin:0 0 10px; font-size:13px; color:#0f7a4b; font-weight:bold; text-transform:uppercase;">Inquiry Summary</p>
                      <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Name:</strong> ${inquiryData?.fullName || "N/A"}</p>
                      <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Email:</strong> ${inquiryData?.email || "N/A"}</p>
                      <p style="margin:6px 0; font-size:14px; color:#475569;"><strong>Phone:</strong> ${inquiryData?.phoneNumber || "N/A"}</p>
                      <p style="margin:14px 0 0; font-size:14px; color:#475569; line-height:1.7;"><strong>Message:</strong> ${inquiryData?.message || "N/A"}</p>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0; background:#f8fafc; border-left:4px solid #0f7a4b; border-radius:8px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="margin:0; color:#0f7a4b; font-weight:bold; font-size:13px;">What happens next?</p>
                      <p style="margin:10px 0 0; color:#475569; font-size:13px; line-height:1.7;">
                        Our team will review your inquiry and reply within 12 to 24 hours. If your request is urgent, you can call us directly at +977-${PHONE_NUMBER}.
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="font-size:13px; color:#64748b; line-height:1.7; margin:18px 0 0;">
                  This is an automated confirmation email. Please do not reply to this message.
                </p>
              </td>
            </tr>

            <tr>
              <td style="background:#f8fafc; padding:24px 32px; border-top:1px solid #e2e8f0;">
                <p style="margin:0; font-size:15px; font-weight:bold; color:#123324;">TripConnect Support Team</p>
                <p style="margin:5px 0 18px; font-size:13px; color:#64748b;">Nepal travel specialists</p>
                <p style="margin:5px 0; font-size:13px; color:#64748b;">📍 Kathmandu, Nepal</p>
                <p style="margin:5px 0; font-size:13px; color:#64748b;">📞 +977-${PHONE_NUMBER}</p>
                <p style="margin:5px 0; font-size:13px; color:#64748b;">🌐 www.tripconnect.com</p>
                <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;" />
                <p style="margin:0; text-align:center; font-size:11px; color:#94a3b8;">© 2026 TripConnect. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const generateInquiryReplyEmail = (inquiryData: any, reply: string) => `
<html>
  <body style="margin:0; padding:0; background-color:#f5fbf7; font-family:Manrope, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(180deg, #eef7f1 0%, #f8fbf9 100%); padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 12px 40px rgba(15, 118, 74, 0.12); border:1px solid #dcebe3;">
            <tr>
              <td align="center" style="background:linear-gradient(135deg, #0f7a4b 0%, #146c43 100%); padding:32px 24px;">
                <p style="margin:0 0 10px; color:#b8f3cb; font-size:12px; letter-spacing:1.4px; text-transform:uppercase; font-weight:bold;">TripConnect</p>
                <h1 style="margin:0; color:#ffffff; font-size:30px; line-height:1.2;">Reply Sent</h1>
                <p style="margin:10px 0 0; color:rgba(230,255,238,0.95); font-size:14px;">Your message has been reviewed by our support team</p>
              </td>
            </tr>

            <tr>
              <td style="padding:38px 32px; color:#334155;">
                <h2 style="margin:0 0 14px; font-size:20px; color:#123324;">Hello ${inquiryData?.name || "Traveler"},</h2>

                <p style="font-size:15px; line-height:1.8; margin:0 0 18px;">
                  Thanks for reaching out to TripConnect. Here is our response to your inquiry.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0; background:#f0fff6; border-left:4px solid #0f7a4b; border-radius:8px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="margin:0 0 10px; font-size:13px; color:#0f7a4b; font-weight:bold; text-transform:uppercase;">Our Response</p>
                      <p style="margin:0; font-size:14px; color:#475569; line-height:1.8; white-space:pre-line;">${reply}</p>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0; background:#f8fafc; border-left:4px solid #0f7a4b; border-radius:8px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="margin:0; color:#0f7a4b; font-weight:bold; font-size:13px;">Need anything else?</p>
                      <p style="margin:10px 0 0; color:#475569; font-size:13px; line-height:1.7;">
                        If you have more questions, just reply to this email or call us at +977-${PHONE_NUMBER}. We are happy to help.
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="font-size:13px; color:#64748b; line-height:1.7; margin:18px 0 0;">
                  This message contains the response to your inquiry from the TripConnect support team.
                </p>
              </td>
            </tr>

            <tr>
              <td style="background:#f8fafc; padding:24px 32px; border-top:1px solid #e2e8f0;">
                <p style="margin:0; font-size:15px; font-weight:bold; color:#123324;">TripConnect Support Team</p>
                <p style="margin:5px 0 18px; font-size:13px; color:#64748b;">Nepal travel specialists</p>
                <p style="margin:5px 0; font-size:13px; color:#64748b;">📍 Kathmandu, Nepal</p>
                <p style="margin:5px 0; font-size:13px; color:#64748b;">📞 +977-${PHONE_NUMBER}</p>
                <p style="margin:5px 0; font-size:13px; color:#64748b;">🌐 www.tripconnect.com</p>
                <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;" />
                <p style="margin:0; text-align:center; font-size:11px; color:#94a3b8;">© 2026 TripConnect. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;