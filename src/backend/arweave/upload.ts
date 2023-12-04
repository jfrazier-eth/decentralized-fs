import PQueue from "p-queue";
import { arweave } from ".";
import { config } from "../config";
import { ResultAsync } from "neverthrow";

const queue = new PQueue({ concurrency: 1 });

const upload = async (data: string) => {
  const jwk = config.arweave.wallet.jwk;
  const transaction = await arweave.createTransaction({ data }, jwk);
  await arweave.transactions.sign(transaction, jwk);

  const response = await arweave.transactions.post(transaction);

  console.log("Transaction ID:", transaction.id);
  console.log("Transaction Reward", transaction.reward);
  console.log("Response:", response.status, response.statusText);

  return {
    transaction,
    response,
    getStatus: () => arweave.transactions.getStatus(transaction.id),
    getData: () => arweave.transactions.getData(transaction.id),
  };
};

export const uploadFile = async (data: string) => {
  return queue.add(async () => {
    return await ResultAsync.fromPromise(upload(data), (_e) => {
      return new Error("Failed to upload file");
    });
  });
};
