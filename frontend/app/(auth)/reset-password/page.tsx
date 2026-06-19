import NavBar from "@/app/(public)/_components/navbar";
import ResetPasswordSection from "./_components/reset-password-section";
import { Footer } from "react-day-picker";

export default function HomePage() {
    return (
        <div className="relative bg-linear-to-br from-emerald-50 via-white to-lime-50">
            <NavBar />
            <ResetPasswordSection />
            <Footer />
        </div>
    );
}