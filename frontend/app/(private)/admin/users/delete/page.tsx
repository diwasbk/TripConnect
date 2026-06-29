"use client";
import DeleteUserAccountSection from "@/app/(auth)/_components/delete-account-section";
import AdminSideBar from "../../_components/admin-sidebar";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId") as string;

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <AdminSideBar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <DeleteUserAccountSection userId={userId} />
            </div>
        </div>
    );
}
