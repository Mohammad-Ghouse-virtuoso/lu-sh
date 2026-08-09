"use client";

import { motion } from "framer-motion";
import { useInvite } from "./InviteProvider";

/**
 * Zareqia-style landing: deep burgundy + circular TAP TO OPEN.
 * Curtains are clean CSS panels (no stock flower/drape clutter).
 */
export function CurtainOpening() {
  const { opened, open, reducedMotion } = useInvite();
  const duration = reducedMotion ? 0.3 : 1.45;

  return (
    <div
      className={`fixed inset-0 z-50 ${opened ? "pointer-events-none" : ""}`}
      aria-hidden={opened}
    >
      {/* Closed stage - solid royal maroon */}
      <motion.div
        className="absolute inset-0 z-0 royal-stage"
        initial={false}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.5 }}
      />

      {/* Left curtain panel */}
      <motion.div
        className="absolute inset-y-0 left-0 z-20 w-1/2 origin-left royal-curtain royal-curtain-left"
        initial={false}
        animate={
          opened
            ? reducedMotion
              ? { opacity: 0 }
              : { x: "-100%" }
            : { x: 0 }
        }
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform" }}
      />

      {/* Right curtain panel */}
      <motion.div
        className="absolute inset-y-0 right-0 z-20 w-1/2 origin-right royal-curtain royal-curtain-right"
        initial={false}
        animate={
          opened
            ? reducedMotion
              ? { opacity: 0 }
              : { x: "100%" }
            : { x: 0 }
        }
        transition={{
          duration,
          delay: reducedMotion ? 0 : 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ willChange: "transform" }}
      />

      {/* Center seam */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[color:var(--gold)]/35 to-transparent"
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Circular TAP TO OPEN - Zareqia pattern */}
      <motion.div
        className="absolute inset-0 z-40 flex items-center justify-center"
        initial={false}
        animate={{ opacity: opened ? 0 : 1, scale: opened ? 0.92 : 1 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.4 }}
      >
        {!opened && (
          <button
            type="button"
            onClick={open}
            aria-label="Tap to open the invitation"
            className="group relative flex h-[148px] w-[148px] flex-col items-center justify-center rounded-full border-[1.5px] border-[color:var(--gold)] bg-[radial-gradient(circle_at_35%_30%,#6b2430_0%,#3a1116_55%,#240d0d_100%)] shadow-[0_12px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(229,208,160,0.15)] transition hover:border-[color:var(--champagne)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--gold)] active:scale-[0.98] sm:h-[168px] sm:w-[168px]"
          >
            <span className="font-[family-name:var(--font-cinzel)] text-[1.85rem] font-medium leading-none tracking-[0.06em] text-[color:var(--gold)] sm:text-[2.15rem]">
              L&S
            </span>
            <span className="mt-2.5 font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.28em] text-[color:var(--champagne)] sm:text-[10px]">
              TAP TO OPEN
            </span>
            <span className="pointer-events-none absolute inset-2 rounded-full border border-[color:var(--gold)]/25" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
