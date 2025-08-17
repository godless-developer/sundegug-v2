import { Clock, Phone, Star } from "lucide-react";
import ShinyText from "../ReactBits/ShinyText/ShinyText";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function Services() {
  return (
    <div
      className="w-full h-full flex flex-col justify-center gap-20 items-center"
      id="services"
    >
      <ShinyText
        text="Our Services"
        disabled={false}
        speed={2}
        className="text-3xl mt-40 sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            Icon: Clock,
            title: "Dine-In",
            desc: "Experience authentic Korean atmosphere",
          },
          {
            Icon: Phone,
            title: "Takeout",
            desc: "Quick and convenient pickup service",
          },
          {
            Icon: Star,
            title: "Catering",
            desc: "Perfect for events and celebrations",
          },
        ].map(({ Icon, title, desc }, idx) => (
          <div
            key={idx}
            className="text-center flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className="w-8 h-8 text-[#ff9102]" />
            </div>
            <h3 className="text-xl font-bold  mb-4">{title}</h3>
            <TypingAnimation
              duration={40}
              className="text-[16px] tracking-wide font-light text-gray-400"
            >
              {desc}
            </TypingAnimation>
          </div>
        ))}
      </div>
    </div>
  );
}
