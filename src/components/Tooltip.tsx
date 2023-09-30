import classNames from "classnames";
import { ReactNode, useState } from "react";

interface ToolTipProps {
  label: string;
  children: ReactNode;
  flip?: boolean;
}

export const Tooltip: React.FC<ToolTipProps> = ({
  label,
  children,
  flip = false,
}) => {
  const [displayed, setDisplayed] = useState<boolean>(false);

  const tooltipClasses = classNames(
    "absolute text-xs bg-neutral-200 text-neutral-800 py-1 px-2 rounded-md font-bold top-12 w-fit",
    { "right-0": flip },
    { hidden: !displayed }
  );
  return (
    <div
      className="relative w-fit h-fit"
      onMouseOver={() => {
        setDisplayed(true);
      }}
      onMouseLeave={() => {
        setDisplayed(false);
      }}
    >
      {children}
      <div className={tooltipClasses}>{label}</div>
    </div>
  );
};
