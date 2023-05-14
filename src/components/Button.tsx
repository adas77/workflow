import clsx from "clsx";
import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

type btnSize = "small" | "medium" | "large";
type btnVariant = "regular" | "outline" | "ghost" | "success" | "error";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: btnSize;
  variant?: btnVariant;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  size = "medium",
  variant = "regular",
  loading,
  children,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        "btn",
        loading && "loading",
        size === "medium" && "",
        size === "small" && "btn-sm",
        size === "large" && "btn-lg",
        variant === "regular" && "",
        variant === "outline" && "btn-outline",
        variant === "ghost" && "btn-ghost",
        variant === "success" && "btn-success",
        variant === "error" && "btn-error"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
