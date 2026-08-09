"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WEDDING } from "@/lib/wedding";
import { useInvite } from "./InviteProvider";
import { GoldFlourish } from "./FloralAccents";

/** Clean Zareqia-inspired hero - printed-card spacing */
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
        <div className="relative mb-3 flex w-full flex-col items-center">
          <Image
            src="/wedding/ornaments/crescent-lamp.webp"
            alt=""
            width={120}
            height={153}
            priority
            className="relative z-[1] mb-1 h-auto w-[min(28vw,110px)] object-contain drop-shadow-[0_0_18px_rgba(201,164,92,0.35)]"
            draggable={false}
          />
          <Image
            src="/wedding/calligraphy/bismillah.webp"
            alt="Bismillah ir-Rahman ir-Rahim"
            width={520}
            height={200}
            priority
            className="relative z-[1] h-auto w-[min(92vw,400px)] object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
            draggable={false}
          />
        </div>

        <p className="mt-5 max-w-[22ch] font-[family-name:var(--font-cormorant)] text-[0.95rem] leading-relaxed text-[color:var(--ivory)]/88 sm:max-w-none sm:text-base">
          {WEDDING.openingBlessing.line1}
          <br />
          {WEDDING.openingBlessing.line2}
        </p>

        <div className="my-7">
          <GoldFlourish />
        </div>

        <p className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.3em] text-[color:var(--gold)] sm:text-[10px]">
          {WEDDING.blessingHeading}
        </p>
        <p className="mt-1.5 font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.3em] text-[color:var(--champagne)]/90 sm:text-[10px]">
          {WEDDING.blessingSubheading}
        </p>

        <p className="mt-7 font-[family-name:var(--font-cormorant)] text-base text-[color:var(--ivory)] sm:text-lg">
          {WEDDING.parents}
        </p>
        <p className="mt-1.5 max-w-[28ch] font-[family-name:var(--font-cormorant)] text-sm text-[color:var(--champagne)]/80 sm:max-w-none">
          {WEDDING.parentsDesignation}
        </p>

        <div className="mt-6 max-w-xs space-y-0.5 font-[family-name:var(--font-cormorant)] text-sm italic leading-relaxed text-[color:var(--ivory)]/75">
          {WEDDING.invitationText.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="my-8">
          <GoldFlourish />
        </div>

        <h1 className="max-w-[16ch] font-[family-name:var(--font-cinzel)] text-[1.4rem] leading-[1.35] tracking-[0.04em] text-[color:var(--champagne)] sm:max-w-none sm:text-[1.85rem]">
          {WEDDING.groom.fullName}
        </h1>
        <p className="mt-2 max-w-[26ch] font-[family-name:var(--font-cormorant)] text-sm text-[color:var(--ivory)]/70 sm:max-w-none">
          {WEDDING.groom.designation}
        </p>

        <p className="my-3.5 font-[family-name:var(--font-cormorant)] text-2xl text-[color:var(--gold)]">
          &
        </p>

        <h2 className="max-w-[16ch] font-[family-name:var(--font-cinzel)] text-[1.4rem] leading-[1.35] tracking-[0.04em] text-[color:var(--champagne)] sm:max-w-none sm:text-[1.85rem]">
          {WEDDING.bride.fullName}
        </h2>
        <p className="mt-2 font-[family-name:var(--font-cormorant)] text-sm text-[color:var(--ivory)]/70">
          {WEDDING.bride.designation}
        </p>

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
