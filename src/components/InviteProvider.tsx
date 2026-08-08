"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type InviteState = {
  opened: boolean;
  open: () => void;
  reducedMotion: boolean;
};

const InviteContext = createContext<InviteState | null>(null);

export function InviteProvider({
  children,
  reducedMotion = false,
}: {
  children: ReactNode;
  reducedMotion?: boolean;
}) {
  const [opened, setOpened] = useState(false);
  const open = useCallback(() => setOpened(true), []);

  const value = useMemo(
    () => ({ opened, open, reducedMotion }),
    [opened, open, reducedMotion],
  );

  return (
    <InviteContext.Provider value={value}>{children}</InviteContext.Provider>
  );
}

export function useInvite() {
  const ctx = useContext(InviteContext);
  if (!ctx) throw new Error("useInvite must be used within InviteProvider");
  return ctx;
}
