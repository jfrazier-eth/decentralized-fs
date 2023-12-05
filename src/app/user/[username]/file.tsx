import { File } from "../../../backend/lib/files/types";
import Arweave from "arweave";

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

export const FileMetadata = ({ file }: { file: File }) => {
  return (
    <div
      style={{
        background: "#fafafa",
        margin: "1rem",
        padding: "1rem",
        border: "1px solid black",
        maxWidth: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>{file.name}</p>
        <a
          target="_blank"
          href={`https://viewblock.io/arweave/tx/${file.transactionId}`}
        >
          View Transaction
        </a>
      </div>
      <div
        style={{
          display: "flex",
          flex: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>{new Date(file.createdAt).toLocaleString()} </p>
        <button
          onClick={() => {
            downloadFile(file);
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};
