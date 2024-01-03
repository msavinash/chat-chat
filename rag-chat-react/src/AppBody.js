import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Typography } from "antd";
import Loader from "./components/Loader/Loader";
import FileUpload from "./components/Loader/FileUpload";
import { useState } from "react";
import Query from "./components/Query";

const { Title } = Typography;

const AppBody = () => {
  let [processStatus, setProcessStatus] = useState("new");
  let [userInput, setUserInput] = useState({ userId: "", chatFile: null });

  const updateProcessState = (newProcessStatus) => {
    // Update the name in the component's state
    setProcessStatus(newProcessStatus);
  };
  const setUserInputState = (newUserInput) => {
    // Update the name in the component's state
    setUserInput(newUserInput);
  };

  if (processStatus === "loading") {
    console.log("Loading...");
    console.log(userInput);
    if (userInput.chatFile && userInput.userId) {
      const formData = new FormData();
      formData.append("chatFile", userInput.chatFile);
      formData.append("userId", userInput.userId);
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

    return <Loader />;
  } else if (processStatus === "new") {
    return (
      <div>
        <FileUpload
          updateProcessState={updateProcessState}
          setUserInputState={setUserInputState}
        />
      </div>
    );
  } else if (processStatus === "done") {
    return <Query userId={userInput.userId} />;
  }
};
export default AppBody;
