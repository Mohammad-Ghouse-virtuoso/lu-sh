"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WEDDING } from "@/lib/wedding";
import { useInvite } from "./InviteProvider";

/** Clean Zareqia-inspired hero — printed-card spacing */
export function HeroInvitation() {
  const { opened } = useInvite();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    if (!opened) return;
    const onScroll = () => {
      if (window.scrollY > 28) setShowScroll(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const autoHide = window.setTimeout(() => setShowScroll(false), 6500);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(autoHide);
    };
  }, [opened]);

  return (
    <section className="relative px-5 pb-14 pt-[max(4rem,env(safe-area-inset-top))] text-center sm:px-10 sm:pt-20">
      <div
        className={`mx-auto flex max-w-md flex-col items-center transition-all duration-700 ${
          opened ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <Image
          src="/wedding/calligraphy/bismillah.png"
          alt="Bismillah"
          width={340}
          height={120}
          priority
          className="mb-8 h-auto w-[min(82vw,340px)] object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
        />

        <p className="max-w-[22ch] font-[family-name:var(--font-cormorant)] text-[0.95rem] leading-relaxed text-[color:var(--ivory)]/88 sm:max-w-none sm:text-base">
          {WEDDING.openingBlessing.line1}
          <br />
          {WEDDING.openingBlessing.line2}
        </p>

        <div className="my-7 h-px w-14 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />

        <p className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.3em] text-[color:var(--gold)] sm:text-[10px]">
          {WEDDING.blessingHeading}
        </p>
        <p className="mt-1.5 font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.3em] text-[color:var(--champagne)]/90 sm:text-[10px]">
          {WEDDING.blessingSubheading}
        </p>

        <p className="mt-7 font-[family-name:var(--font-cormorant)] text-base text-[color:var(--ivory)] sm:text-lg">
          {WEDDING.parents}
        </p>

        <div className="mt-6 max-w-xs space-y-0.5 font-[family-name:var(--font-cormorant)] text-sm italic leading-relaxed text-[color:var(--ivory)]/75">
          {WEDDING.invitationText.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="my-8 h-px w-14 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />

        <h1 className="max-w-[16ch] font-[family-name:var(--font-cinzel)] text-[1.4rem] leading-[1.35] tracking-[0.04em] text-[color:var(--champagne)] sm:max-w-none sm:text-[1.85rem]">
          {WEDDING.groom.fullName}
        </h1>

        <p className="my-3.5 font-[family-name:var(--font-cormorant)] text-2xl text-[color:var(--gold)]">
          &
        </p>

        <h2 className="max-w-[16ch] font-[family-name:var(--font-cinzel)] text-[1.4rem] leading-[1.35] tracking-[0.04em] text-[color:var(--champagne)] sm:max-w-none sm:text-[1.85rem]">
          {WEDDING.bride.fullName}
        </h2>

        {opened && (
          <p
            className={`mt-12 font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.4em] text-[color:var(--gold)]/65 transition-opacity duration-700 ${
              showScroll ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            SCROLL
            <span className="mt-1 block text-[10px] tracking-normal opacity-70">
              ⌄
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
