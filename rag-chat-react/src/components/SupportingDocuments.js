import React, { useState } from "react";
import { Card, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Tooltip, Col, Row, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { TypeAnimation } from "react-type-animation";
import Answer from "./Answer";
import Typewriter from "react-ts-typewriter";
import Typical from "react-typical";

const SupportingDocuments = ({ documents }) => {
  console.log("DOCUMENTS: " + documents);
  return (
    <Card title="Suppporting Documents">
      <Space direction="vertical">
        {documents.map((document, index) => {
          return (
            <Row>
              <Col span={24}>
                <Card key={index}>{document}</Card>
              </Col>
            </Row>
          );
        })}
      </Space>
    </Card>
  );
};

export default SupportingDocuments;
