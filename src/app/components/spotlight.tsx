export const Spotlight = (props: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-primary bg-opacity-50">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm h-auto max-h-[500px] overflow-auto p-4"
        data-v0-t="card"
      >
        <div className="flex flex-row justify-center text-center items-center mb-2">
          <p>{props.title}</p>
        </div>
        <div className="flex items-center px-4">{props.children}</div>
      </div>
    </div>
  );
};
