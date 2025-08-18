"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
  ResolvedValues,
} from "motion/react";

const IMGS: string[] = [
  "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=1200&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=1200&auto=format&fit=crop",
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  const galleryImages = images.length > 0 ? images : IMGS;

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 640);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // responsive тохиргоо
  // responsive тохиргоо
  const cylinderWidth: number = isMobile ? 500 : 1100;
  const faceCount: number = galleryImages.length;

  // mobile үед fixed өргөн өгч, desktop дээр dynamic
  const faceWidth: number = isMobile
    ? 280 // mobile → нэг зураг + хоёр талдаа жаахан цухуйна
    : (cylinderWidth / faceCount) * 3.5;

  const radius: number = isMobile
    ? (faceWidth * faceCount) / (2.4 * Math.PI)
    : (faceWidth * faceCount) / (2.6 * Math.PI);

  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val: number) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 25, // бага зэрэг удаашруулж smooth болгов
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest: ResolvedValues) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) controls.stop();
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div className="flex h-full items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0.1} // бага elastic → smooth
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[250px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[6%] [backface-visibility:hidden]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt="gallery"
                className={`pointer-events-none rounded-[15px] border border-white object-cover transition-transform duration-300 ease-out group-hover:scale-105
                  ${isMobile ? "h-[260px] w-[340px]" : "h-[200px] w-[300px]"}`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
