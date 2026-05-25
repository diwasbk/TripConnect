import { BookingModel } from "../models/booking.model";

// Generate a unique booking Reference
export const generateBookingReference = async () => {

    // Store generated booking Reference
    let bookingReference = "";

    // Track whether booking Reference already exists in database
    let exists = true;

    // Keep generating until a unique Reference is found
    while (exists) {

        // Generate random 6-digit number
        const randomNumber = Math.floor(100000 + Math.random() * 900000);

        // Create booking Reference with TRIP prefix
        bookingReference = `TRIP${randomNumber}`;

        // Check if booking Reference already exists in database
        exists = !!(await BookingModel.exists({ bookingReference }));
    };

    // Return unique booking Reference
    return bookingReference;
};