"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { modes, type Mode, type ModeId } from "@/lib/site";

const KEY = "tw-sky-mode";

type Ctx = { mode: Mode; setMode: (id: ModeId) => void };
const ModeCtx = createContext<Ctx | null>(null);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<ModeId>("day");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as ModeId | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore from localStorage on mount
      if (saved && modes.some((m) => m.id === saved)) setId(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = useCallback((next: ModeId) => {
    setId(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const mode = modes.find((m) => m.id === id) ?? modes[1];

  return <ModeCtx.Provider value={{ mode, setMode }}>{children}</ModeCtx.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeCtx);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
