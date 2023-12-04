import { app } from "./app";
import { arweave } from "./arweave";
import { config } from "./config";

app.set("trust proxy", true);
app.listen(config.server.port, () => {
  console.log(`Server listening on port ${config.server.port}`);

  config.arweave.wallet
    .getAddress()
    .then(async (address) => {
      const winston = await arweave.wallets.getBalance(address);
      const balance = arweave.ar.winstonToAr(winston);
      console.log(
        `Loaded arweave wallet ${address} with balance ${balance} AR`,
      );
    })
    .catch((err) => {
      console.error(err);
    });
});
