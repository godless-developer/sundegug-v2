import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeComponent from "./components/Home";
import Locations from "./components/Locations";
import Menu from "./components/Menu";
import Services from "./components/Services";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-white justify-start w-full overflow-x-hidden">
      <Header />
      <HomeComponent />
      <Menu />
      <Services />
      <Locations />
      <About />
      <Footer />
    </div>
  );
}
