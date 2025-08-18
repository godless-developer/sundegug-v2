import RollingGallery from "../ReactBits/ShinyText/RollingGallery";
import ShinyText from "../ReactBits/ShinyText/ShinyText";

export default function About() {
  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center "
      id="about"
    >
      <ShinyText
        text="Our Locations"
        disabled={false}
        speed={2}
        className="md:text-[60px] text-[30px] font-bold"
      />
      <RollingGallery autoplay={false} pauseOnHover={false} />
    </div>
  );
}
