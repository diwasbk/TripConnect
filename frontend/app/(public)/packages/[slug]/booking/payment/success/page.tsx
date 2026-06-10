import NavBar from "@/app/(public)/_components/navbar";
import SuccessSection from "./_components/success-section";
import Footer from "@/app/(public)/_components/footer";

export default function Page() {
    return (
         <div className="relative bg-linear-to-br from-emerald-50 via-white to-lime-50">
            <NavBar />
            <SuccessSection/>
            <Footer/>
        </div>
    );
}