import { Clock, MapPin, Phone, PhoneCallIcon } from "lucide-react";
import ShinyText from "../ReactBits/ShinyText/ShinyText";
import SpotlightCard from "../ReactBits/ShinyText/SpotLightCard";

export default function Locations() {
  return (
    <div
      className="w-full h-full flex flex-col gap-30 pt-30 justify-center items-center"
      id="locations"
    >
      <ShinyText
        text="Our Locations"
        disabled={false}
        speed={2}
        className="md:text-[60px] text-[30px] font-bold"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-center items-center place-items-center">
        <SpotlightCard
          className=" w-[340px] h-[340px] flex flex-col items-end justify-center"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <div className="bg-[url('/location/loc1.png')] bg-cover bg-center w-full h-full"></div>

          <div className="text-center backdrop-blur-[6px] p-2 w-full h-[220px]">
            <p>Төв Салбар</p>
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 inline-block mr-2" />
                <p className="text-gray-400">СБД 2-р хороо 1а байр 2 тоот</p>
              </div>
              <div className="flex items-center justify-start">
                <Phone className="w-4 h-4 inline-block mr-2" />
                <p className="text-gray-400">(+976)90303035, (+976)88026093</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 inline-block mr-2" />
                <p className="text-gray-400">9:00 - 00:00 Өдөр бүр</p>
              </div>
            </div>
          </div>
        </SpotlightCard>
        <SpotlightCard
          className="w-[340px] h-[340px] flex flex-col items-end justify-center"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <div className="bg-[url('/location/loc2.png')] bg-cover bg-center w-full h-full"></div>
          <div className="text-center backdrop-blur-[6px] p-2 w-full h-[220px]">
            <p>Баянгол Салбар</p>
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <MapPin size={32} />
                <p className="text-gray-400">
                  БГД 27-р хороо Емарт-ын замын урд, Тэнүүн3 барилгын 1 давхарт
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 inline-block mr-2" />
                <p className="text-gray-400">(+976) 77393579</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 inline-block mr-2" />
                <p className="text-gray-400">10:00 - 22:00 Өдөр бүр</p>
              </div>
            </div>
          </div>
        </SpotlightCard>
        <SpotlightCard
          className="w-[340px] h-[340px] flex flex-col items-end justify-center"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <div className="bg-[url('/location/loc4.png')] bg-cover bg-center w-full h-full"></div>
          <div className="text-center backdrop-blur-[6px] p-2 w-full h-[200px] rounded-b-lg">
            <p>Хан-Уул Салбар</p>
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <MapPin size={32} />
                <p className="text-gray-400">
                  ХУД 3-р хороо Чингисийн өргөн чөлөө-94 Бармаш оффис 1 давхарт
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 inline-block mr-2" />
                <p className="text-gray-400">
                  (+976) 91916307, (+976) 77776959
                </p>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 inline-block mr-2" />
                <p className="text-gray-400">9:00 - 00:00 Өдөр бүр</p>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
