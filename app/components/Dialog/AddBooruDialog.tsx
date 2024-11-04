"use client";
import {
  useSettingsStore,
  availableBooruTypes,
  Booru,
} from "@/app/store/settings";
import { useState } from "react";
import { SZ_GetInfo } from "@/app/booru/szbooru/utils";
import { SZ_TYPE_Info } from "@/app/booru/szbooru/types/api/info";
import { SZ_CreateUserToken, SZ_GetLoggedUser } from "@/app/booru/szbooru/auth";

export const AddBooruDialog = (props: {
  isFullscreen?: boolean;
  isFirstlaunch?: boolean;
  isActive: boolean;
  setIsActive: any;
}) => {
  const [booruType, setBooruType] = useState(availableBooruTypes[0]);
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const settingsStore = useSettingsStore();

  function handleInput(e: any) {
    if (e.target.name == "host") {
      setHost(e.target.value);
    }
    if (e.target.name == "username") {
      setUsername(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  }

  function testBooru(e: any) {
    e.preventDefault();
    if (booruType == "szurubooru") {
      async function _testSZBooru() {
        let token;
        const BooruInfo: SZ_TYPE_Info = await SZ_GetInfo(host);
        const checkPerms = [
          BooruInfo.config.privileges["posts:list"],
          BooruInfo.config.privileges["posts:view"],
        ];
        if (
          checkPerms.includes(BooruInfo.config.defaultUserRank) &&
          (username == "" || password == "")
        ) {
          alert("Login is required");
          return false;
        }
        if (username && password) {
          const user = await SZ_GetLoggedUser(host, username, password);
          if (!user) {
            alert("can't log in");
            return false;
          }
          token = await SZ_CreateUserToken(host, username, password);
          if (!token) {
            alert("can't create token");
            return false;
          }
        }

        const id = settingsStore.boorus.length + 1;

        const newBooru: Booru = {
          id,
          type: "szurubooru",
          host,
          username,
          token: token ? token.token : null,
        };

        settingsStore.addNewBooru(newBooru);
        props.setIsActive(false);
      }
      _testSZBooru();
    }
  }

  return (
    <dialog
      className={`${props.isFullscreen ? "max" : ""} ${
        props.isActive ? "active" : ""
      }`}
    >
      <div className="middle center-align">
        <h2>{props.isFirstlaunch ? "First time setup" : "Add a booru"}</h2>
        <form className="center" style={{ maxWidth: 768 }} onSubmit={testBooru}>
          <nav className=" left-align">
            <button className="active" type="button">
              <span>booru type: {booruType}</span>
              <i>arrow_drop_down</i>
              <menu>
                {availableBooruTypes.map((item) => {
                  return (
                    <a key={item} onClick={() => setBooruType(item)}>
                      {item}
                    </a>
                  );
                })}
              </menu>
            </button>
          </nav>
          <div className="field label large border round">
            <input
              type="text"
              value={host}
              onChange={(e) => handleInput(e)}
              name="host"
              required={true}
            />
            <label>Host</label>
          </div>
          <div className="field label large border round">
            <input
              type="text"
              value={username}
              onChange={(e) => handleInput(e)}
              name="username"
            />
            <label>Username</label>
            <span className="helper">Optional</span>
          </div>
          <div className="field label large border round">
            <input
              type="password"
              value={password}
              onChange={(e) => handleInput(e)}
              name="password"
            />
            <label>Password</label>
            <span className="helper">Optional</span>
          </div>
          <nav className="right-align">
            {!props.isFirstlaunch && <button>Cancel</button>}
            <button type="submit">Confirm</button>
          </nav>
        </form>
      </div>
    </dialog>
  );
};
