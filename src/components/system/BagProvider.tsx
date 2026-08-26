"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BagLine = {
  slug: string;
  name: string;
  objectNo: string;
  price: number;
  image: string;
  quantity: number;
};

type BagContextValue = {
  lines: BagLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  isAdding: boolean;
  lastAdded: string | null;
  open: () => void;
  close: () => void;
  add: (line: Omit<BagLine, "quantity">, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const BagContext = createContext<BagContextValue | null>(null);
const STORAGE_KEY = "aurelian.bag.v1";

export function BagProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as BagLine[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback(
    (line: Omit<BagLine, "quantity">, quantity = 1) => {
      setLines((current) => {
        const found = current.find((entry) => entry.slug === line.slug);
        if (found) {
          return current.map((entry) =>
            entry.slug === line.slug
              ? { ...entry, quantity: Math.min(entry.quantity + quantity, 9) }
              : entry,
          );
        }
        return [...current, { ...line, quantity }];
      });
      setLastAdded(line.slug);
      setAdding(true);
      window.setTimeout(() => setAdding(false), 900);
    },
    [],
  );

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((entry) => entry.slug !== slug)
        : current.map((entry) =>
            entry.slug === slug ? { ...entry, quantity: Math.min(quantity, 9) } : entry,
          ),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((current) => current.filter((entry) => entry.slug !== slug));
  }, []);

  const value = useMemo<BagContextValue>(() => {
    const count = lines.reduce((total, entry) => total + entry.quantity, 0);
    const subtotal = lines.reduce(
      (total, entry) => total + entry.quantity * entry.price,
      0,
    );
    return {
      lines,
      count,
      subtotal,
      isOpen,
      isAdding,
      lastAdded,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQuantity,
      remove,
      clear: () => setLines([]),
    };
  }, [lines, isOpen, isAdding, lastAdded, add, setQuantity, remove]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const context = useContext(BagContext);
  if (!context) throw new Error("useBag must be used inside BagProvider");
  return context;
}
