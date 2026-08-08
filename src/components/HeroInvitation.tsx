"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WEDDING } from "@/lib/wedding";
import { useInvite } from "./InviteProvider";

/** Clean Zareqia-inspired hero — typography first */
export function HeroInvitation() {
  const { opened } = useInvite();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    if (!opened) return;
    const onScroll = () => {
      if (window.scrollY > 40) setShowScroll(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [opened]);

  return (
    <section className="relative px-5 pb-12 pt-[max(3.5rem,env(safe-area-inset-top))] text-center sm:px-10 sm:pt-16">
      <div
        className={`mx-auto flex max-w-md flex-col items-center transition-all duration-700 ${
          opened ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <Image
          src="/wedding/calligraphy/bismillah.png"
          alt="Bismillah"
          width={280}
          height={100}
          priority
          className="mb-6 h-auto w-[min(72vw,280px)] object-contain"
        />

        <p className="font-[family-name:var(--font-cormorant)] text-sm leading-relaxed text-[color:var(--ivory)]/85 sm:text-base">
          {WEDDING.openingBlessing.line1}
          <br />
          {WEDDING.openingBlessing.line2}
        </p>

        <div className="my-6 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />

        <p className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.28em] text-[color:var(--gold)] sm:text-[10px]">
          {WEDDING.blessingHeading}
        </p>
        <p className="mt-1 font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.28em] text-[color:var(--champagne)]/90 sm:text-[10px]">
          {WEDDING.blessingSubheading}
        </p>

        <p className="mt-6 font-[family-name:var(--font-cormorant)] text-base text-[color:var(--ivory)] sm:text-lg">
          {WEDDING.parents}
        </p>

        <div className="mt-5 max-w-xs space-y-0.5 font-[family-name:var(--font-cormorant)] text-sm italic leading-relaxed text-[color:var(--ivory)]/75">
          {WEDDING.invitationText.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="my-7 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />

        <h1 className="max-w-[18ch] font-[family-name:var(--font-cinzel)] text-[1.35rem] leading-snug tracking-[0.04em] text-[color:var(--champagne)] sm:text-3xl">
          {WEDDING.groom.fullName}
        </h1>

        <p className="my-3 font-[family-name:var(--font-cormorant)] text-2xl text-[color:var(--gold)]">
          &
        </p>

        <h2 className="max-w-[18ch] font-[family-name:var(--font-cinzel)] text-[1.35rem] leading-snug tracking-[0.04em] text-[color:var(--champagne)] sm:text-3xl">
          {WEDDING.bride.fullName}
        </h2>

        {opened && showScroll && (
          <p className="mt-10 animate-pulse font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.35em] text-[color:var(--gold)]/70 transition-opacity duration-500">
            SCROLL
          </p>
        )}
      </div>
    </section>
  );
}
