import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Typography, ConfigProvider } from "antd";
import Loader from "./components/Loader/Loader";
import FileUpload from "./components/Loader/FileUpload";
import AppBody from "./AppBody";
import { useState } from "react";
import Query from "./components/Query";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";

const { Title } = Typography;

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

          <div className="m-5">
            <AppBody />
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};
export default App;
