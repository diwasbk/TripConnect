"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Backpack } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/home" },
    { label: "Packages", href: "/packages" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActiveLink = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

    const navLinkClassName = (href: string) =>
        `rounded-full px-4 py-2 transition-colors ${isActiveLink(href) ? "bg-emerald-50 text-emerald-800" : "hover:bg-emerald-50 hover:text-emerald-800"
        }`;

    const mobileNavLinkClassName = (href: string) =>
        `rounded-2xl px-4 py-3 transition-colors ${isActiveLink(href) ? "bg-emerald-50 text-emerald-800" : "hover:bg-emerald-50 hover:text-emerald-800"
        }`;

    return (
        <header className="sticky top-0 z-40 border-b border-emerald-500/10 bg-white/85 backdrop-blur-xl">
            <div className="mx-auto flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="rounded-lg bg-emerald-600 p-2 text-white sm:rounded-xl sm:p-2.5 shadow-sm flex-shrink-0">
                        <Backpack size={20} className="sm:size-5" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">TripConnect</p>
                        <p className="text-sm text-slate-600">Nepal travel specialists</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-1 rounded-full border border-emerald-100 bg-white px-2 py-2 text-sm font-medium text-slate-600 shadow-sm shadow-emerald-950/5 md:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            aria-current={isActiveLink(item.href) ? "page" : undefined}
                            className={navLinkClassName(item.href)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/login"
                        className="rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 shadow-sm shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800"
                    >
                        Sign up
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation menu"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-800 shadow-sm shadow-emerald-950/5 transition-colors hover:bg-emerald-50 md:hidden"
                >
                    <span className="sr-only">Toggle menu</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                        {isMenuOpen ? (
                            <path
                                d="M6 6l12 12M18 6 6 18"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            />
                        ) : (
                            <path
                                d="M4 7h16M4 12h16M4 17h16"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            />
                        )}
                    </svg>
                </button>
            </div>

            <div
                className={`${isMenuOpen ? "max-h-128 opacity-100" : "max-h-0 opacity-0"} overflow-hidden border-t border-emerald-100 bg-white/95 px-4 transition-all duration-300 ease-out md:hidden`}
            >
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 py-4">
                    <nav className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                aria-current={isActiveLink(item.href) ? "page" : undefined}
                                className={mobileNavLinkClassName(item.href)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Link
                            href="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-full border border-emerald-200 bg-white px-5 py-3 text-center text-sm font-semibold text-emerald-800 shadow-sm shadow-emerald-950/5 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-full bg-emerald-700 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-700/25 transition-all duration-300 hover:bg-emerald-800"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}