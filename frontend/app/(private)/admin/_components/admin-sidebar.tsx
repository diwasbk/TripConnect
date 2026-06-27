"use client";
import { clearAuthTokenCookie } from "@/lib/cookie";
import { Backpack, LogOut, LayoutDashboard, CalendarCheck, Image, MessageSquare, Package, CreditCard, Tag, Users, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

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

export default function AdminSideBar() {
    const router = useRouter();
    const pathname = usePathname();
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

    const navSections = [
        {
            title: "Overview",
            items: [
                {
                    label: "Dashboard",
                    icon: <LayoutDashboard size={20} />,
                    path: "/admin/dashboard",
                },
            ],
        },
        {
            title: "Management",
            items: [
                {
                    label: "Packages",
                    icon: <Package size={20} />,
                    path: "/admin/packages",
                },
                {
                    label: "Bookings",
                    icon: <CalendarCheck size={20} />,
                    path: "/admin/bookings",
                },
                {
                    label: "Galleries",
                    icon: <Image size={20} />,
                    path: "/admin/galleries",
                },
                {
                    label: "Payments",
                    icon: <CreditCard size={20} />,
                    path: "/admin/payments",
                },
                {
                    label: "Promo Codes",
                    icon: <Tag size={20} />,
                    path: "/admin/promocodes",
                },
            ],
        },

        {
            title: "Users",
            items: [
                {
                    label: "Users",
                    icon: <Users size={20} />,
                    path: "/admin/users",
                },
                {
                    label: "Subscribers",
                    icon: <Mail size={20} />,
                    path: "/admin/subscribers",
                },
                {
                    label: "Inquiries",
                    icon: <MessageSquare size={20} />,
                    path: "/admin/inquiries",
                },
            ],
        },
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">

                <Link href="/admin/dashboard" className="flex items-center gap-3">

                    <div className="rounded-xl bg-emerald-600 p-2 text-white">
                        <Backpack size={22} />
                    </div>

                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                            TripConnect
                        </p>

                        <p className="text-xs text-slate-500">
                            Admin Panel
                        </p>
                    </div>
                </Link>

                <button onClick={() => setIsOpen(true)} className="p-2">
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
                className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform md:relative md:translate-x-0 ${isOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="border-b border-slate-100 p-5">
                    <div className="flex items-center justify-between">
                        <Link href="/admin/dashboard" className="flex items-center gap-3">
                            <div className="rounded-xl bg-emerald-600 p-2.5 text-white">
                                <Backpack />
                            </div>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                                    TripConnect
                                </p>

                                <p className="text-sm text-slate-500">
                                    Admin Panel
                                </p>
                            </div>
                        </Link>

                        <button onClick={() => setIsOpen(false)} className="md:hidden">
                            <X />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-5">
                    {navSections.map(section => (
                        <div key={section.title} className="mb-7">
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
                                            active={pathname.startsWith(item.path)}
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
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}