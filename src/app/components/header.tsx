import Link from "next/link";

export const Header = (props: { children: React.ReactNode; title: string }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row w-full items-center justify-between p-4 border-b">
        <div className="flex flex-row items-center justify-between">
          <div className="border-r pr-4">
            <Link href="/">
              <h2 className="text-lg font-semibold hover:text-blue-400">
                ArBox
              </h2>
            </Link>
          </div>
          <h3 className="text-md font-semibold text-left ml-4">
            {props.title}
          </h3>
        </div>
        {props.children}
      </div>
    </div>
  );
};
