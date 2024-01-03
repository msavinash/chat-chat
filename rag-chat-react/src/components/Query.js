import React, { useState } from "react";
import { Card, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  Spin,
  Button,
  message,
  Upload,
  Tooltip,
  Col,
  Row,
  Form,
  Input,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { TypeAnimation } from "react-type-animation";
import Answer from "./Answer";
import Typewriter from "react-ts-typewriter";
import Typical from "react-typical";
import SupportingDocuments from "./SupportingDocuments";

const Query = ({ userId }) => {
  const [queryResult, setQueryResult] = useState({ answer: "", docs: [] });
  const [loading, setLoading] = useState(false);
  // const [queryAnswer, setQueryAnswer] = useState("");
  // const [docs, setDocs] = useState([]);
  const onFinish = (values) => {
    // setQueryAnswer("");
    setLoading(true);
    console.log("Success:", values);
    const query = values.query;
    const formData = new FormData();
    formData.append("query", query);
    formData.append("userId", userId);
    fetch("http://localhost:5000/getAnswer", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setQueryResult({ answer: data.result, docs: data.source_documents });
        //   updateProcessState("done");
        // Handle response from server
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
        // Handle errors
      });
  };
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: "80%" }}>
      <Col className="gutter-row" span={12}>
        <Card title="Query">
          <Row>
            <Form
              onFinish={(values) => onFinish(values)}
              style={{ width: "100%" }}
            >
              <Row>
                {/* <Space direction="horizontal" style={{ width: "100%" }}> */}
                <Col className="gutter-row" span={20}>
                  <Form.Item name="query" style={{ width: "80%" }}>
                    <Input placeholder="Enter your query" />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={4}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Query
                    </Button>
                  </Form.Item>
                </Col>
                {/* </Space> */}
              </Row>
            </Form>
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
          {/* <Row>
            <Typical steps={[queryResult["answer"]]} loop={1} wrapper="p" />
          </Row> */}
          <Spin spinning={loading}>
            <Row>
              <Typical steps={[queryResult.answer]} loop={1} wrapper="p" />
            </Row>
          </Spin>
        </Card>
        {/* <Typewriter text={["", queryAnswer]} delay={10} /> */}
      </Col>
      <Col className="gutter-row" span={12}>
        <SupportingDocuments documents={queryResult["docs"]} />
      </Col>
    </Row>
  );
};

export default Query;
