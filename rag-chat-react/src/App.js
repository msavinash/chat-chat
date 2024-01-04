import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Typography } from "antd";
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
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Press+Start+2P&family=Rubik:wght@500&display=swap');
      </style>
      <div align="center" style={{ fontFamily: "Rubik" }}>
        <h1 className="m-5">RagChat</h1>
        <AppBody />
      </div>
    </>
  );
};
export default App;
