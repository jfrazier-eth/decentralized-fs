import { PGFile, File } from "./types";

export const transformPGFile = (pgFile: PGFile): File => {
  return {
    id: pgFile.id,
    userId: pgFile.user_id,
    transactionId: pgFile.transaction_id,
    name: pgFile.name,
    createdAt: pgFile.created_at,
  };
};

export const transformPGFiles = (files: PGFile[]): File[] => {
  return files.map(transformPGFile);
};

export const transformFile = (file: File): PGFile => {
  return {
    id: file.id,
    user_id: file.userId,
    transaction_id: file.transactionId,
    name: file.name,
    created_at: file.createdAt,
  };
};
