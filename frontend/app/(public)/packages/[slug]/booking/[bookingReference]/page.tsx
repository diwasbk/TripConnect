"use client";
import { useParams } from "next/navigation";
import Footer from "../../../../_components/footer";
import NavBar from "../../../../_components/navbar";
import { BiCheckCircle } from "react-icons/bi";

export default function Page() {
    const params = useParams();
    const bookingReference = params?.bookingReference as string;

    const booking = {
        fullName: "Diwas Bishwokarma",
        email: "diwas@gmail.com",
        phone: "9876543210",
        specialRequest: "Yes I want window seat",
        bookingReference: "TRIP965896",
        packageName: "Pokhara Adventure Trip",
        travelDate: new Date("2026-07-14T00:00:00Z").toDateString(),
        duration: "5 Days / 4 Nights",
        destination: "Pokhara, Nepal",
        numberOfTravelers: 2,
        originalAmount: 50000,
        discountAmount: 10000,
        paymentMethod: "esewa",
        promoCode: "TRIP2026",
        totalPaidAmount: 40000,
        paymentStatus: "completed",
    };

    return (
        <div className="relative bg-linear-to-br from-emerald-50 via-white to-lime-50">
            <NavBar />
            <section aria-labelledby="booking-heading" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="w-full">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Booking Details</p>
                    <h1 id="booking-heading" className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">View your booking and payment information</h1>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start">
                    <div>
                        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg sm:p-8">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">Booking Overview</p>
                                    <p className="mt-2 font-mono text-sm text-slate-700">{booking.bookingReference}</p>
                                </div>
                                <div className="text-sm text-slate-600">
                                    <p className="font-semibold">Booking Date</p>
                                    <p className="mt-1">{new Date().toDateString()}</p>
                                </div>
                            </div>

                            <div className="mb-6 rounded-lg border border-slate-100 bg-emerald-50 p-4">
                                <p className="text-sm font-semibold text-slate-800">Traveler Information</p>
                                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-2">
                                    <div>
                                        <p className="mb-1"><span className="font-semibold">Name:</span> {booking.fullName}</p>
                                        <p className="mb-1"><span className="font-semibold">Email:</span> {booking.email}</p>
                                        <p className="mb-1"><span className="font-semibold">Phone:</span> {booking.phone}</p>
                                    </div>
                                    <div>
                                        <p className="mb-1"><span className="font-semibold">Travel Date:</span> {booking.travelDate}</p>
                                        <p className="mb-1"><span className="font-semibold">Number of Travelers:</span> {booking.numberOfTravelers}</p>
                                        <p className="mb-1"><span className="font-semibold">Special Request:</span> {booking.specialRequest}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 rounded-lg border border-slate-100 bg-white p-4">
                                <p className="text-sm font-semibold text-slate-800">Payment Details</p>
                                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-2">
                                    <div>
                                        <p className="mb-1"><span className="font-semibold">Original Amount:</span> NPR {booking.originalAmount}</p>
                                        <p className="mb-1"><span className="font-semibold">Discount Amount:</span> NPR {booking.discountAmount}</p>
                                        <p className="mb-1"><span className="font-semibold">Payment Method:</span> {booking.paymentMethod}</p>
                                    </div>
                                    <div>
                                        <p className="mb-1"><span className="font-semibold">Promo Code:</span> {booking.promoCode}</p>
                                        <p className="mb-1"><span className="font-semibold">Total Paid Amount:</span> NPR {booking.totalPaidAmount}</p>
                                        <p className="mb-1"><span className="font-semibold">Payment Status:</span> {booking.paymentStatus}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside>
                        <div className="overflow-hidden rounded-4xl bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-900 p-8 text-white shadow-lg shadow-emerald-900/20">
                            <h3 className="text-sm font-semibold text-emerald-200">Package Details</h3>
                            <h2 className="mt-2 text-xl font-bold text-white">{booking.packageName}</h2>
                            <p className="mt-1 text-sm text-emerald-50/90">{booking.destination}</p>

                            <div className="mt-4 space-y-2 text-sm text-emerald-50/90">
                                <p><strong className="text-white">Duration:</strong> <span className="font-medium text-white">{booking.duration}</span></p>
                                <p><strong className="text-white">Price (per person):</strong> <span className="font-medium text-white">NPR {Math.round(booking.originalAmount / booking.numberOfTravelers)}</span></p>
                                <p className="mt-2 font-semibold text-emerald-200">What's included</p>
                                <ul className="mt-1 space-y-1 text-emerald-50/90">
                                    {[
                                        "Hotel Accommodation",
                                        "Daily Breakfast",
                                        "Sightseeing as per itinerary",
                                        "Transportation",
                                        "Tour Guide",
                                        "All taxes & service charge",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <BiCheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-50/90" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className=" pt-4">
                                <p className="text-sm text-emerald-200">Need Help?</p>
                                <p className="mt-1 text-xs text-emerald-50/90">If you have any questions regarding booking, please <a href="/contact" className="font-semibold text-white underline">contact us</a>.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
            <Footer />
        </div>
    );
}