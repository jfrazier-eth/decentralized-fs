import { useEffect, useState } from "react";
import { User } from "../../backend/lib/users/types";
import { API_HOST } from "../constants";
import { GetUsersResponseBody } from "../../backend/routes/users/types";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nonce, setNonce] = useState(0);

  const fetchUsers = (signal: { abort: boolean }) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    fetch(new URL("users", API_HOST), {
      method: "GET",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Failed to get users ${res.statusText}`);
        }
        return res.json() as Promise<GetUsersResponseBody>;
      })
      .then(({ data }) => {
        if (signal.abort) {
          return;
        }
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
        if (signal.abort) {
          return;
        }
        alert(`Failed to get users ${err?.toString?.()}`);
      })
      .finally(() => {
        if (signal.abort) {
          return;
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const signal = {
      abort: false,
    };

    fetchUsers(signal);

    return () => {
      signal.abort = true;
    };
  }, [nonce]);

  const refresh = () => {
    setNonce((prev) => prev + 1);
  };

  const save = async (username: string) => {
    const res = await fetch(new URL("users", API_HOST), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    if (res.status !== 200) {
      alert(`Failed to create user ${res.statusText}`);
      return;
    }
    refresh();
  };

  return {
    users,
    refresh,
    save,
    isLoading,
  };
};
