import React from "react";

const Header = ({ handleToggleDarkMode }) => {
  return (
    <div className="header">
      <h1>Notes</h1>
      <button
        //BUG1: Start - Mode change works only for the first time
        onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
        // onClick={handleToggleDarkMode}
        //BUG1: End
        className="toggle"
      >
        {/* BUG15: Small typo was made.. It was wriiten as TOGGEL.. It should be TOGGLE !!! Let's see who fixes it */}
        Toggle Mode
      </button>
    </div>
  );
};

export default Header;
