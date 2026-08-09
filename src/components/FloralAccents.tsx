"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useInvite } from "./InviteProvider";

/**
 * Restrained floral accents - corners + soft float only.
 * Not a wallpaper. Luxury = negative space + a few well-placed blooms.
 */
export function FloralAccents() {
  const { reducedMotion } = useInvite();

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden>
      {/* Top hanging corners - plum / blush peonies */}
      <Float reduced={reducedMotion} delay={0} className="absolute -left-6 -top-2 w-[42vw] max-w-[190px] opacity-[0.42] sm:-left-4 sm:w-[170px] sm:opacity-[0.48]">
        <Image
          src="/wedding/flowers/corner-hang.webp"
          alt=""
          width={190}
          height={252}
          className="h-auto w-full object-contain"
          draggable={false}
        />
      </Float>
      <Float reduced={reducedMotion} delay={1.2} className="absolute -right-6 -top-2 w-[42vw] max-w-[190px] -scale-x-100 opacity-[0.42] sm:-right-4 sm:w-[170px] sm:opacity-[0.48]">
        <Image
          src="/wedding/flowers/corner-hang.webp"
          alt=""
          width={190}
          height={252}
          className="h-auto w-full object-contain"
          draggable={false}
        />
      </Float>

      {/* Mid-page soft rose trails - right edge near names zone */}
      <Float reduced={reducedMotion} delay={0.6} className="absolute right-[-18px] top-[38%] hidden w-[88px] opacity-[0.28] sm:block sm:opacity-[0.34]">
        <Image
          src="/wedding/flowers/corner-roses.webp"
          alt=""
          width={88}
          height={130}
          className="h-auto w-full object-contain"
          draggable={false}
        />
      </Float>
      <Float reduced={reducedMotion} delay={1.8} className="absolute left-[-18px] top-[52%] hidden w-[88px] -scale-x-100 opacity-[0.26] sm:block sm:opacity-[0.32]">
        <Image
          src="/wedding/flowers/corner-roses.webp"
          alt=""
          width={88}
          height={130}
          className="h-auto w-full object-contain"
          draggable={false}
        />
      </Float>

      {/* Bottom corners - watercolor red bouquet, soft */}
      <Float reduced={reducedMotion} delay={0.4} className="absolute -bottom-2 -left-8 w-[46vw] max-w-[200px] opacity-[0.38] sm:-left-6 sm:w-[180px] sm:opacity-[0.44]">
        <Image
          src="/wedding/flowers/bouquet-red.webp"
          alt=""
          width={200}
          height={206}
          className="h-auto w-full object-contain"
          draggable={false}
        />
      </Float>
      <Float reduced={reducedMotion} delay={1.5} className="absolute -bottom-2 -right-8 w-[46vw] max-w-[200px] -scale-x-100 opacity-[0.38] sm:-right-6 sm:w-[180px] sm:opacity-[0.44]">
        <Image
          src="/wedding/flowers/bouquet-red.webp"
          alt=""
          width={200}
          height={206}
          className="h-auto w-full object-contain"
          draggable={false}
        />
      </Float>
    </div>
  );
}

function Float({
  children,
  className = "",
  delay = 0,
  reduced,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      className={className}
      animate={
        reduced
          ? undefined
          : { y: [0, -5, 0, 4, 0], rotate: [0, -1.2, 0, 1, 0] }
      }
      transition={
        reduced
          ? undefined
          : { duration: 9 + delay, repeat: Infinity, ease: "easeInOut", delay }
      }
    >
      {children}
    </motion.div>
  );
}

/** Gold filigree divider - use between sections */
export function GoldFlourish({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex justify-center ${className}`} aria-hidden>
      <Image
        src="/wedding/flowers/gold-flourish.webp"
        alt=""
        width={220}
        height={52}
        className="h-auto w-[min(58vw,220px)] object-contain opacity-80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        draggable={false}
      />
    </div>
  );
}
