"use client";
import { useState } from "react";
import RollingGallery from "../ReactBits/ShinyText/RollingGallery";
import ShinyText from "../ReactBits/ShinyText/ShinyText";

export default function About() {
  const [showMore, setShowMore] = useState(false);

  const longText = `Sunde Gug Korean Restaurant, which was first established in South Korea in 2005, has now become a well-respected and popular restaurant chain with over 10 branches in the country. In 2023, we opened our first international franchise branch in Mongolia, bringing Korean flavors closer to Mongolians. Today, our restaurant has 3 branches in Ulaanbaatar and our mission is to provide everyone with a warm atmosphere and authentic Korean flavors. All of our dishes are prepared daily with fresh, high-quality ingredients, vegetables, and meat. However, Sunde Gug is not just a restaurant, it is a passion for people. We value our employees and create a comfortable environment. We have a policy of rewarding our best employees with a trip 1-2 times a year and supporting and developing new employees. Since our restaurant started operating in Mongolia, many famous Korean artists and celebrities have come to visit us, which is a reflection of our quality and reputation. By visiting Sunde Gug, you will not only enjoy delicious food, but also experience the warm atmosphere, sincere service, and new flavors of Korea. We are a young team that buys new quality products from more than 80 suppliers and expands our sales, while paying taxes and VAT on time and fulfilling our social responsibility.`;

  const previewLength = 300; // эхэнд харагдах тэмдэгтүүдийн тоо

  return (
    <div
      className="w-full h-full flex flex-col justify-start pt-20 items-center gap-10"
      id="about"
    >
      <ShinyText
        text="About Us"
        disabled={false}
        speed={2}
        className="md:text-[60px] text-[30px] font-bold"
      />
      <p className="text-justify-smooth">
        We serve our customers fresh, delicious food every day, create a
        comfortable environment, and provide friendly service.
      </p>
      <RollingGallery />
      <p className="text-justify-smooth">
        {showMore ? longText : `${longText.slice(0, previewLength)}...`}
        <button
          className="mt-2 text-blue-500 font-semibold hover:underline"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </p>
    </div>
  );
}

// Бид үйлчлүүлэгчиддээ өдөр бүр шинэ амт чанартай хоолоор үйлчлэн, аятай
//         тухтай орчныг бүрдүүлэн, эелдэг найрсаг үйлчилгээг эрхэмлэн ажиллаж
//         байна.

// 2005 онд Өмнөд Солонгост анх байгуулагдсан Sunde Gug Korean Restaurant
// нь өнөөдөр тус улсад 10 гаруй салбартай, хайр хүндэтгэлийг хүлээсэн
// алдартай сүлжээ ресторан болсон билээ. 2023 онд бид анхны олон улсын
// франчайз салбараа Монгол Улсад нээж, солонгос амтыг монголчууддаа улам
// ойртуулж бахархам түүхийг эхлүүлсэн. Өнөөдөр манай ресторан нь
// Улаанбаатар хотод 3 салбартай бөгөөд хүн бүрт халуун дулаан уур амьсгал,
// жинхэнэ солонгос амтыг мэдрүүлэхийг эрхэм зорилгоо болгон ажилладаг.
// Манай бүх хоол өдөр бүр шинэхэн, чанартай хүнс, ногоо, махаар
// бэлтгэгддэгээрээ онцлогтой. Гэвч Sunde Gug зөвхөн хоолны газар биш энэ
// бол хүмүүсийн төлөөх сэтгэл юм. Бид ажилчдаа үнэлж, ая тухтай орчныг
// бүрдүүлэхийг чухалчилдаг. Жилд 1–2 удаа хамгийн шилдэг ажилтнуудаа
// аяллаар шагнах, шинэ ажилчдаа дэмжиж хөгжүүлэх бодлоготой. Манай
// ресторан Монголд үйл ажиллагаагаа эхлүүлснээс хойш олон Солонгосын
// алдартай уран бүтээлчид, олны танил хүмүүс зорьж ирэн үйлчлүүлдэг нь
// бидний чанар, нэр хүндийн илэрхийлэл юм. Sunde Gug-д зочилсоноор та
// зөвхөн амттай хоол идэхээр зогсохгүй харин Солонгос орны халуун дулаан
// уур амьсгал, чин сэтгэлтэй үйлчилгээ, шинэ амтыг мэдрэх болно. 80 гаруй
// харилцагч нийлүүлэгчээс шинэ чанартай бараа бүтээгдэхүүнийг худалдан авч
// борлуулалтаа өргөжүүлэхийн сацуу татвар, НДШимтгэлийг цаг тухай бүрт
// төлж, нийгмийн хариуцлагаа биелүүлж яваа залуу хамт олон юм.
