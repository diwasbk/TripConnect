
import NavBar from "@/app/(public)/_components/navbar";
import BookingSection from "./_components/booking-section";
import Footer from "@/app/(public)/_components/footer";

export default function HomePage() {
    return (
         <div className="relative bg-linear-to-br from-emerald-50 via-white to-lime-50">
            <NavBar />
            <BookingSection/>
            <Footer/>
        </div>
    );
}