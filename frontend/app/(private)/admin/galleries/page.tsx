import AdminSideBar from "../_components/admin-sidebar";
import GalleryTable from "./_components/gallery-table";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <AdminSideBar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <GalleryTable/>
            </div>
        </div>
    );
}