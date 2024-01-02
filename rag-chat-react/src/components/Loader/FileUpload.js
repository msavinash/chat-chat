import React from "react";
import { Card, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Tooltip, Col, Row } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

let chatFile = null;

const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      chatFile = info.file.originFileObj;
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const handleNextClick = (updateProcessState) => {
  console.log("Next button clicked");
  const email = "example@example.com";

  if (chatFile && email) {
    const formData = new FormData();
    formData.append("chatFile", chatFile);
    formData.append("userId", email);
    formData.append("chunkSize", 100);

    fetch("http://localhost:5000/createVectorStore", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        updateProcessState("done");
        // Handle response from server
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
        // Handle errors
      });
  } else {
    console.error("File or email is missing.");
  }
};

const FileUpload = ({ updateProcessState, setChatFileState }) => {
  console.log(updateProcessState);
  return (
    <Space direction="vertical" size={16}>
      <Card
        title="Upload File"
        extra={<a href="#">More</a>}
        style={{ width: 250 }}
      >
        <Row>
          <Col span={22}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Col>
          <Col span={2}>
            <Tooltip title="next">
              <Button
                type="primary"
                shape="circle"
                icon={<ArrowRightOutlined />}
                onClick={(e) => {
                  setChatFileState(chatFile);
                  updateProcessState("loading");
                  // post request to the server
                  // handleNextClick(updateProcessState);
                  // handleFileUpload("done");
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default FileUpload;
