import { uid } from "../../../common/uid";
import { pgQuery, pgp } from "../../db/postgres";
import { transformFile } from "./transform";
import { File } from "./types";

export const createFile = async (
  params: Pick<File, "userId" | "transactionId" | "name">,
) => {
  const file: File = {
    id: uid(),
    userId: params.userId,
    transactionId: params.transactionId,
    name: params.name,
    createdAt: new Date(),
  };

  const pgFile = transformFile(file);

  const columnSet = new pgp.helpers.ColumnSet(Object.keys(pgFile), {
    table: "files",
  });

  const insert = pgp.helpers.insert(pgFile, columnSet);
  return (await pgQuery<never>(insert)).map(() => file);
};
