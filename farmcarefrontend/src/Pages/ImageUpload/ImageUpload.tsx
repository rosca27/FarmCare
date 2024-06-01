import React, { useState } from "react";
import { LoginComponent, LoginInput } from "../Login/Login.css";
import { ImageInput, ImageInputBox, UploadButton } from "./ImageUpload.css";
import Sidebar from "../../Components/Sidebar/Sidebar";

export function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch("http://127.0.0.1:3005/predict", {
        method: "POST",
        body: formData,
      })
        .then(async (response) => {
          const data = await response.json();
          setResult(data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <LoginComponent>
      <Sidebar />
      <ImageInputBox>
        <ImageInput type="file" onChange={handleFileChange} />
        <UploadButton onClick={handleUpload}>Upload</UploadButton>
        {result && <div>Result: {result}</div>}{" "}
      </ImageInputBox>
    </LoginComponent>
  );
}
