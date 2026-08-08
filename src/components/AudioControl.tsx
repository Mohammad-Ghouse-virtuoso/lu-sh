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
    audio.volume = 0.32;
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
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--gold)]/50 bg-[#1a0a0c]/85 text-[color:var(--champagne)] shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-sm transition hover:border-[color:var(--gold)]"
    >
      <span className="text-[11px] leading-none" aria-hidden>
        {muted ? "✕♪" : "♪"}
      </span>
    </button>
  );
}
