"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BooruType = "szurubooru";
export const availableBooruTypes: BooruType[] = ["szurubooru"];

export type Booru = {
  id: number;
  type: BooruType;
  host: string;
  username: string;
  token: string;
};

interface settingsState {
  _hasHydrated: boolean;
  boorus: Array<Booru>;
  lastActiveBooru: number;
  setHasHydrated: (state: boolean) => void;
  setLastActiveBooru: (id: number) => void;
  addNewBooru: (booru: Booru) => void;
}

export const useSettingsStore = create<settingsState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      boorus: [],
      lastActiveBooru: 0,
      addNewBooru: (newBooru: Booru) => {
        const newArray = [...get().boorus, newBooru];
        set({ boorus: newArray });
      },
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      setLastActiveBooru: (state) => {
        set({
          lastActiveBooru: state,
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
