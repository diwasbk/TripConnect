import Footer from "./(public)/_components/footer";
import NavBar from "./(public)/_components/navbar";
import HomePage from "./(public)/home/page";

export default function Page() {
  return (
    <div>
      <NavBar/>
      <HomePage/>
      <Footer/>
    </div>
  );
}