"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { handleGetPackagesBySlug } from "@/lib/actions/package-action";
import UserSideBar from "../../_components/user-sidebar";
import PackageDetailSection from "@/app/(public)/packages/_components/package-detail-section";

export default function Page() {
    const params = useParams();
    const packageSlug = params?.slug as string;

    const [pkg, setPackage] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const res = await handleGetPackagesBySlug(packageSlug);

                if (res.success) {
                    setPackage(res.result);
                } else {
                    throw new Error(res.message || "Failed to fetch packages!");
                }
            } catch (err: any) {
                console.error(err.message || "Failed to fetch packages!");
            } finally {
                setLoading(false);
            }
        };

        fetchPackage();
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <UserSideBar />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <PackageDetailSection navUrl="/user/" pkg={pkg} />
            </div>
        </div>
    );
}
