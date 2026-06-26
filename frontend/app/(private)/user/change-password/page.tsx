import UserSideBar from "../_components/user-sidebar";
import ChangePasswordSection from "@/app/(auth)/_components/change-password-section";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="md:shrink-0">
                <UserSideBar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <ChangePasswordSection />
            </div>
        </div>
    );
}