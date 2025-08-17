"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  basePath: string; // ж: "/360/cup"
  totalFrames: number; // ж: 36
  zeroPad?: number; // 4 => 0001
  filePrefix?: string; // ж: ""
  ext?: "jpg" | "jpeg" | "png" | "webp";
  dragSensitivity?: number; // хэдэн px тутамд 1 frame
  autoplay?: boolean;
  fps?: number;
  reverse?: boolean;
  className?: string;
};

export default function Image360Viewer({
  basePath,
  totalFrames,
  zeroPad = 4,
  filePrefix = "",
  ext = "jpg",
  dragSensitivity = 5,
  autoplay = false,
  fps = 24,
  reverse = false,
  className = "",
}: Props) {
  const [frame, setFrame] = useState(0);
  const [loaded, setLoaded] = useState(0);

  const isDragging = useRef(false);
  const lastX = useRef(0);
  const accum = useRef(0);
  const velocity = useRef(0);
  const raf = useRef<number | null>(null);

  const srcFor = (i: number) =>
    `${basePath}/${filePrefix}${String(i + 1).padStart(zeroPad, "0")}.${ext}`;

  // Preload бүх кадр
  useEffect(() => {
    let cancelled = false;
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = srcFor(i);
      img.onload = img.onerror = () => {
        if (!cancelled) setLoaded((v) => Math.min(totalFrames, v + 1));
      };
    }
    return () => {
      cancelled = true;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [basePath, totalFrames, zeroPad, filePrefix, ext]);

  // Autoplay (сонголтоор)
  useEffect(() => {
    if (!autoplay) {
      return () => {};
    }
    let then = performance.now();
    const interval = 1000 / fps;
    const tick = (now: number) => {
      if (now - then >= interval) {
        then = now;
        setFrame((f) => (f + (reverse ? -1 : 1) + totalFrames) % totalFrames);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [autoplay, fps, reverse, totalFrames]);

  const advanceBy = (delta: number) => {
    setFrame((f) => (((f + delta) % totalFrames) + totalFrames) % totalFrames);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    accum.current = 0;
    lastX.current = e.clientX;
    velocity.current = 0;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    accum.current += dx;
    velocity.current = 0.8 * velocity.current + 0.2 * dx;

    const steps = Math.trunc(accum.current / dragSensitivity);
    if (steps !== 0) {
      advanceBy(reverse ? steps : -steps);
      accum.current -= steps * dragSensitivity;
    }
  };

  const startInertia = () => {
    const decay = 0.95;
    const step = () => {
      velocity.current *= decay;
      if (Math.abs(velocity.current) < 0.1) {
        if (raf.current) cancelAnimationFrame(raf.current);
        raf.current = null;
        return;
      }
      accum.current += velocity.current;
      const steps = Math.trunc(accum.current / dragSensitivity);
      if (steps !== 0) {
        advanceBy(reverse ? steps : -steps);
        accum.current -= steps * dragSensitivity;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    startInertia();
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      className={`relative select-none touch-none ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <img
        src={srcFor(frame)}
        alt="360° view"
        className="w-full h-auto block"
        draggable={false}
      />
      {loaded < totalFrames && (
        <div className="absolute inset-0 grid place-items-center text-sm bg-black/20">
          <div>{Math.round((loaded / totalFrames) * 100)}%</div>
        </div>
      )}
    </div>
  );
}
