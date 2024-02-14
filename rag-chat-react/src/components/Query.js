import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Spin, Button, Form, Input } from "antd";
import { TypeAnimation } from "react-type-animation";
import Source from "./Source";

// // const BASE_URL = "http://localhost:5000";
// // const BASE_URL = "http://172.178.77.50";
// const BASE_URL = "https://ragchat.ddns.net:80";

const Query = ({ userId, BASE_URL }) => {
  const [queryResult, setQueryResult] = useState({ answer: "", docs: [] });
  const [loading, setLoading] = useState(false);
  const [seed, setSeed] = useState(1);
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
        setSeed(Math.random());
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
                            <TypeAnimation
                              key={seed}
                              sequence={[queryResult.answer]}
                              wrapper="p"
                              speed={50}
                              style={{
                                fontSize: "1rem",
                                display: "inline-block",
                              }}
                              repeat={1}
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
          <div className="col-md-6 col-12" style={{ height: "100%" }}>
            <Source documents={queryResult["docs"]} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Query;
