export const AddBooruDialog = (props: {
  isFullscreen?: boolean;
  isActive?: boolean;
  isFirstlaunch?: boolean;
}) => {
  return (
    <dialog
      className={`${props.isFullscreen ? "max" : ""} ${
        props.isActive ? "active" : ""
      }`}
    >
      <div className="middle center-align">
        <h5>{props.isFirstlaunch ? "First time setup" : "Add a booru"}</h5>
        <form className="center" style={{maxWidth: 768}}>
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
