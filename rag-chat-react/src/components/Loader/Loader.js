import "./Loader.css";
import React from "react";
import "ldrs/helix";

const Loader = () => {
  return (
    <div>
      <div aria-live="polite" className="m-5">
        {<l-helix size="200"></l-helix>}
      </div>
      <div className="m-5" style={{ fontSize: "2em" }}>
        {/* <Typical steps={loadingText} loop={Infinity} wrapper="p" /> */}
        <span>Creating vector database</span>
        <span class="ellipsis">...</span>
      </div>
    </div>
  );
};

export default Loader;
