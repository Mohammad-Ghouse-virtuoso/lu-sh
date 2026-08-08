"use client";

import { useEffect, useRef, useState } from "react";

type AudioControlProps = {
  enabled: boolean;
  src?: string;
};

export function AudioControl({
  enabled,
  src = "/audio/wedding-nasheed.mp3",
}: AudioControlProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const play = async () => {
      try {
        await audio.play();
        setReady(true);
      } catch {
        setReady(true);
        setMuted(true);
      }
    };
    void play();

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [enabled, src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    if (!muted && audio.paused && enabled) {
      void audio.play().catch(() => undefined);
    }
  }, [muted, enabled]);

  if (!enabled || !ready) return null;

  return (
    <button
      type="button"
      onClick={() => setMuted((m) => !m)}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-8 w-8 items-center justify-center rounded-sm border border-[color:var(--gold)]/55 bg-[#12080a]/90 text-[color:var(--champagne)] shadow-[0_2px_10px_rgba(0,0,0,0.45)] backdrop-blur-[2px] transition hover:border-[color:var(--gold)] hover:bg-[#1a0a0c]"
    >
      {muted ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M11 5 L6 9 H3 V15 H6 L11 19 V5 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M16 9 L20 15 M20 9 L16 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M11 5 L6 9 H3 V15 H6 L11 19 V5 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 9.5 C16.8 10.8 16.8 13.2 15.5 14.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M18 7.5 C20.5 10 20.5 14 18 16.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
