"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";
import { GoldFlourish } from "./FloralAccents";

function formatPhone(n: string) {
  if (n.length === 10) return `${n.slice(0, 5)} ${n.slice(5)}`;
  return n;
}

export function Closing() {
  return (
    <motion.section
      className="relative px-6 pb-28 pt-10 text-center sm:px-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <GoldFlourish className="mb-8" />

      <p className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.3em] text-[color:var(--gold)]">
        {WEDDING.closing.complimentsFrom}
      </p>
      <p className="mt-3 font-[family-name:var(--font-cormorant)] text-xl italic text-[color:var(--ivory)]">
        {WEDDING.closing.relatives}
      </p>

      <p className="mx-auto mt-6 max-w-[34ch] font-[family-name:var(--font-cormorant)] text-[0.95rem] leading-relaxed text-[color:var(--ivory)]/78 sm:max-w-md sm:text-base">
        {WEDDING.closing.giftNote}
      </p>

      <div className="mx-auto my-9 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />

      <p className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.28em] text-[color:var(--gold)]">
        FOR QUERIES
      </p>
      <p className="mt-2 font-[family-name:var(--font-cormorant)] text-sm text-[color:var(--champagne)]/85">
        {WEDDING.parents}
      </p>
      <ul className="mt-4 space-y-2 font-[family-name:var(--font-cormorant)] text-base tracking-wide text-[color:var(--ivory)]">
        {WEDDING.contacts.map((num) => (
          <li key={num}>
            <a
              href={`tel:+91${num}`}
              className="underline-offset-4 transition hover:text-[color:var(--champagne)] hover:underline"
            >
              {formatPhone(num)}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-12 font-[family-name:var(--font-cinzel)] text-sm tracking-[0.2em] text-[color:var(--gold)]/80">
        L & S
      </p>
    </motion.section>
  );
}
