"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BooruType = "szurubooru"
export const availableBooruTypes: BooruType[] = ["szurubooru"]

type Booru = {
  id: number;
  type: BooruType,
  host: string;
  username: string | null;
  token: string | null;
};

interface settings {
  boorus: Array<Booru>;
}

interface settingsState {
  _hasHydrated: boolean;
  settings: settings;
  setHasHydrated: (state: boolean) => void;
}

export const useSettingsStore = create<settingsState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      settings: {
        boorus: [],
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
