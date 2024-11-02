"use client";
import { AppBarPC } from "./components/AppBar/AppBar";
import { NavRailPC } from "./components/NavRail/NavRail";
import { useSettingsStore } from "./store/settings";
import { AddBooruDialog } from "./components/Dialog/AddBooruDialog";

export const App = (props: any) => {
  const settingsStore = useSettingsStore();

  return (
    <body className="background">
      {!settingsStore._hasHydrated ? (
        <progress className="circle large center middle fixed"></progress>
      ) : settingsStore.settings.boorus.length == 0 ? (
        <AddBooruDialog isFullscreen={true} isActive={true} isFirstlaunch={true}/>
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
