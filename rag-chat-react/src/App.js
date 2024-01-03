import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Typography } from "antd";
import Loader from "./components/Loader/Loader";
import FileUpload from "./components/Loader/FileUpload";
import AppBody from "./AppBody";
import { useState } from "react";
import Query from "./components/Query";

const { Title } = Typography;

const App = () => {
  return (
    <div align="center">
      <h1>RagChat</h1>
      <AppBody />
    </div>
  );
};
export default App;
