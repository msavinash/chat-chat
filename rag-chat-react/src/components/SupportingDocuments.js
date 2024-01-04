import React, { useState } from "react";
import { Spin } from "antd";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Tooltip, Col, Row, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { TypeAnimation } from "react-type-animation";
import Answer from "./Answer";
import Typewriter from "react-ts-typewriter";
import Typical from "react-typical";

const SupportingDocuments = ({ documents, loading }) => {
  console.log("DOCUMENTS: " + documents);
  return (
    <Card>
      <Card.Header as="h5">Suppporting Chats</Card.Header>
      <Card.Body>
        <Spin spinning={loading}>
          <ListGroup variant="flush">
            {documents.map((document, index) => {
              return <ListGroup.Item>{document}</ListGroup.Item>;
            })}
          </ListGroup>
        </Spin>
      </Card.Body>
    </Card>
  );
};

export default SupportingDocuments;
