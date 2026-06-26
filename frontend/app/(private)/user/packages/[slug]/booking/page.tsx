import BookingSection from "@/app/(public)/packages/[slug]/booking/_components/booking-section";
import UserSideBar from "../../../_components/user-sidebar";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <UserSideBar />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <BookingSection navUrl="/user/" />
            </div>
        </div>
    );
}