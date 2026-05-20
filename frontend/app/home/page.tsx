import Footer from "../_components/footer";
import HeroSection from "../_components/hero-section";
import NavBar from "../_components/navbar";

export default function HomePage() {
    return (
         <div className="relative bg-linear-to-br from-emerald-50 via-white to-lime-50">
            <NavBar />
            <HeroSection/>
            <Footer/>
        </div>
    );
}