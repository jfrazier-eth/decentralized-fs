import { CustomResponse, GetRequest } from "../../controllers/types";
import { getUsers } from "../../lib/users/get-user";
import { GetUsersResponseBody } from "./types";

export const get = async (
  _request: GetRequest,
  response: CustomResponse<GetUsersResponseBody>,
) => {
  const result = await getUsers();

  if (result.isErr()) {
    console.error("Failed to get users", result.error);
    return response.sendStatus(500);
  }

  const users = result.value;

  return response.status(200).json({
    data: users,
  });
};
