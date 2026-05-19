import Footer from "../_components/footer";
import NavBar from "../_components/navbar";

export default function HomePage() {
    return (
         <div className="relative bg-linear-to-br from-emerald-50 via-white to-lime-50">
            <NavBar />
            <Footer/>
        </div>
    );
}