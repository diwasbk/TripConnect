"use client";
import { clearAuthTokenCookie } from "@/lib/cookie";
import { Backpack, LogOut, UserCircle2, Plane, Map, Menu, X, Lock, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { handleWhoAmI } from "@/lib/actions/auth-action";

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
};

const NavItem = ({
    icon,
    label,
    active = false,
}: NavItemProps) => {
    return (
        <div
            className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${active
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                }`}
        >
            <span className="shrink-0">
                {icon}
            </span>

            <span>
                {label}
            </span>
        </div>
    );
};

export default function UserSideBar() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await clearAuthTokenCookie();

            toast.success("Logout successful!");

            router.replace("/login");

        } catch {

            toast.error("Logout failed!");
        };
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const res = await handleWhoAmI();

                if (res.success) {

                    setUser(res.result);
                } else {

                    throw new Error(
                        res.message || "Failed to fetch user!"
                    );
                };

            } catch (err: any) {
                toast.error(
                    err.message || "Failed to load user"
                );
            };
        };

        fetchUser();
    }, []);

    const navSections = [
        {
            title: "Travel",
            items: [
                {
                    label: "My Trips",
                    icon: <Plane size={20} />,
                    path: "/user/my-trips",
                },
                {
                    label: "Explore Packages",
                    icon: <Map size={20} />,
                    path: "/user/packages",
                },
            ]
        },
        {
            title: "Account",
            items: [
                {
                    label: "Edit Profile",
                    icon: <UserCircle2 size={20} />,
                    path: "/user/update",
                },
                {
                    label: "Change Password",
                    icon: <Lock size={20} />,
                    path: "/user/change-password",
                },
                {
                    label: "Delete Account",
                    icon: <Trash2 size={20} />,
                    path: "/user/delete-account",
                },
            ]
        }
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
                <Link
                    href="/user/dashboard"
                    className="flex items-center gap-3"
                >
                    <div className="rounded-xl bg-emerald-600 p-2 text-white">
                        <Backpack size={22} />
                    </div>

                    <div>

                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                            TripConnect
                        </p>
                        <p className="text-xs text-slate-500">
                            Nepal travel specialists
                        </p>
                    </div>
                </Link>

                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2"
                >
                    <Menu />
                </button>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform md:relative md:translate-x-0
                ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >
                {/* Logo */}
                <div className="border-b border-slate-100 p-5">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/user/my-trips"
                            className="flex items-center gap-3"
                        >
                            <div className="rounded-xl bg-emerald-600 p-2.5 text-white">

                                <Backpack />
                            </div>

                            <div>

                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                                    TripConnect
                                </p>
                                <p className="text-sm text-slate-500">
                                    Nepal travel specialists
                                </p>
                            </div>
                        </Link>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="md:hidden"
                        >

                            <X />

                        </button>
                    </div>
                </div>

                {/* User Card */}
                <div className="p-4">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                                <UserCircle2
                                    size={35}
                                    className="text-emerald-700"
                                />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-slate-900">

                                    {user?.fullName || "N/A"}

                                </h2>
                                <p className="text-xs text-slate-500">

                                    {user?.email || "N/A"}
                                </p>
                                <p className="text-xs text-slate-500">

                                    {user?.phoneNumber || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-5">
                    {navSections.map(section => (
                        <div
                            key={section.title}
                            className="mb-7"
                        >
                            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">

                                {section.title}
                            </p>

                            <div className="space-y-2">
                                {section.items.map(item => (
                                    <Link
                                        key={item.path}

                                        href={item.path}

                                        onClick={() => setIsOpen(false)}
                                    >
                                        <NavItem
                                            icon={item.icon}

                                            label={item.label}

                                            active={
                                                pathname === item.path
                                            }
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="border-t border-slate-100 p-4">
                    <button
                        onClick={handleLogout}

                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}