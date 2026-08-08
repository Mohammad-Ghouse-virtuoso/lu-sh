"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";

export function EventDetails() {
  return (
    <motion.section
      className="relative px-6 py-14 text-center sm:px-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />

      <p className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.35em] text-[color:var(--gold)]">
        {WEDDING.event.title}
      </p>
      <p className="mt-6 font-[family-name:var(--font-cinzel)] text-2xl tracking-wide text-[color:var(--champagne)]">
        {WEDDING.event.dateDisplay}
      </p>
      <p className="mt-2 font-[family-name:var(--font-cormorant)] text-lg text-[color:var(--ivory)]">
        {WEDDING.event.time}
      </p>
      <p className="mt-5 font-[family-name:var(--font-cormorant)] text-base italic text-[color:var(--champagne)]/85">
        {WEDDING.event.islamicDate}
      </p>

      <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
    </motion.section>
  );
}
