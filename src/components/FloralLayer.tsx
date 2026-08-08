"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInvite } from "./InviteProvider";

type FloralLayerProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  float?: boolean;
  delay?: number;
  mirror?: boolean;
  priority?: boolean;
};

export function FloralLayer({
  src,
  alt = "",
  className = "",
  width = 200,
  height = 200,
  float = true,
  delay = 0,
  mirror = false,
  priority = false,
}: FloralLayerProps) {
  const { reducedMotion } = useInvite();

  const animate =
    float && !reducedMotion
      ? {
          y: [0, -4, 0, 4, 0],
          rotate: [0, -1.5, 0, 1.5, 0],
        }
      : undefined;

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ scaleX: mirror ? -1 : 1 }}
      initial={false}
      animate={animate}
      transition={
        animate
          ? {
              duration: 7 + delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }
          : undefined
      }
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-full object-contain"
        draggable={false}
      />
    </motion.div>
  );
}
