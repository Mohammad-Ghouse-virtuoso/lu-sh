"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type ConfettiBurstProps = {
  active: boolean;
};

const COLORS = ["#C9A45C", "#E5D0A0", "#B8924A", "#F3E8D0", "#D4AF37"];

export function ConfettiBurst({ active }: ConfettiBurstProps) {
  const prefersReduced = useReducedMotion();

  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: 8 + ((i * 23) % 84),
        delay: (i % 8) * 0.04,
        duration: 1.8 + (i % 5) * 0.25,
        size: 5 + (i % 4) * 2,
        rotate: (i * 47) % 360,
        drift: -40 + (i % 9) * 10,
        color: COLORS[i % COLORS.length],
        round: i % 3 === 0,
      })),
    [],
  );

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {active && (
        <div
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          aria-hidden
        >
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              className="absolute top-[38%]"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.round ? p.size : p.size * 1.6,
                backgroundColor: p.color,
                borderRadius: p.round ? 999 : 1,
                boxShadow: `0 0 6px ${p.color}55`,
              }}
              initial={{
                opacity: 0,
                y: 0,
                x: 0,
                rotate: p.rotate,
                scale: 0.6,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [0, -80 - (p.id % 5) * 18, 220 + (p.id % 4) * 40],
                x: [0, p.drift, p.drift * 1.4],
                rotate: p.rotate + 180 + (p.id % 3) * 40,
                scale: [0.6, 1, 0.9],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.22, 0.8, 0.3, 1],
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
