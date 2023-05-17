import { FaClipboard } from "react-icons/fa";
import Button from "./Button";

type inputSize = "small" | "medium" | "large";

type Props = {
  label: string;
  inputSize?: inputSize;
};

const ClipboardInput = ({ label, inputSize = "medium" }: Props) => {
  return (
    <Button
      normalCase
      size={inputSize}
      variant="ghost"
      className="label cursor-pointer gap-3 border-base-300 p-3"
      onClick={() => navigator.clipboard.writeText(label)}
    >
      <span className="label-text">{label}</span>
      <FaClipboard size={18} />
    </Button>
  );
};

export default ClipboardInput;
