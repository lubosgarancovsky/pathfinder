import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Tooltip } from "./Tooltip";

interface IconButtonProps {
  icon: JSX.Element;
  tooltip: string;
  active: boolean;
  onClick: (active: boolean) => void;
  disableActiveState?: boolean;
  variant?: "default" | "warning" | "success";
  disabled?: boolean;
  flipTooltip?: boolean;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  tooltip,
  active,
  onClick,
  disableActiveState,
  className,
  variant = "default",
  disabled = false,
  flipTooltip = false,
}) => {
  const [isActive, setIsActive] = useState<boolean>(active);

  const buttonClassnames = classNames(
    "p-2 rounded-md transition",
    {
      "text-neutral-200 hover:bg-neutral-700 hover:text-white active:bg-neutral-500":
        variant === "default",
    },
    {
      "hover:bg-red-700 hover:bg-opacity-50 active:bg-red-700":
        variant === "warning",
    },
    {
      "bg-green-600 hover:bg-green-700 active:bg-green-400":
        variant === "success" && !disabled,
    },
    {
      "bg-neutral-600": disabled,
    },
    {
      "bg-neutral-700 border-neutral-500":
        !disableActiveState && isActive && variant === "default",
    },
    className
  );

  const buttonIcon = React.cloneElement(icon, {
    className: `w-5 h-5 ${variant === "warning" && "fill-red-500"}`,
  });

  const handleClick = () => {
    onClick(!isActive);
    setIsActive((p) => !p);
  };

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <div>
      <Tooltip label={tooltip} flip={flipTooltip}>
        <button
          className={buttonClassnames}
          onClick={handleClick}
          disabled={disabled}
        >
          {buttonIcon}
        </button>
      </Tooltip>
    </div>
  );
};
