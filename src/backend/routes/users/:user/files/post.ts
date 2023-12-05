import { uploadFile } from "../../../../arweave/upload";
import { PostRequest, UserResponse } from "../../../../controllers/types";
import { createFile } from "../../../../lib/files/create-file";
import { getUser } from "../../../../lib/users/get-user";

export const post = async (
  request: PostRequest,
  response: UserResponse<string | { data: string }>,
) => {
  const file = request.file;
  const userResult = await getUser({ username: response.locals.username });
  if (userResult.isErr()) {
    console.log(`User not valid`, userResult.error);
    return response.status(400).send("User not valid");
  }

  const rawData = file.buffer.buffer;
  const uploadResult = await uploadFile(rawData);
  if (uploadResult.isErr()) {
    return response.status(500).send(uploadResult.error.message);
  }

  const createFileResult = await createFile({
    userId: userResult.value.id,
    transactionId: uploadResult.value.transaction.id,
    name: request.file.originalname,
  });

  if (createFileResult.isErr()) {
    return response.status(500).send("Failed to save file metadata");
  }

  return response.status(200).send(uploadResult.value.transaction.id);
};
