import React from "react";
import Card from "react-bootstrap/Card";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Tooltip, Col, Row, Alert, Form } from "antd";
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
      userId: Date.now(),
    });
    updateProcessState("loading");
  }

  console.log(updateProcessState);
  return (
    <div style={{ margin: "auto", marginTop: "10%" }}>
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
        closable
        // onClose={onClose}
        style={{ visibility: "hidden" }}
      />
      <Card align="left" style={{ minWidth: "10rem" }}>
        <Card.Header as="h5" align="center">
          Chat Import
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <Form onFinish={(values) => onFinish(values)}>
              {/* <Form.Item
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
              </Form.Item> */}
              <Row>
                <Col span={20}>
                  <Form.Item
                    name="chatFile"
                    rules={[
                      {
                        required: true,
                        message: "Please upload a file!",
                      },
                    ]}
                  >
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />} type="default">
                        Click to Upload
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <div className="mx-2">
                    <Tooltip title="next">
                      <Button
                        htmlType="submit"
                        type="primary"
                        shape="circle"
                        icon={<ArrowRightOutlined />}
                      />
                    </Tooltip>
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FileUpload;
