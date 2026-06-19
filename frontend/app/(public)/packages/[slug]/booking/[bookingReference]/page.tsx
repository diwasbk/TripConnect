"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { handleGetBookingByBookingReference } from "@/lib/actions/booking-action";
import { toast } from "react-toastify";
import BookingDetailSection from "../_components/booking-detail-section";

export default function Page() {
    const params = useParams();
    const bookingReference = params?.bookingReference as string;

    const [bookingDetail, setBookingDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingDetail = async () => {
            try {
                const res = await handleGetBookingByBookingReference(bookingReference);

                if (res.success) {
                    setBookingDetail(res.result);

                } else {
                    throw new Error(res.message || "Failed to fetch booking details!");
                };

            } catch (err: any) {
                toast.error(err.message || "Failed to fetch booking details!");

            } finally {
                setLoading(false)
            };
        };
        fetchBookingDetail();
    }, []);

    return (
        <div>
            <BookingDetailSection navUrl="/" bookingDetail={bookingDetail}/>
        </div>
    );
}