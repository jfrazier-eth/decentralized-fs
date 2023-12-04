import { pgQuery } from "../../db/postgres";
import { transformPGFiles } from "./transform";
import { PGFile } from "./types";

export const getFiles = async (user: { username: string } | { id: string }) => {
  let query: string;

  if ("username" in user) {
    query = `SELECT files.* FROM files JOIN users ON files.user_id = users.id WHERE users.username = '${user.username}';`;
  } else {
    query = `SELECT * FROM files WHERE id = '${user.id}'';`;
  }

  const res = await pgQuery<PGFile>(query);
  if (res.isOk()) {
    console.log(res.value);
  }
  const result = (await pgQuery<PGFile>(query)).map(transformPGFiles);

  return result;
};
