"use client";
import { AppBarPC } from "./components/AppBar/AppBar";
import { NavRailPC } from "./components/NavRail/NavRail";
import { useSettingsStore } from "./store/settings";
import { AddBooruDialog } from "./components/Dialog/AddBooruDialog";
import { useState } from "react";

export const App = (props: any) => {
  const settingsStore = useSettingsStore();
  const [isFirstSetupActive, setIsFirstSetupActive] = useState(true);

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
