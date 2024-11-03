"use client";
import { useSettingsStore, availableBooruTypes } from "@/app/store/settings";
import { useState } from "react";

export const AddBooruDialog = (props: {
  isFullscreen?: boolean;
  isActive?: boolean;
  isFirstlaunch?: boolean;
}) => {
  const [booruType, setBooruType] = useState(availableBooruTypes[0]);

  return (
    <dialog
      className={`${props.isFullscreen ? "max" : ""} ${
        props.isActive ? "active" : ""
      }`}
    >
      <div className="middle center-align">
        <h2>{props.isFirstlaunch ? "First time setup" : "Add a booru"}</h2>
        <form className="center" style={{ maxWidth: 768 }}>
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
            <input type="text" />
            <label>Host</label>
          </div>
          <div className="field label large border round">
            <input type="text" />
            <label>Username</label>
            <span className="helper">Optional</span>
          </div>
          <div className="field label large border round">
            <input type="password" />
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
