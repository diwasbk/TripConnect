import UserSideBar from "@/app/(private)/user/_components/user-sidebar";
import FailureSection from "@/app/(public)/packages/[slug]/booking/payment/failure/_components/failure-section";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <UserSideBar />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <FailureSection navUrl="/user/my-trips" />
            </div>
        </div>
    );
}