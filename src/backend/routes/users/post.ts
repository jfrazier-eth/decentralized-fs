import { CustomResponse, PostRequest } from "../../controllers/types";
import { createUser } from "../../lib/users/create-user";

export const post = async (
  request: PostRequest<{ username: string }>,
  response: CustomResponse<string | never>,
) => {
  const username = request.body.username?.trim?.().toLowerCase?.();

  if (!username) {
    return response.status(400).send("Invalid username");
  }

  const result = await createUser({ username });

  if (result.isErr()) {
    console.error("Failed to save user", result.error);
    return response.status(500).send("Failed to save user");
  }

  return response.sendStatus(200);
};
