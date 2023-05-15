import clsx from "clsx";
import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

type btnSize = "small" | "medium" | "large";
type btnVariant = "regular" | "outline" | "ghost" | "success" | "error";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: btnSize;
  variant?: btnVariant;
  loading?: boolean;
  normalCase?: boolean;
}

const Button = ({
  children,
  size = "medium",
  variant = "regular",
  loading,
  normalCase,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        "btn",
        className,
        loading && "loading",
        normalCase && "normal-case",
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
