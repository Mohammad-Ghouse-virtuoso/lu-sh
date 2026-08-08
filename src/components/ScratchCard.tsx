"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";

type ScratchCardProps = {
  onRevealed?: () => void;
};

export function ScratchCard({ onRevealed }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const revealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [ready, setReady] = useState(false);
  const prefersReduced = useReducedMotion();

  const brushRadius = useCallback(() => {
    const w = containerRef.current?.clientWidth ?? 320;
    // Slightly larger on narrow phones for easier scratching
    return Math.max(32, Math.min(52, w * 0.12));
  }, []);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const parent = containerRef.current;
    if (!canvas || !parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = parent.getBoundingClientRect();
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#8a6a32");
    grad.addColorStop(0.35, "#c9a45c");
    grad.addColorStop(0.55, "#e5d0a0");
    grad.addColorStop(0.75, "#b8924a");
    grad.addColorStop(1, "#7a5c28");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 0.18;
    for (let i = 0; i < 40; i++) {
      ctx.strokeStyle = i % 2 === 0 ? "#f3e8d0" : "#5c4018";
      ctx.lineWidth = 1 + (i % 3);
      ctx.beginPath();
      const y = (((i * 37) % 1000) / 1000) * height;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + ((i % 7) - 3) * 3);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = "rgba(50, 21, 21, 0.72)";
    ctx.font = "600 13px Cinzel, serif";
    ctx.textAlign = "center";
    ctx.fillText(WEDDING.scratch.hint, width / 2, height / 2 + 4);

    setReady(true);
  }, []);

  useEffect(() => {
    paintCover();
    const onResize = () => {
      if (!revealedRef.current) paintCover();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paintCover]);

  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || revealedRef.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const r = brushRadius();

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      const sample = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = sample.data;
      let cleared = 0;
      const step = 16;
      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] < 128) cleared++;
      }
      const total = data.length / (4 * step);
      if (cleared / total >= 0.5) {
        revealedRef.current = true;
        setRevealed(true);
        onRevealed?.();
      }
    },
    [brushRadius, onRevealed],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (revealed) return;
    drawing.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawing.current || revealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    drawing.current = false;
  };

  return (
    <section className="relative px-5 py-10 sm:px-8 sm:py-12">
      <div className="relative mx-auto max-w-sm text-center">
        <p className="mb-2 font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.3em] text-[color:var(--gold)]">
          {WEDDING.scratch.tease}
        </p>
        <p className="mb-6 font-[family-name:var(--font-cormorant)] text-xl text-[color:var(--ivory)]">
          {WEDDING.scratch.teaseSub}
        </p>

        <div
          ref={containerRef}
          className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-sm border border-[color:var(--gold)]/40 bg-[#f3e8d0]"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <p className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.28em] text-[color:var(--wine)]">
              WEDDING DATE
            </p>
            <p className="mt-3 font-[family-name:var(--font-cinzel)] text-2xl tracking-wide text-[color:var(--burgundy-deep)] sm:text-3xl">
              {WEDDING.event.dateDisplay}
            </p>
            <p className="mt-2 font-[family-name:var(--font-cormorant)] text-base text-[color:var(--wine)]">
              {WEDDING.event.day} | {WEDDING.event.time}
            </p>
          </div>

          <AnimatePresence>
            {!revealed && (
              <motion.canvas
                key="scratch"
                ref={canvasRef}
                className="absolute inset-0 z-10 touch-none cursor-crosshair"
                initial={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: prefersReduced ? 0.2 : 0.6 },
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                aria-label="Scratch to reveal the wedding date"
                role="img"
              />
            )}
          </AnimatePresence>
        </div>

        {prefersReduced && !revealed && (
          <button
            type="button"
            onClick={() => {
              revealedRef.current = true;
              setRevealed(true);
              onRevealed?.();
            }}
            className="mt-4 font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.25em] text-[color:var(--gold)] underline-offset-4 hover:underline"
          >
            REVEAL DATE
          </button>
        )}

        {!ready && !revealed && (
          <p className="mt-3 text-xs text-[color:var(--champagne)]/60">
            Preparing card…
          </p>
        )}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-[family-name:var(--font-cinzel)] text-3xl tracking-[0.12em] text-[color:var(--champagne)] sm:text-4xl">
              {WEDDING.event.dateDisplay}
            </p>
            <p className="mt-3 font-[family-name:var(--font-cormorant)] text-lg text-[color:var(--ivory)]">
              {WEDDING.event.day}
              <span className="mx-2 text-[color:var(--gold)]">·</span>
              {WEDDING.event.time}
            </p>
            <div className="mx-auto my-5 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
            <p className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.28em] text-[color:var(--gold)]">
              {WEDDING.event.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
