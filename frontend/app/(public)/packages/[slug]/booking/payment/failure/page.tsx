import Footer from "../../../../../_components/footer";
import NavBar from "../../../../../_components/navbar";
import FailureSection from "./_components/failure-section";

export default function Page() {
    return (
         <div className="relative bg-linear-to-br from-emerald-50 via-white to-lime-50">
            <NavBar />
            <FailureSection/>
            <Footer/>
        </div>
    );
}