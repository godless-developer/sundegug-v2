import { LucideFacebook, LucideInstagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full h-full flex flex-col items-center justify-center  container rounded-t-4xl  text-white gap-2 mx-auto px-6  md:px-20">
      <div className="flex flex-col items-center w-full h-full gap-2 rounded-t-[30px] bg-white/5 backdrop-blur-[4px] justify-between container px-2 md:px-50 py-2 md:py-8">
        <p>© 2025 Kwon Gu Sung. All rights reserved.</p>
        <div className="flex md:flex-row items-center justify-between w-full">
          <p className="w-[60%]">Privacy Policy | Terms of Service</p>
          <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-auto gap-3">
            <p className="ml-4">Follow us on social media</p>
            <div className="flex space-x-4 ml-4 justify-center items-center">
              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61550947382432"
                className="text-white hover:text-yellow-400"
              >
                <LucideFacebook size={24} color="blue" />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/kwon_gu_sung_sundegugbab/"
                className="text-white hover:text-yellow-400"
              >
                <LucideInstagram size={24} color="purple" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
