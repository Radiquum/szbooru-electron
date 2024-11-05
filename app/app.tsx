"use client";
import { AppBarPC } from "./components/AppBar/AppBar";
import { NavRailPC } from "./components/NavRail/NavRail";
import { useSettingsStore } from "./store/settings";
import { AddBooruDialog } from "./components/Dialog/AddBooruDialog";
import { useEffect, useState } from "react";
import { useUserStore } from "./store/auth";

export const App = (props: any) => {
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();
  const [isFirstSetupActive, setIsFirstSetupActive] = useState(true);

  useEffect(() => {
    const ActiveBooru = settingsStore.boorus[settingsStore.lastActiveBooru];
    console.log(ActiveBooru)
    if (ActiveBooru) {
      userStore.checkAuth(
        ActiveBooru.host,
        ActiveBooru.type,
        ActiveBooru.username,
        ActiveBooru.token
      );
    }
  }, [settingsStore.lastActiveBooru, settingsStore._hasHydrated]);

  return (
    <body className="background">
      {!settingsStore._hasHydrated ? (
        <progress className="circle large center middle fixed"></progress>
      ) : settingsStore.boorus.length == 0 ? (
        <AddBooruDialog
          isFullscreen={true}
          isActive={isFirstSetupActive}
          isFirstlaunch={true}
          setIsActive={setIsFirstSetupActive}
        />
      ) : (
        <>
          <AppBarPC />
          <NavRailPC />
          <main className="small-margin">{props.children}</main>
        </>
      )}
    </body>
  );
};
