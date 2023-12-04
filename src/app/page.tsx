"use client";
import { useState } from "react";
import { useUsers } from "./user/useUsers";

export default function Page() {
  const { users, save } = useUsers();

  const [username, setUsername] = useState("");

  return (
    <div>
      <h1>Welcome!</h1>
      <div>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Create a new user"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button
          onClick={() => {
            save(username);
          }}
        >
          Submit
        </button>
      </div>

      <h2>Sign In</h2>
      {users.map((item) => {
        return <div key={item.id}>{item.username}</div>;
      })}
    </div>
  );
}
