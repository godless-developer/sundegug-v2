import { ReactNode } from "react";
import ShinyText from "../ReactBits/ShinyText/ShinyText";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const menuDatas = require("@/lib/menuDatas.json");

export default function Menu() {
  return (
    <div
      className="w-full h-full flex justify-center items-start pt-20"
      id="menu"
    >
      <div className="w-full h-full flex flex-col justify-start gap-20 items-center md:p-20">
        <ShinyText
          text="Our Menu"
          disabled={false}
          speed={2}
          className="md:text-[60px] text-[30px] font-bold"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 ">
          {menuDatas
            .slice(0, 3)
            .map(
              (food: {
                description: ReactNode;
                _id: React.Key | null | undefined;
                name: string;
                price: number;
                image: string;
                category: any;
              }) => (
                <div
                  key={food._id}
                  className={`rounded-lg cursor-pointer flex flex-col w-[280px]  items-center duration-200 ease-in-out transition border border-transparent
                }`}
                >
                  <img
                    src={food.image}
                    alt={typeof food.name === "string" ? food.name : ""}
                    className={`rounded-t-lg h-48 object-cover ${
                      food.category === "Drinks" ? "w-50" : "w-full"
                    }`}
                  />
                  <div
                    className={`flex flex-col items-center text-center duration-200 ease-in-out  backdrop-blur-md rounded-b-lg p-3  w-full h-full`}
                  >
                    <h1 className="font-semibold text-xl">{food.name}</h1>
                    <p className="text-[14px] tracking-tighter text-gray-300 mb-2">
                      {food.description}
                    </p>
                    <div className="flex justify-between w-full items-center mt-auto">
                      <p className={` text-sm duration-200 ease-in-out`}>
                        {food.category}
                      </p>
                      <p className="text-sm font-semibold text-gray-500">
                        {food.price.toLocaleString()}₮
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
        <a href="/menu">
          <ShimmerButton
            shimmerSize="2px"
            shimmerColor="#ff9102"
            background="[#79443B]/20"
            className="text-white text-lg font-meduim px-6 rounded-lg backdrop-blur-[4px] shadow-lg"
          >
            View full menu
          </ShimmerButton>
        </a>
      </div>
    </div>
  );
}
