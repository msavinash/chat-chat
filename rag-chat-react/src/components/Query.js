import React from "react";
import { Card, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Tooltip, Col, Row, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const Query = ({ updateProcessState, setChatFileState }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    const query = values.query;
    const formData = new FormData();
    formData.append("query", query);
    formData.append("userId", "msavinash1139@gmail.com");
    fetch("http://localhost:5000/getAnswer", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        //   updateProcessState("done");
        // Handle response from server
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
        // Handle errors
      });
  };
  console.log(updateProcessState);
  return (
    <Space direction="vertical" size={16}>
      <Card title="Query" extra={<a href="#">More</a>} style={{ width: 250 }}>
        <Row>
          <Col span={22}>
            <Form onFinish={onFinish}>
              <Form.Item
                label="Query"
                name="query"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          {/* <Col span={2}>
            <Tooltip title="next">
              <Button
                type="primary"
                shape="circle"
                icon={<ArrowRightOutlined />}
                onClick={(e) => {
                  // post request to the server
                  console.log(Form.useForm());
                  //   let query = doc;
                  //   const formData = new FormData();
                  //   formData.append("query");
                  //   formData.append("userId", email);
                  //   formData.append("chunkSize", 100);

                  //   fetch("http://localhost:5000/createVectorStore", {
                  //     method: "POST",
                  //     body: formData,
                  //   })
                  //     .then((response) => response.json())
                  //     .then((data) => {
                  //       console.log("Server response:", data);
                  //       updateProcessState("done");
                  //       // Handle response from server
                  //     })
                  //     .catch((error) => {
                  //       console.error("Error sending data to server:", error);
                  //       // Handle errors
                  //     });
                  // handleNextClick(updateProcessState);
                  // handleFileUpload("done");
                }}
              />
            </Tooltip>
          </Col> */}
        </Row>
      </Card>
    </Space>
  );
};

export default Query;
