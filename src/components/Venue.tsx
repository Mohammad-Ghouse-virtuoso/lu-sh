"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";

export function Venue() {
  return (
    <motion.section
      className="relative px-6 py-14 text-center sm:px-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7 }}
    >
      <p className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.32em] text-[color:var(--gold)]">
        VENUE
      </p>
      <h3 className="mt-4 font-[family-name:var(--font-cinzel)] text-xl tracking-[0.1em] text-[color:var(--champagne)] sm:text-2xl">
        {WEDDING.venue.name}
      </h3>
      <div className="mt-4 space-y-1 font-[family-name:var(--font-cormorant)] text-base leading-relaxed text-[color:var(--ivory)]/90 sm:text-lg">
        {WEDDING.venue.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <a
        href={WEDDING.venue.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center border border-[color:var(--gold)]/55 px-6 py-2.5 font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.28em] text-[color:var(--champagne)] transition hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--gold)]"
      >
        VIEW LOCATION
      </a>
    </motion.section>
  );
}
