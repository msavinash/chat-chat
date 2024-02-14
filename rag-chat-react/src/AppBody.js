import React from "react";
import Loader from "./components/Loader/Loader";
import { helix } from "ldrs";
import FileUpload from "./components/Loader/FileUpload";
import { useState } from "react";
import Query from "./components/Query";

helix.register();
const BASE_URL = "http://localhost:5000";

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

      fetch(BASE_URL + "/createVectorStore", {
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

    return <Loader style={{ width: "10%" }} />;
  } else if (processStatus === "new") {
    return (
      <div className="row m-5">
        <div
          className="row main-body"
          style={{ height: "22rem", margin: "auto" }}
        >
          <div
            className="col-md-6 col-12 mb-3 divider"
            align="left"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h5>
              &gt; Step 1: Upload a chat file (
              <a
                href="https://gist.github.com/msavinash/935617450c8c35aae91d541d677dc737"
                target="_blank"
              >
                sample file
              </a>
              )
            </h5>
            <h5>&gt; Step 2: Wait for vectorstore to be built</h5>
            <h5>&gt; Step 3: Ask a question</h5>
          </div>
          <div
            className="col-md-6 col-12 px-md-5"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FileUpload
              updateProcessState={updateProcessState}
              setUserInputState={setUserInputState}
            />
          </div>
        </div>
      </div>
    );
  } else if (processStatus === "done") {
    return <Query userId={userInput.userId} BASE_URL={BASE_URL} />;
  }
};
export default AppBody;
