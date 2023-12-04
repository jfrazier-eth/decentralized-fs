import { pgQuery, pgQueryOne } from "../../db/postgres";
import { transformPGUser, transformPGUsers } from "./transform";
import { PGUser } from "./types";

export const getUser = async (user: { id: string } | { username: string }) => {
  let query: string;

  if ("id" in user) {
    query = `SELECT * from users WHERE id = ${user.id};`;
  } else {
    query = `SELECT * from users WHERE username = ${user.username};`;
  }

  return (await pgQueryOne<PGUser>(query)).map(transformPGUser);
};

export const getUsers = async () => {
  return (await pgQuery<PGUser>("SELECT * from users;")).map(transformPGUsers);
};
