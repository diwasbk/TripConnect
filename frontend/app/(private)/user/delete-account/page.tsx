import DeleteUserAccountSection from "@/app/(auth)/_components/delete-account-section";
import UserSideBar from "../_components/user-sidebar";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="md:shrink-0">
                <UserSideBar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <DeleteUserAccountSection userId="" />
            </div>
        </div>
    );
}