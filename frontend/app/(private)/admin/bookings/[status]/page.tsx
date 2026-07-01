"use client";
import { useParams } from "next/navigation";
import AdminSideBar from "../../_components/admin-sidebar";
import BookingTable from "../_components/booking-table";

export default function Page() {
    const { status } = useParams<{ status: string }>();

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <AdminSideBar />
            </div>

            <div className="flex-1 overflow-y-auto">
                <BookingTable status={status} />
            </div>
        </div>
    );
}