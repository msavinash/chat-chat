import React from "react";
import { Card, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  Upload,
  Tooltip,
  Col,
  Row,
  Input,
  Alert,
  Form,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

let chatFile = null;

const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  beforeUpload: (file) => {
    const isTextFile = file.type === "text/plain";
    if (!isTextFile) {
      message.error(`${file.name} is not a text file (plain text)`);
    }
    return isTextFile || Upload.LIST_IGNORE;
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

const FileUpload = ({ updateProcessState, setUserInputState }) => {
  function onFinish(values) {
    console.log("Success:", values);
    setUserInputState({
      chatFile: values.chatFile.file.originFileObj,
      // create user id with user email and current timestamp
      userId: values.userEmail + "___" + Date.now(),
    });
    updateProcessState("loading");
  }

  console.log(updateProcessState);
  return (
    <Space direction="vertical" size={16}>
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
        closable
        // onClose={onClose}
        style={{ visibility: "hidden" }}
      />
      <Card
        title="Upload File"
        extra={<a href="#">More</a>}
        style={{ width: 250 }}
      >
        <Row>
          <Col span={24}>
            {/* <Input className="form-control" type="text" placeholder="Email" /> */}
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <Form onFinish={(values) => onFinish(values)}>
              <Form.Item
                name="userEmail"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="chatFile"
                rules={[
                  {
                    required: true,
                    message: "Please upload a file!",
                  },
                ]}
              >
                <Upload {...props} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Tooltip title="next">
                <Button
                  htmlType="submit"
                  type="primary"
                  shape="circle"
                  icon={<ArrowRightOutlined />}
                />
              </Tooltip>
            </Form>
          </Col>
          <Col span={2}>
            {/* <Tooltip title="next">
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
            </Tooltip> */}
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default FileUpload;
