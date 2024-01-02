// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import Loader from "./components/Loader/Loader";
import FileUpload from "./components/Loader/FileUpload";
import { useState } from "react";
import Query from "./components/Query";

const App = () => {
  let [processStatus, setProcessStatus] = useState("new");
  let [chatFile, setChatFile] = useState(null);

  const updateProcessState = (newProcessStatus) => {
    // Update the name in the component's state
    setProcessStatus(newProcessStatus);
  };
  const setChatFileState = (newChatFile) => {
    // Update the name in the component's state
    setChatFile(newChatFile);
  };

  const email = "msavinash1139@gmail.com";
  if (processStatus === "loading") {
    if (chatFile && email) {
      const formData = new FormData();
      formData.append("chatFile", chatFile);
      formData.append("userId", email);
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
        <h1>Ant Design File Upload</h1>
        <FileUpload
          updateProcessState={updateProcessState}
          setChatFileState={setChatFileState}
        />
      </div>
    );
  } else if (processStatus === "done") {
    return <Query />;
  }
};
export default App;
