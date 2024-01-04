import "./Loader.css";
import React from "react";
import { Row, Col } from "antd";
import "ldrs/helix";
import { infinity } from "ldrs";
import Typical from "react-typical";

const Loader = () => {
  const loadingText = [
    "Loading text...",
    2000,
    "Converting into vectors...",
    2000,
    "Building vector store...",
    2000,
  ];
  return (
    <div>
      <div aria-live="polite" className="m-5">
        {<l-helix size="200"></l-helix>}
      </div>
      <div className="m-5" style={{ fontSize: "2em" }}>
        {/* <Typical steps={loadingText} loop={Infinity} wrapper="p" /> */}
        <span>Creating vector database...</span>
      </div>
    </div>
  );
};

export default Loader;
