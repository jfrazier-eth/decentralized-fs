export const Modal = (props: {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}) => {
  return (
    <div
      className={`absolute w-screen h-screen p-4 z-20 backdrop-blur-sm ${
        props.isOpen ? "" : "hidden"
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.close();
      }}
    >
      <div className="flex z-30 w-full h-full justify-center items-start ">
        <div className="flex flex-col m-4">
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
