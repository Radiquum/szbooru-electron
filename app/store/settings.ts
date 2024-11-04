"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BooruType = "szurubooru"
export const availableBooruTypes: BooruType[] = ["szurubooru"]

export type Booru = {
  id: number;
  type: BooruType;
  host: string;
  username: string | null;
  token: string | null;
};

interface settingsState {
  _hasHydrated: boolean;
  boorus: Array<Booru>;
  setHasHydrated: (state: boolean) => void;
  addNewBooru: (booru: Booru) => void
}

export const useSettingsStore = create<settingsState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      boorus: [],
      addNewBooru: (newBooru: Booru) => {
        const newArray = [...get().boorus, newBooru]
        set({boorus: newArray})
      },
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "settings",
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
