import Link from "next/link";
import NewsLetterSection from "./news-letter";
import { Backpack } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { label: "Packages", href: "/packages" },
            { label: "Destinations", href: "/destinations" },
            { label: "About Us", href: "/about" },
            { label: "Contact", href: "/contact" },
        ],
        company: [
            { label: "About", href: "/about" },
            { label: "Gallery", href: "/gallery" },
            { label: "Careers", href: "/careers" },
            { label: "Press", href: "/press" },
        ],
        support: [
            { label: "Help Center", href: "#" },
            { label: "FAQ", href: "#" },
            { label: "Support", href: "/contact" },
            { label: "Booking", href: "/booking" },
        ],
        legal: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Cookie Policy", href: "#" },
            { label: "Refund Policy", href: "#" },
        ],
    };

    const socialLinks = [
        { name: "Facebook", href: "#", icon: "f" },
        { name: "Instagram", href: "#", icon: "i" },
        { name: "Twitter", href: "#", icon: "t" },
        { name: "LinkedIn", href: "#", icon: "in" },
    ];

    return (
        <footer className="border-t border-emerald-950/10 bg-linear-to-b from-white via-emerald-50/30 to-white">
            <NewsLetterSection />

            <div className="mx-auto flex w-full flex-col gap-12 px-4 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-8">
                <div className="lg:max-w-md">
                    <Link href="/" className="group mb-6 inline-flex items-center gap-3">
                        <div className="rounded-lg bg-emerald-600 p-2 text-white sm:rounded-xl sm:p-2.5 shadow-sm flex-shrink-0">
                            <Backpack size={20} className="sm:size-5" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">TripConnect</p>
                            <p className="text-xs text-slate-600">Travel Booking</p>
                        </div>
                    </Link>
                    <p className="text-sm leading-6 text-slate-600">
                        Discover Nepal&apos;s best travel packages with curated experiences, expert guides, and seamless booking for unforgettable adventures.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                aria-label={social.name}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white"
                            >
                                <span className="text-sm font-semibold">{social.icon}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:flex lg:flex-1 lg:justify-between lg:gap-12">
                    <div className="min-w-35">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Product</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-600 transition-colors hover:text-emerald-700 hover:font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="min-w-35">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Company</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-600 transition-colors hover:text-emerald-700 hover:font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="min-w-35">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Support</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-600 transition-colors hover:text-emerald-700 hover:font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="min-w-35">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Legal</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-600 transition-colors hover:text-emerald-700 hover:font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex flex-col items-center justify-center px-4 pb-8 text-center lg:px-8">
                <p className="text-sm leading-6 text-slate-600">
                    © {currentYear} TripConnect. All rights reserved. | Discover Nepal&apos;s best travel experiences.
                </p>
            </div>
        </footer>
    );
}