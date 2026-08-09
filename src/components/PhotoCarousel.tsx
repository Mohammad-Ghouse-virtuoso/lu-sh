"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";

/** Full-bleed mood gallery - Zareqia-style soft swipe + dots */
export function PhotoCarousel() {
  const slides = WEDDING.gallery;
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const paused = useRef(false);

  const go = useCallback(
    (next: number) => {
      const len = slides.length;
      setIndex(((next % len) + len) % len);
    },
    [slides.length],
  );

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      setIndex((i) => (i + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [prefersReduced, slides.length]);

  const onTouchStart = (e: TouchEvent) => {
    paused.current = true;
    touchX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    window.setTimeout(() => {
      paused.current = false;
    }, 5000);
    if (start == null) return;
    const end = e.changedTouches[0]?.clientX;
    if (end == null) return;
    const delta = end - start;
    if (Math.abs(delta) < 40) return;
    go(index + (delta < 0 ? 1 : -1));
  };

  return (
    <motion.section
      className="relative px-0 py-10 sm:py-14"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      aria-roledescription="carousel"
      aria-label="Wedding moments"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <p className="mb-6 text-center font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.32em] text-[color:var(--gold)]">
        MOMENTS OF BLESSING
      </p>

      <div
        className="relative mx-auto w-full max-w-lg overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[3/4] w-full bg-[#12080a]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slides[index].src}
              className="absolute inset-0"
              initial={
                prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 1.04 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: prefersReduced ? 0.2 : 0.7, ease: "easeOut" }}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                sizes="(max-width: 512px) 100vw, 512px"
                className="object-cover"
                priority={index === 0}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e1018]/55 via-transparent to-[#0e1018]/25"
                aria-hidden
              />
            </motion.div>
          </AnimatePresence>

          {/* Thin gold frame */}
          <div
            className="pointer-events-none absolute inset-3 border border-[color:var(--gold)]/35 sm:inset-4"
            aria-hidden
          />
        </div>

        <div className="mt-5 flex items-center justify-center gap-2.5">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              onClick={() => {
                paused.current = true;
                go(i);
                window.setTimeout(() => {
                  paused.current = false;
                }, 5000);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-[color:var(--gold)]"
                  : "w-1.5 bg-[color:var(--champagne)]/35 hover:bg-[color:var(--champagne)]/55"
              }`}
            />
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-[28ch] px-6 text-center font-[family-name:var(--font-cormorant)] text-sm italic text-[color:var(--ivory)]/70">
          {slides[index].alt}
        </p>
      </div>
    </motion.section>
  );
}
