import clsx from "clsx";
import React, { type TextareaHTMLAttributes } from "react";

type textAreaSize = "small" | "medium" | "large";
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: textAreaSize;
}

const TextArea = ({ size = "medium", ...props }: Props) => {
  return (
    <textarea
      className={clsx(
        "textarea-bordered textarea textarea-xs w-full max-w-xs",
        size === "medium" && "textarea-md",
        size === "small" && "textarea-sm",
        size === "large" && "textarea-lg"
      )}
      placeholder="Write here..."
      {...props}
    ></textarea>
  );
};

export default TextArea;
