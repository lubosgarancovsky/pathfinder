import CloseIcon from "./icons/CloseIcon";

interface ModalProps {
  opened: boolean;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<ModalProps> = ({ opened, toggleOpen }) => {
  return (
    <>
      {opened && (
        <div className="fixed top-0 left-0 w-screen h-screen grid place-items-center bg-black bg-opacity-60 z-50 transition">
          <div className="bg-neutral-900 rounded-xl max-w-[48rem] p-8">
            <div className="flex justify-between">
              <h3>Hint</h3>
              <button
                className="grid place-items-center border border-neutral-600 rounded-md w-6 h-6 hover:bg-neutral-800"
                onClick={() => {
                  toggleOpen(false);
                }}
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-neutral-400 mt-4">
              Before you run the algoritm,{" "}
              <b>you have to specify the starting and ending positions</b> on
              the grid.
            </p>
            <p className="text-neutral-400">
              You can do that by clicking on the buttons and then drawing the
              points onto the grid. Drawing tool is active when the button is
              highlighted.
            </p>
            <img
              className="mt-8"
              src="/images/hint.png"
              alt="hint screenshot"
            />
          </div>
        </div>
      )}
    </>
  );
};
