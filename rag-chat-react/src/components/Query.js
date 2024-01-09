import React, { useState } from "react";
import { Space } from "antd";
import Card from "react-bootstrap/Card";
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
import Source from "./Source";

// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "http://172.178.77.50";
const BASE_URL = "https://ragchat.ddns.net:80";

const Query = ({ userId }) => {
  const [queryResult, setQueryResult] = useState({ answer: "", docs: [] });
  const [loading, setLoading] = useState(false);
  // const [queryAnswer, setQueryAnswer] = useState("");
  // const [docs, setDocs] = useState([]);
  const onFinish = (values) => {
    // setQueryAnswer("");
    setLoading(true);
    setQueryResult({ answer: "", docs: [] });
    console.log("Success:", values);
    const query = values.query;
    const formData = new FormData();
    formData.append("query", query);
    formData.append("userId", userId);
    fetch(BASE_URL + "/getAnswer", {
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
    <>
      <div style={{ fontFamily: "Rubik" }}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <div className="row" style={{ width: "80%", height: "22rem" }}>
          <div className="col-md-6 col-12 mb-3 divider pb-5">
            <Card>
              <Card.Header as="h5">Query</Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="row">
                    <Form
                      onFinish={(values) => onFinish(values)}
                      style={{ width: "100%" }}
                    >
                      <div className="row" style={{ width: "90%" }}>
                        <div className="col-lg-10 col-md-8 col-12" align="left">
                          <Form.Item name="query" style={{ width: "100%" }}>
                            <Input placeholder="Who uses spotify?" />
                          </Form.Item>
                        </div>
                        <div className="col-lg-2 col-md-4 col-12">
                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Go
                            </Button>
                          </Form.Item>
                        </div>
                        {/* </Space> */}
                      </div>
                    </Form>
                  </div>
                  <hr />
                  <div className="row">
                    <div style={{ width: "100%" }} align="left">
                      <Spin spinning={loading}>
                        <div className="row">
                          <div className="col-1">
                            <div>
                              <span class="material-symbols-outlined">
                                smart_toy
                              </span>
                            </div>
                          </div>
                          <div className="col-11">
                            <Typical
                              steps={[queryResult.answer]}
                              loop={1}
                              wrapper="p"
                            />
                          </div>
                        </div>
                      </Spin>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6 col-12">
            <Source documents={queryResult["docs"]} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Query;
