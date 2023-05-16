import clsx from "clsx";
import { type InputHTMLAttributes } from "react";

type inputSize = "small" | "medium" | "large";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: inputSize;
}

const Input = ({ inputSize = "medium", ...props }: Props) => {
  return (
    <input
      type="text"
      placeholder="Type here"
      className={clsx(
        "input-bordered input w-full max-w-xs",
        inputSize === "medium" && "input-md",
        inputSize === "small" && "input-sm",
        inputSize === "large" && "input-lg"
      )}
      {...props}
    />
  );
};

export default Input;
