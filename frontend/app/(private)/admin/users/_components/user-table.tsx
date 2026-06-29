"use client";
import { useEffect, useState } from "react";
import { Search, X, Edit, Trash2, Users } from "lucide-react";
import { toast } from "react-toastify";
import { handleGetAllUsers } from "@/lib/actions/auth-action";
import UpdateUserInfoSection from "@/app/(private)/_components/update-user-info-section";
import DeleteUserAccountSection from "@/app/(auth)/_components/delete-account-section";
import { formatDateTime } from "@/lib/helpers/helper";

export default function UserTable() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    // Track state for the Update User right drawer modal
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    // Track state for the Delete User right drawer modal
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedDeleteUserId, setSelectedDeleteUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await handleGetAllUsers(currentPage, 7);

                if (res.success) {
                    setUsers(res.result || []);
                    setPagination(res.pagination || null);
                } else {
                    throw new Error(res.message || "Failed to fetch users!");
                }
            } catch (err: any) {
                toast.error(err.message || "Failed to fetch users!");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [currentPage]);

    const filtered = users.filter(user => {
        const q = query.toLowerCase();
        return (
            user.fullName?.toLowerCase().includes(q) ||
            user.email?.toLowerCase().includes(q)
        );
    });

    // Handle Edit Side Drawer Open
    const handleEditClick = (id: string) => {
        setSelectedUserId(id);
        setIsEditFormOpen(true);
    };

    // Handle Delete Side Drawer Open
    const handleDeleteClick = (id: string) => {
        setSelectedDeleteUserId(id);
        setIsDeleteOpen(true);
    };

    return (
        <div className="relative overflow-hidden max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-5">
                {/* HEADER */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/70 p-2 text-emerald-600 transition-all hover:bg-emerald-50 hover:-translate-x-0.5"
                            >
                                <Users size={18} />
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                <span className="bg-linear-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Users
                                </span>
                            </h2>
                        </div>

                        <p className="text-sm font-semibold text-slate-500 mt-2 ml-1">
                            {filtered.length} users cataloged on this page
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-full px-4 py-2 shadow-sm">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Search users..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="outline-none bg-transparent text-sm w-48"
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-emerald-50 bg-slate-50/75">
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Full Name</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Contact Details</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Role</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Timestamp</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Terms</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-emerald-50/60">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                            Loading system users data...
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                            No accounts found matching parameters.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map(user => (
                                        <tr key={user._id} className="hover:bg-emerald-50/20 transition">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-800 border border-emerald-200">
                                                        {user.fullName?.charAt(0).toUpperCase() || "U"}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-950">{user.fullName}</p>
                                                        <p className="text-[11px] text-slate-400 font-mono truncate max-w-xs">{user._id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-semibold text-slate-900">{user.email}</p>
                                                <p className="text-xs text-slate-500">{user.phoneNumber || "N/A"}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase bg-teal-50 text-teal-700 border-teal-200`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                           {/* SERIAL TIMELINE LOGS */}
                                            <td className="px-5 py-4 text-xs font-semibold whitespace-nowrap">
                                                <div className="flex flex-col space-y-1">
                                                    <span className="text-slate-700" title="Received Timestamp">
                                                        {formatDateTime(user.createdAt)}
                                                    </span>
                                                    <span className="text-slate-400 text-[11px] font-medium border-t border-slate-100 pt-0.5" title="Last Updated Timestamp">
                                                        {formatDateTime(user.updatedAt || user.createdAt)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className={`text-xs font-bold uppercase ${user.termsAgreed ? "text-emerald-600" : "text-slate-400"}`}>
                                                    {user.termsAgreed ? "Agreed" : "Pending"}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(user._id)}
                                                        className="p-1.5 rounded-full border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
                                                    >
                                                        <Edit size={15} />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDeleteClick(user._id)}
                                                        className="p-1.5 rounded-full border border-slate-200 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PAGINATION */}
                {pagination && (
                    <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        <button
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            disabled={!pagination.hasPreviousPage || loading}
                            className={`rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors ${!pagination.hasPreviousPage || loading
                                ? "pointer-events-none border-emerald-200 bg-white text-slate-400"
                                : "border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                                }`}
                        >
                            Previous
                        </button>
                        <span className="rounded-full bg-emerald-700 px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold text-white">
                            {pagination.page} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={!pagination.hasNextPage || loading}
                            className={`rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors ${!pagination.hasNextPage || loading
                                ? "pointer-events-none border-emerald-200 bg-white text-slate-400"
                                : "border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* SLIDING SIDE DRAWER MODAL - USER EDIT OVERLAY */}
            {isEditFormOpen && selectedUserId && (
                <div className="fixed h-full inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
                    <div className="relative w-full max-w-4xl my-auto animate-in slide-in-from-right duration-200">
                        <button
                            onClick={() => setIsEditFormOpen(false)}
                            className="absolute top-10 right-10 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer z-50"
                        >
                            <X size={20} />
                        </button>
                        <UpdateUserInfoSection userId={selectedUserId} />
                    </div>
                </div>
            )}

            {/* SLIDING SIDE DRAWER MODAL - USER DELETE OVERLAY */}
            {isDeleteOpen && selectedDeleteUserId && (
                <div className="fixed h-full inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
                    {/* CHANGED max-w-xl TO max-w-4xl BELOW */}
                    <div className="relative w-full max-w-4xl my-auto animate-in slide-in-from-right duration-200">
                        <button
                            onClick={() => setIsDeleteOpen(false)}
                            className="absolute top-10 right-10 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer z-50"
                        >
                            <X size={20} />
                        </button>
                        <DeleteUserAccountSection userId={selectedDeleteUserId} />
                    </div>
                </div>
            )}
        </div>
    );
}