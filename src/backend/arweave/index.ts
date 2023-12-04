import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol
});

const decodeWallet = (key: string) => {
  const buffer = Buffer.from(key, "base64");
  const jwk = JSON.parse(buffer.toString());

  return {
    jwk,
    getAddress: () => arweave.wallets.getAddress(jwk),
  };
};

export { arweave, decodeWallet };
