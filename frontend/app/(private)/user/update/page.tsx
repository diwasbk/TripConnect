import UpdateUserInfoSection from "../../_components/update-user-info-section";
import UserSideBar from "../_components/user-sidebar";

export default function HomePage() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="md:shrink-0">
                <UserSideBar/>
            </div>
            <div className="flex-1 overflow-y-auto">
                <UpdateUserInfoSection userId="" />
            </div>
        </div>
    );
}