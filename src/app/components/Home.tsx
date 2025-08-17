"use client";
import Image from "next/image";
import ShinyText from "../ReactBits/ShinyText/ShinyText";
import { motion } from "framer-motion";

export default function HomeComponent() {
  return (
    <div
      id="home"
      className="flex flex-col md:flex-row w-full container items-center justify-center md:justify-between min-h-screen px-4 md:px-10"
    >
      {/* Text хэсэг */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center md:justify-end  items-center text-center md:text-start mt-6 md:mt-0"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <ShinyText
          text="Welcome to Kwon Gu Sung Sundegugpub"
          disabled={false}
          speed={2}
          className="text-3xl mt-40 sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        />
      </motion.div>

      {/* Зураг хэсэг */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center p-4 sm:p-10"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Image
          src="/menu/kamjatan-shol-ai.png"
          alt="homepng"
          width={800}
          height={800}
          className="max-w-full h-auto object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
