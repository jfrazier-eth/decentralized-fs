import { useEffect, useState } from "react";
import { File } from "../../../backend/lib/files/types";
import { API_HOST } from "../../constants";
import { GetFilesResponseBody } from "../../../backend/routes/users/:user/files/types";

export const useFiles = (username: string) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nonce, setNonce] = useState(0);

  const fetchFiles = (signal: { abort: boolean }) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    fetch(new URL(`users/${username}/files`, API_HOST), {
      method: "GET",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(
            `Failed to get files for user ${username} ${res.statusText}`,
          );
        }
        return res.json() as Promise<GetFilesResponseBody>;
      })
      .then(({ data }) => {
        if (signal.abort) {
          return;
        }
        setFiles(data);
      })
      .catch((err) => {
        console.error(err);
        if (signal.abort) {
          return;
        }
        alert(`Failed to get files ${err?.toString?.()}`);
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

    fetchFiles(signal);

    return () => {
      signal.abort = true;
    };
  }, [nonce]);

  const refresh = () => {
    setNonce((prev) => prev + 1);
  };

  return {
    files,
    refresh,
    isLoading,
  };
};
