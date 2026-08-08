"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";

export function Closing() {
  return (
    <motion.section
      className="relative px-6 pb-28 pt-14 text-center sm:px-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <p className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.3em] text-[color:var(--gold)]">
        {WEDDING.closing.complimentsFrom}
      </p>
      <p className="mt-3 font-[family-name:var(--font-cormorant)] text-lg text-[color:var(--ivory)]">
        {WEDDING.closing.relatives}
      </p>

      <div className="mx-auto my-8 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />

      <p className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.08em] text-[color:var(--champagne)] sm:text-xl">
        {WEDDING.groom.fullName}
      </p>
      <p className="my-2 font-[family-name:var(--font-cormorant)] text-xl text-[color:var(--gold)]">
        &
      </p>
      <p className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.08em] text-[color:var(--champagne)] sm:text-xl">
        {WEDDING.bride.fullName}
      </p>
    </motion.section>
  );
}
