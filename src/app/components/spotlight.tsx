import { useState } from "react";

export const Spotlight = (props: {
  placeholder: string;
  save: (value: string) => void;
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full h-full flex items-center justify-center bg-primary bg-opacity-50">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-80 h-auto max-h-[500px] overflow-auto p-4"
        data-v0-t="card"
      >
        <div className="flex flex-row justify-center text-center items-center mb-2">
          <p> New Folder </p>
        </div>
        <div className="flex items-center px-4">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="flex h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ml-4 w-full bg-gray-200 dark:bg-gray-800"
            placeholder={props.placeholder}
            type="text"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.save(value);
              setValue("");
            }}
            className="ml-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-gray-800 hover:text-accent-foreground h-10 px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
