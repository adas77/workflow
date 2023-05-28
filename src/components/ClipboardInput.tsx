import { useEffect, useState } from "react";
import { FaRegCheckCircle, FaRegCopy } from "react-icons/fa";
import Button from "./Button";

type inputSize = "small" | "medium" | "large";

type Props = {
  label: string;
  inputSize?: inputSize;
};

const ClipboardInput = ({ label, inputSize = "medium" }: Props) => {
  const ICON_SIZE = 18;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [copied, setCopied]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(label)
      .then(() => {
        setCopied(true);
      })
      .catch(() => {
        setCopied(false);
      });
  };

  return (
    <Button
      normalCase
      size={inputSize}
      variant="ghost"
      className="label cursor-pointer gap-3 border-base-300 p-3"
      onClick={() => copyToClipboard()}
    >
      <>
        <span className="label-text">{label}</span>
        {copied ? (
          <FaRegCheckCircle size={ICON_SIZE} />
        ) : (
          <FaRegCopy size={ICON_SIZE} />
        )}
      </>
    </Button>
  );
};

export default ClipboardInput;
