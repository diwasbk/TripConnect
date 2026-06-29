import AdminSideBar from "../_components/admin-sidebar";
import SubscriberTable from "./_components/subscriber-table";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <AdminSideBar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <SubscriberTable/>
            </div>
        </div>
    );
}