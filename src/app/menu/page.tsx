"use client";
import React, { ReactNode, useState, useEffect, useRef } from "react";
import { Menu, MinusCircle, ShoppingCart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AnimatePresence, motion } from "framer-motion";
const menuDatas = require("@/lib/menuDatas.json");

interface MenuItem {
  id: string;
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export default function FoodMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [open, setOpen] = useState(false);
  const categories = ["All", "Foods", "Soups", "Drinks"];

  // 🟢 Scroll-ийг хянах ref
  const mainRef = useRef<HTMLDivElement>(null);
  const navLinks = [{ name: "Home", href: "/#home" }];

  // LocalStorage-с сэргээх
  useEffect(() => {
    const stored = localStorage.getItem("selectedItems");
    if (stored) {
      setSelectedItems(JSON.parse(stored));
    }
  }, []);

  // Сонгосон хоол хадгалах
  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  // Category солигдсон үед scroll-ийг эхнээс нь
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedCategory]);

  const filteredMenu =
    selectedCategory === "All"
      ? menuDatas
      : menuDatas.filter(
          (item: { category: string }) => item.category === selectedCategory
        );

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const toggleSelect = (item: MenuItem) => {
    if (selectedItems.find((f) => f._id === item._id)) {
      setSelectedItems((prev) => prev.filter((f) => f._id !== item._id));
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const removeItem = (item: MenuItem) => {
    setSelectedItems((prev) => prev.filter((f) => f._id !== item._id));
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden text-white">
      {/* Fixed background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/bg.webp"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay зөвхөн drawer-ийн ард */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-[9998]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-[282px] h-[125px]  rounded-r-[20px] bg-[#79443B]/20 backdrop-blur-lg p-6 z-[9999] flex flex-col space-y-6"
            >
              <p className="text-nowrap">Kwon Gu Sung SundeGugPub</p>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border px-4 py-1.5 flex items-center justify-center text-[17px] rounded-full bg-white/30 text-center transition"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full shadow z-50 py-3 backdrop-blur-[8px] text-white">
        <div className="flex justify-between gap-1 items-center px-10 py-3">
          <button onClick={() => setOpen(!open)} className=" text-white">
            <Menu size={28} className="cursor-pointer" />
          </button>
          <p className="text-2xl font-stretch-200%">Menu</p>
          <div className="relative cursor-pointer z-50">
            <Popover>
              <PopoverTrigger>
                <ShoppingCart size={28} />
                {selectedItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {selectedItems.length}
                  </span>
                )}
              </PopoverTrigger>
              <PopoverContent className="border-none z-50 rounded-lg bg-black/85 shadow-lg w-80 text-white">
                <div className="rounded-lg w-full h-full backdrop-blur-md p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    Сонгосон хоолнууд
                  </h2>
                  {selectedItems.length > 0 ? (
                    <>
                      <ul className="space-y-2 mb-3 h-[400px] overflow-y-auto">
                        {selectedItems.map((item) => (
                          <li
                            key={item._id}
                            className="flex items-center gap-3 border p-2 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.price.toLocaleString()}₮
                              </p>
                            </div>
                            <MinusCircle
                              color="red"
                              size={20}
                              className="cursor-pointer"
                              onClick={() => removeItem(item)}
                            />
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Нийт:</span>
                        <span>{totalPrice.toLocaleString()}₮</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500">
                      Одоогоор хоол сонгогдоогүй байна
                    </p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 px-5 overflow-x-auto z-50 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full border text-sm whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#3B3C36] text-green-500 border-[#3B3C36]"
                  : "bg-none text-white border-[#3B3C36]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-[112px] p-4 flex justify-center">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
          ref={mainRef}
        >
          {filteredMenu.map(
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
                onClick={() =>
                  toggleSelect({
                    id: String(food._id),
                    _id: String(food._id),
                    name: String(food.name ?? ""),
                    price:
                      typeof food.price === "string"
                        ? Number(food.price)
                        : food.price,
                    image: typeof food.image === "string" ? food.image : "",
                    category: food.category,
                  })
                }
                className={`rounded-lg cursor-pointer flex flex-col w-[280px]  items-center duration-200 ease-in-out transition ${
                  selectedItems.find((f) => f.id === String(food._id))
                    ? "border-green-500 border"
                    : "border border-transparent"
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
                  className={`flex flex-col items-center text-center duration-200 ease-in-out ${
                    selectedItems.find((f) => f.id === String(food._id)) &&
                    "bg-white/10"
                  } backdrop-blur-md rounded-b-lg p-3  w-full h-full`}
                >
                  <h1 className="font-semibold text-xl">{food.name}</h1>
                  <p className="text-[14px] tracking-tighter text-gray-300 mb-2">
                    {food.description}
                  </p>
                  <div className="flex justify-between w-full items-center mt-auto">
                    <p
                      className={`${
                        selectedItems.find((f) => f.id === String(food._id)) &&
                        "text-green-500"
                      } text-sm duration-200 ease-in-out`}
                    >
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
      </main>
    </div>
  );
}
