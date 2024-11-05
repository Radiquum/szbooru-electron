"use client";

import { useEffect, useState } from "react";
import { useSettingsStore } from "./store/settings";
import { SZ_GetInfo, bytesToHuman } from "./booru/szbooru/utils";
import { SZ_TYPE_Info } from "./booru/szbooru/types/api/info";

export default function Home() {
  const settingsStore = useSettingsStore();

  const [booruInfo, setBooruInfo] = useState<SZ_TYPE_Info | null>(null);

  useEffect(() => {
    const _getinfo = async () => {
      setBooruInfo(
        await SZ_GetInfo(
          settingsStore.boorus[settingsStore.lastActiveBooru].host
        )
      );
    };
    _getinfo();
  }, []);

  return (
    <>
      {!booruInfo ? (
        <progress className="circle large center middle fixed"></progress>
      ) : (
        <main className="responsive middle-align center-align">
          <div className="middle">
            <h1>
              {booruInfo.config.name}
            </h1>
            <div className="row center-align medium-space">
              <p>{bytesToHuman(booruInfo.diskUsage)}</p>
              <p>{booruInfo.postCount} posts</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
