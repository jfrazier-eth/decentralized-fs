import Link from "next/link";

export const Folder = (props: { name: string }) => {
  return (
    <Link href={`/user/${props.name}`}>
      <div
        className="rounded-lg border text-card-foreground shadow-sm hover:border hover:border-blue-300"
        data-v0-t="card"
      >
        <div className="p-2 flex flex-row justify-start items-center">
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
            {props.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};
