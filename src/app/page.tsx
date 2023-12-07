"use client";
import { useState } from "react";
import { useUsers } from "./user/useUsers";
import { Folder } from "./components/folder";
import { Modal } from "./components/modal";
import { Spotlight } from "./components/spotlight";

export default function Page() {
  const { users, save } = useUsers();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="h-full w-full flex flex-row overflow-hidden">
      <div className="border-r w-64 min-h-screen flex flex-col bg-gray-950">
        <div className="flex flex-row items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">ArBox</h2>
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-gray-800 hover:text-accent-foreground h-10 px-4 py-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setModalOpen(true);
            }}
          >
            New Folder
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
        </div>
        <nav className="flex-grow overflow-y-auto">
          <a
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            href="#"
          >
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
              className="mr-2 h-4 w-4"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </a>
          <a
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            href="#"
          >
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
              className="mr-2 h-4 w-4"
            >
              <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"></path>
              <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"></path>
              <path d="M15 2v5h5"></path>
            </svg>
            Documents
          </a>
        </nav>
      </div>
      <div className="grow flex flex-col min-w-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg h-10 py-2">Home</h2>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="grid gap-4 grid-cols-4">
            {users.map((user) => {
              return <Folder name={user.username} />;
            })}
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} close={() => setModalOpen(false)}>
        <Spotlight
          placeholder="Name"
          save={(value) => {
            save(value);
            setModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
