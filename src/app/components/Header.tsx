"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "Services", href: "#services" },
    { name: "Locations", href: "#locations" },
    { name: "About", href: "#about" },
  ];
  return (
    <header className="w-full h-16 text-white flex items-center justify-between font-sans px-6 md:px-20 fixed z-[9999]">
      {/* Background Blur */}
      <div className="flex items-center w-full h-full rounded-b-[30px] bg-white/5 backdrop-blur-[4px] justify-between container px-6 md:px-50">
        {/* Logo */}
        <h1 className="text-lg md:text-xl font-semibold">Logo</h1>
        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-10 font-extralight">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-yellow-400 transition"
              >
                {link.name}
              </a>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          <Menu size={28} className="cursor-pointer" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {/* Mobile Menu Drawer */}
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-2/3 h-[300px] overflow-y-auto rounded-l-[20px] bg-[#79443B]/20 backdrop-blur-lg p-6 z-[9999] flex flex-col space-y-6"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-white hover:text-yellow-400 transition"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
