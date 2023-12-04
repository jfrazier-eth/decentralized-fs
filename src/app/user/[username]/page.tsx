"use client";
import { useParams } from "next/navigation";
import { useFiles } from "./useFiles";

import React, { useState } from "react";
import { API_HOST } from "../../constants";

const FileInput = (props: {
  selectedFile: File | null;
  setSelectedFile: (file: File) => void;
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    props.setSelectedFile(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {props.selectedFile && <p>File name: {props.selectedFile.name}</p>}
    </div>
  );
};

export default function User() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const { files, refresh } = useFiles(username);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const upload = async () => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    const url = new URL(`/users/${username}/files`, API_HOST);
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.status !== 200) {
      alert(`Failed to upload ${response.statusText}`);
    } else {
      setSelectedFile(null);
      refresh();
    }
  };

  return (
    <div>
      <h1>Welcome {username}</h1>
      <div>
        <h2>Your files</h2>
        <p>Total files: {files.length}</p>
        {files.map((item) => {
          return (
            <div>
              <h3>{item.name}</h3>
              <p>Created {item.createdAt.toString()} </p>
              <p>Confirmed ?</p>
              <button onClick={() => {}}>Download</button>
            </div>
          );
        })}
      </div>

      <div>
        <h2> Upload File</h2>
        <FileInput
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
        <button
          onClick={() => {
            upload();
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
