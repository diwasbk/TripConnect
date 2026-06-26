import PackageSection from "@/app/(public)/packages/_components/package-section";
import UserSideBar from "../_components/user-sidebar";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <UserSideBar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <PackageSection />
            </div>
        </div>
    );
}