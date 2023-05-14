import clsx from "clsx";
import React from "react";
type alertVariant = "success" | "warning" | "error" | "info";

type Props = {
  message: string;
  variant?: alertVariant;
};

const Alert = ({ message, variant = "info" }: Props) => {
  const icon = clsx(
    variant === "info" &&
      "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    variant === "success" && "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    variant === "warning" &&
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    variant === "error" &&
      "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
  );
  return (
    <div
      className={clsx(
        "alert shadow-lg",
        variant === "info" && "",
        variant === "success" && "alert-success",
        variant === "warning" && "alert-warning",
        variant === "error" && "alert-error"
      )}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 flex-shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={icon}
          ></path>
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
