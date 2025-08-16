import ShinyText from "../ReactBits/ShinyText/ShinyText";

export default function Menu() {
  return (
    <div
      className="w-full h-screen flex justify-center items-start pt-20"
      id="menu"
    >
      <div className="w-full h-full flex justify-center items-start p-20">
        <ShinyText
          text="Our Menu"
          disabled={false}
          speed={2}
          className="text-[60px] font-bold"
        />
      </div>
    </div>
  );
}
