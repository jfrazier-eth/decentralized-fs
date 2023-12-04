import { Result, ok, err } from "neverthrow";
import { uid } from "../../../common";
import { PGError, pgQuery } from "../../db/postgres";
import { pgp } from "../../db/postgres/db";
import { transformUser } from "./transform";
import { User } from "./types";

export interface UserParams {
  username: string;
}

export const createUser = async (
  params: UserParams,
): Promise<Result<User, PGError>> => {
  const user: User = {
    id: uid(),
    username: params.username,
    createdAt: new Date(),
  };

  const pgUser = transformUser(user);

  const columnSet = new pgp.helpers.ColumnSet(Object.keys(pgUser), {
    table: "users",
  });
  const insert = pgp.helpers.insert(pgUser, columnSet);

  const result = await pgQuery<never>(insert);
  if (result.isOk()) {
    return ok(user);
  }
  return err(result.error);
};
