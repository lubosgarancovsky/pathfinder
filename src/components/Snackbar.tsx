import classNames from "classnames";
import CloseIcon from "./icons/CloseIcon";
import { useEffect } from "react";

export type SnackbarVariant = "success" | "warning";

interface SnackbarProps {
  opened: boolean;
  title: string;
  variant: SnackbarVariant;
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  opened,
  title,
  onClose,
  variant,
}) => {
  const snackbarClasses = classNames(
    "fixed z-40 left-4 bottom-4 p-2 rounded-sm flex gap-12",
    {
      "bg-green-800": variant === "success",
    },
    {
      "bg-red-600": variant === "warning",
    }
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [opened]);
  return (
    <>
      {opened && (
        <div className={snackbarClasses}>
          <b className="text-sm">{title}</b>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
};
