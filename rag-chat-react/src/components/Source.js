import React from "react";
import { Spin } from "antd";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Source = ({ documents, loading }) => {
  console.log("DOCUMENTS: " + documents);
  return (
    // <Card>
    //   <Card.Header as="h5">Source</Card.Header>
    //   <Card.Body>
    //     <Spin spinning={loading}>
    //       <ListGroup variant="flush">
    //         {documents.map((document, index) => {
    //           return (
    //             <Card className="my-2" style={{ borderRadius: "20px" }}>
    //               <ListGroup.Item>{document}</ListGroup.Item>
    //             </Card>
    //           );
    //         })}
    //       </ListGroup>
    //     </Spin>
    //   </Card.Body>
    // </Card>

    <div class="scrollbar" id="style-1" style={{ width: "100%" }}>
      <div class="force-overflow">
        <div
          className="px-3"
          style={{ height: "100%", overflowY: "auto" }}
          // id="style-1"
        >
          <h4>Source</h4>
          <hr />
          <Spin spinning={loading}>
            <ListGroup variant="flush">
              {documents.map((document, index) => {
                return (
                  <Card className="my-2" style={{ borderRadius: "20px" }}>
                    <ListGroup.Item>{document}</ListGroup.Item>
                  </Card>
                );
              })}
            </ListGroup>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Source;
