"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { InviteProvider, useInvite } from "./InviteProvider";
import { CurtainOpening } from "./CurtainOpening";
import { HeroInvitation } from "./HeroInvitation";
import { ScratchCard } from "./ScratchCard";
import { Countdown } from "./Countdown";
import { EventDetails } from "./EventDetails";
import { Venue } from "./Venue";
import { Closing } from "./Closing";
import { AudioControl } from "./AudioControl";
import { ConfettiBurst } from "./ConfettiBurst";

function InviteInner() {
  const { opened, reducedMotion } = useInvite();
  const [dateRevealed, setDateRevealed] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (!opened) return;
    const curtainT = window.setTimeout(
      () => setShowCurtain(false),
      reducedMotion ? 400 : 1600,
    );
    return () => window.clearTimeout(curtainT);
  }, [opened, reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const handleScratchReveal = () => {
    setDateRevealed(true);
    if (reducedMotion) return;
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 2800);
  };

  return (
    <>
      {showCurtain && <CurtainOpening />}
      <AudioControl enabled={opened} />
      <ConfettiBurst active={confetti} />

      <div
        className={`invite-frame relative z-0 min-h-screen pb-[env(safe-area-inset-bottom)] transition-opacity duration-700 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="invite-bg absolute inset-0 -z-10" />
        <HeroInvitation />
        {opened && (
          <>
            <ScratchCard onRevealed={handleScratchReveal} />
            {dateRevealed && (
              <>
                <Countdown />
                <EventDetails />
              </>
            )}
            <Venue />
            <Closing />
          </>
        )}
      </div>
    </>
  );
}

export function InviteExperience() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduced = mounted ? !!prefersReduced : false;

  return (
    <InviteProvider reducedMotion={reduced}>
      <InviteInner />
    </InviteProvider>
  );
}
