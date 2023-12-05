import Arweave from "arweave";
import { File } from "../../../backend/lib/files/types";

export const downloadFile = async (file: File) => {
  try {
    const arweave = Arweave.init({
      host: "arweave.net", // Hostname or IP address for a Arweave host
      port: 443, // Port
      protocol: "https", // Network protocol
    });

    const rawData = await arweave.transactions.getData(file.transactionId, {
      decode: true,
      string: false,
    });

    const blob = new Blob([rawData], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    var element = document.createElement("a");
    element.setAttribute("href", url);
    element.setAttribute("download", file.name);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error(`Failed to download data`, err);
  }
};
