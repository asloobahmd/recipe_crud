import React from "react";
import { LuLoader2 } from "react-icons/lu";

export const Button = ({
  onClick,
  children,
  className,
  isLoading,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} flex items-center justify-center gap-x-[3px]`}
    >
      {children}
      {isLoading && <LuLoader2 size={18} className="animate-spin mt-[3px]" />}
    </button>
  );
};
