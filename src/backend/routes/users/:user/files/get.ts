import { UserGetRequest, UserResponse } from "../../../../controllers/types";
import { getFiles } from "../../../../lib/files/get-files";
import { GetFilesResponseBody } from "./types";

export const get = async (
  _request: UserGetRequest,
  response: UserResponse<GetFilesResponseBody>,
) => {
  const username = response.locals.username;

  const files = await getFiles({ username });

  if (files.isErr()) {
    console.error(`Failed to get files`, files.error);
    return response.sendStatus(500);
  }

  return response.status(200).json({
    data: files.value,
  });
};
