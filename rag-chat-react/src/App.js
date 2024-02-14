import React from "react";
import { ConfigProvider } from "antd";
import AppBody from "./AppBody";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000000",
          },
        }}
      >
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Press+Start+2P&family=Rubik:wght@500&display=swap');
        </style>
        <div align="center" style={{ fontFamily: "Rubik" }}>
          <div className="pt-5 px-2">
            <h1 style={{ fontSize: "80px", margin: "auto" }}>
              <strong>RagChat.</strong>
            </h1>
            <h3>Chat with your conversations using AI</h3>
          </div>

          <div className="mt-5">
            <AppBody />
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};
export default App;
