import { File as FileMetadata } from "../../backend/lib/files/types";
import Arweave from "arweave";

export const downloadFile = async (file: FileMetadata) => {
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

export const FileItem = ({ file }: { file: FileMetadata }) => {
  return (
    <div
      className="rounded-lg border text-card-foreground shadow-sm"
      data-v0-t="card"
    >
      <button
        className="m-2 flex flex-row justify-start items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background h-8 hover:text-blue-400"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          downloadFile(file);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
        </svg>
        <h3 className="ml-4 text-lg leading-none tracking-tight text-center ">
          {file.name}
        </h3>
      </button>
      <div className="p-2 flex flex-row justify-between items-center text-sm">
        <a
          className="hover:text-blue-500"
          target="_blank"
          href={`https://viewblock.io/arweave/tx/${file.transactionId}`}
        >
          View txn
        </a>
        <p>{new Date(file.createdAt).toLocaleString()} </p>
      </div>
    </div>
  );
};
