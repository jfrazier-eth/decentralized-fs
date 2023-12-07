"use client";
import { useParams } from "next/navigation";
import { useFiles } from "./useFiles";

import React, { useState } from "react";
import { API_HOST } from "../../constants";
import { Header } from "../../components/header";
import { Modal } from "../../components/modal";
import { Spotlight } from "../../components/spotlight";
import { FileItem } from "../../components/file";

const FileInput = (props: {
  selectedFile: File | null;
  setSelectedFile: (file: File) => void;
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    props.setSelectedFile(file);
  };

  return (
    <div
      className="w-full"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <input className="z-40" type="file" onChange={handleFileChange} />
    </div>
  );
};

export default function User() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const [modalOpen, setModalOpen] = useState(false);
  const { files, refresh } = useFiles(username);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const upload = async (file: File) => {
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
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header title={username}>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-gray-800 hover:text-accent-foreground h-10 px-4 py-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setModalOpen(true);
          }}
        >
          Upload File
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4"
          >
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
          </svg>
        </button>
      </Header>

      <div className="grow flex flex-col min-w-0">
        <div className="flex-grow py-4 overflow-y-auto">
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => {
              return <FileItem file={file} />;
            })}
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} close={() => setModalOpen(false)}>
        <Spotlight title="Select a file">
          <div className="w-full flex flex-col justify-center items-start">
            <FileInput
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            <div className="mx-auto">
              <button
                className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-gray-800 hover:text-accent-foreground h-10 px-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (selectedFile) {
                    upload(selectedFile);
                    setModalOpen(false);
                    setSelectedFile(null);
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </Spotlight>
      </Modal>
    </div>
  );
}
