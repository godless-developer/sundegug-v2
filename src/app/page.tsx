import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeComponent from "./components/Home";
import Locations from "./components/Locations";
import Menu from "./components/Menu";
import Services from "./components/Services";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/bg.webp"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-white md:gap-80 gap-40 justify-start w-full">
        <Header />
        <HomeComponent />
        <Menu />
        <Services />
        <Locations />
        <About />
        <Footer />
      </div>
    </div>
  );
}
