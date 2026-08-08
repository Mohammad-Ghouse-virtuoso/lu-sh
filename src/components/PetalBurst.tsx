"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type PetalBurstProps = {
  active: boolean;
};

const PETAL_SRCS = [
  "/wedding/flowers/red-bouquet.webp",
  "/wedding/flowers/lilac-hang.webp",
  "/wedding/flowers/rose-bush.webp",
];

export function PetalBurst({ active }: PetalBurstProps) {
  const prefersReduced = useReducedMotion();

  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: 8 + ((i * 17) % 84),
        delay: (i % 7) * 0.12,
        duration: 4.2 + (i % 5) * 0.35,
        size: 18 + (i % 4) * 8,
        rotate: -40 + (i % 9) * 12,
        src: PETAL_SRCS[i % PETAL_SRCS.length],
        drift: -30 + (i % 6) * 12,
      })),
    [],
  );

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {active && (
        <div
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
          aria-hidden
        >
          {petals.map((p) => (
            <motion.img
              key={p.id}
              src={p.src}
              alt=""
              initial={{
                opacity: 0,
                y: -40,
                x: 0,
                rotate: p.rotate,
              }}
              animate={{
                opacity: [0, 0.55, 0.35, 0],
                y: ["0vh", "95vh"],
                x: [0, p.drift],
                rotate: p.rotate + 80,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeIn",
              }}
              className="absolute top-0 object-contain"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
