"use client";

import { useEffect, useState } from "react";
import { getCountdown, pad2 } from "@/lib/countdown";
import { WEDDING } from "@/lib/wedding";

export function Countdown() {
  const [parts, setParts] = useState(() =>
    getCountdown(WEDDING.event.isoLocal),
  );

  useEffect(() => {
    const tick = () => setParts(getCountdown(WEDDING.event.isoLocal));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (parts.completed) {
    return (
      <section className="px-5 py-12 text-center sm:px-8">
        <p className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.3em] text-[color:var(--gold)]">
          {WEDDING.celebrationBegun}
        </p>
      </section>
    );
  }

  const cells = [
    { label: "DAYS", value: pad2(parts.days) },
    { label: "HOURS", value: pad2(parts.hours) },
    { label: "MINUTES", value: pad2(parts.minutes) },
    { label: "SECONDS", value: pad2(parts.seconds) },
  ];

  return (
    <section className="px-5 py-12 text-center sm:px-8">
      <p className="mb-8 font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.32em] text-[color:var(--gold)]">
        {WEDDING.countdownLabel}
      </p>
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-4">
        {cells.map((c) => (
          <div
            key={c.label}
            className="rounded-sm border border-[color:var(--gold)]/25 bg-[color:var(--burgundy)]/40 px-1 py-4 backdrop-blur-sm"
          >
            <p
              className="font-[family-name:var(--font-cinzel)] text-2xl text-[color:var(--champagne)] sm:text-3xl"
              suppressHydrationWarning
            >
              {c.value}
            </p>
            <p className="mt-2 font-[family-name:var(--font-cinzel)] text-[8px] tracking-[0.2em] text-[color:var(--ivory)]/70 sm:text-[9px]">
              {c.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
