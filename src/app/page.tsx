"use client";
import { useState } from "react";
import { useUsers } from "./user/useUsers";
import { Folder } from "./components/folder";
import { Modal } from "./components/modal";
import { Spotlight } from "./components/spotlight";
import { Header } from "./components/header";

export default function Page() {
  const { users, save } = useUsers();
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header title="Home">
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
      </Header>

      <div className="grow flex flex-col min-w-0">
        <div className="flex-grow py-4 overflow-y-auto">
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {users.map((user) => {
              return <Folder name={user.username} />;
            })}
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} close={() => setModalOpen(false)}>
        <Spotlight title="New Folder">
          <>
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="flex h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ml-4 w-full bg-gray-200 dark:bg-gray-800"
              placeholder="Name"
              type="text"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                save(value);
                setValue("");
                setModalOpen(false);
              }}
              className="ml-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-gray-800 hover:text-accent-foreground h-10 px-4 py-2"
            >
              Submit
            </button>
          </>
        </Spotlight>
      </Modal>
    </div>
  );
}
