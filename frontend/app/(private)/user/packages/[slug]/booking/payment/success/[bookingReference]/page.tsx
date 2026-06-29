import UserSideBar from "@/app/(private)/user/_components/user-sidebar";
import SuccessSection from "@/app/(public)/packages/[slug]/booking/payment/success/_components/success-section";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <UserSideBar />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <SuccessSection navUrl1="/user/" navUrl2="/user/my-trips/" />
            </div>
        </div>
    );
}