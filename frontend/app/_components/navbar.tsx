import Link from "next/link";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "Destinations", href: "/destinations" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function NavBar() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b border-emerald-500/10 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="group flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-sm font-black text-white shadow-lg shadow-emerald-700/25 transition-transform duration-300 group-hover:-translate-y-0.5">
                            TC
                        </span>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">TripConnect</p>
                            <p className="text-sm text-slate-600">Nepal travel specialists</p>
                        </div>
                    </Link>

                    <nav className="flex flex-wrap items-center gap-1 rounded-full border border-emerald-100 bg-white px-2 py-2 text-sm font-medium text-slate-600 shadow-sm shadow-emerald-950/5">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="rounded-full px-4 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
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
                </div>
            </header>
        </div>
    );
}