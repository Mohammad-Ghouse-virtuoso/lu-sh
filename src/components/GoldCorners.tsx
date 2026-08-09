/** Subtle gold corner ornament - SVG only, Zareqia-restrained */
export function GoldCorners({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[25] ${className}`}
      aria-hidden
    >
      <Corner className="left-[max(0.85rem,env(safe-area-inset-left))] top-[max(0.85rem,env(safe-area-inset-top))]" />
      <Corner className="right-[max(0.85rem,env(safe-area-inset-right))] top-[max(0.85rem,env(safe-area-inset-top))] -scale-x-100" />
      <Corner className="bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-[max(0.85rem,env(safe-area-inset-left))] -scale-y-100" />
      <Corner className="bottom-[max(0.85rem,env(safe-area-inset-bottom))] right-[max(0.85rem,env(safe-area-inset-right))] -scale-x-100 -scale-y-100" />
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute h-10 w-10 opacity-70 sm:h-12 sm:w-12 ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4 H28 M4 4 V28"
        stroke="#C9A45C"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M4 4 C14 6, 18 12, 20 22"
        stroke="#E5D0A0"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M8 4 C10 10, 14 14, 22 16"
        stroke="#C9A45C"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="4" cy="4" r="1.4" fill="#E5D0A0" />
      <circle cx="14" cy="4" r="0.9" fill="#C9A45C" opacity="0.8" />
      <circle cx="4" cy="14" r="0.9" fill="#C9A45C" opacity="0.8" />
    </svg>
  );
}
