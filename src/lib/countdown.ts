export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

/** Parse event ISO and return remaining time. Never negative. */
export function getCountdown(targetIso: string, now = Date.now()): CountdownParts {
  const target = new Date(targetIso).getTime();
  const diff = target - now;

  if (!Number.isFinite(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, completed: false };
}

export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}
