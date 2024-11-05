"use client";
import { create } from "zustand";
import { BooruType } from "./settings";
import { SZ_GetLoggedUser } from "../booru/szbooru/auth";
import { SZ_User } from "../booru/szbooru/types/api/user";

interface userState {
  _hasHydrated: boolean;
  isAuth: boolean;
  user: SZ_User | null;
  state: string;
  login: (user: SZ_User) => void;
  checkAuth: (
    host: string,
    booruType: BooruType,
    username: string,
    token: string
  ) => void;
}

export const useUserStore = create<userState>((set, get) => ({
  _hasHydrated: false,
  isAuth: false,
  user: null,
  state: "loading",

  login: (user: SZ_User) => {
    set({
      isAuth: true,
      user: user,
      state: "finished",
      _hasHydrated: true,
    });
  },
  checkAuth: (
    host: string,
    booruType: BooruType,
    username: string,
    token: string
  ) => {
    if (booruType == "szurubooru") {
      const _checkAuth = async () => {
        const user: SZ_User = await SZ_GetLoggedUser(
          host,
          username,
          token,
          true,
          "Token"
        );
        if (!user) {
          alert("can't log in");
          return false;
        }
        get().login(user);
      };
      _checkAuth();
    }
  },
}));
